//current entry being edited
var editRow = null;

function equipTypeDelete(ctl) {
    let myStorage3 = window.localStorage;
    myStorage3.removeItem($("#inputEquipNumber").val().toString());
    loadEquipTypeTable();
}

function equipTypeDisplay(ctl, mode) {
    editRow = $(ctl).parents("tr");
    var cols = editRow.children("td");
    var equipTypeID = $(cols[0]).text();
    let myStorage3 = window.localStorage;
    var equipTypeData = JSON.parse(myStorage3.getItem(equipTypeID.toString()));
        
        $("#inputEquipNumber").val(equipTypeData[0]);
        $("#inputEquipType").val(equipTypeData[1]);        
    
    const updateButton = document.getElementById('updateButton');
    const deleteButton = document.getElementById('deleteButton'); 

    if (mode == 1) {
        updateButton.disabled = false;
        deleteButton.disabled = true;
    }
    else if (mode == 2){
        deleteButton.disabled = false;
        updateButton.disabled = true;
    } 
    else {
        deleteButton.disabled = true;
        updateButton.disabled = true;
    }   
}

function equipTypeUpdate() {
    let myStorage3 = window.localStorage;
    var cols = editRow.children("td");
    var equipTypeID = $(cols[0]).text();
    var equipTypeUpdate = [equipTypeID.toString(), $("#inputEquipType").val()];

    myStorage3.setItem(equipTypeID.toString(), JSON.stringify(equipTypeUpdate));  

    loadEquipTypeTable();
}

function demoEquipTypeData(){
	let myStorage3 = window.localStorage;
    let equipType1 = ['equipTypeID:1', 'Rammer'];
    let equipType2 = ['equipTypeID:2', 'SnowBlower'];
    let equipType3 = ['equipTypeID:3', 'Wheelbarrow'];
    let equipType4 = ['equipTypeID:4', 'Lawn Mower'];
	
    myStorage3.setItem('equipTypeID:1', JSON.stringify(equipType1));
	myStorage3.setItem('equipTypeID:2', JSON.stringify(equipType2));
	myStorage3.setItem('equipTypeID:3', JSON.stringify(equipType3));
	myStorage3.setItem('equipTypeID:4', JSON.stringify(equipType4));
	
	myStorage3.setItem('equipTypeLastIndex', '4');
}

function saveEquipType(){
    let myStorage3 = window.localStorage;
	let equipTypeLastIndex = parseInt(myStorage3.getItem('equipTypeLastIndex'));
	
	equipTypeLastIndex++;
	console.log(equipTypeLastIndex);
	let newEquipType = ["equipTypeID:" + equipTypeLastIndex.toString(), $("#inputEquipType").val()];
	console.log(newEquipType);
	myStorage3.setItem("equipTypeID:" + equipTypeLastIndex.toString(), JSON.stringify(newEquipType))
	
	myStorage3.setItem('equipTypeLastIndex', equipTypeLastIndex.toString())
}

function equipTypeBuildTableRowLoad(id, type) {
    var ret = "<tr>" +
        "<td class='hide-col'>" + id + "</td>" + 
        "<td>" + type + "</td>" + 
        "<td>" +
        "<button class='btn btn-outline-secondary' onclick='equipTypeDisplay(this, 3);' style='color:black;' type='button' data-bs-toggle='collapse' id='editToggle' href='#collapseEdit' aria-expanded='false' aria-controls='collapseEdit'>Details</button>" +
        "</td>" +
        "<td>" +
        "<button class='btn btn-outline-secondary' onclick='equipTypeDisplay(this, 1);' style='color:black;' type='button' data-bs-toggle='collapse' id='editToggle' href='#collapseEdit' aria-expanded='false' aria-controls='collapseEdit'>Edit</button>" +
        "</td>" +
        "<td>" + "<button class='btn btn-outline-secondary' onclick='equipTypeDisplay(this, 2);' style='color:black;' type='button' data-bs-toggle='collapse' id='editToggle' href='#collapseEdit' aria-expanded='false' aria-controls='collapseEdit'>Delete</button>" + "</td>" +
        "</tr>"  
        
	return ret;
}
function loadEquipTypeTable(){
    // Clear filter input fields in HTML
    $('#filterEquipType').val("");

	//checking latest index
	let myStorage3 = window.localStorage;
    let equipTypeLastIndex = parseInt(myStorage3.getItem('equipTypeLastIndex'));
    let equipTypeTable = "";

    console.log(equipTypeLastIndex);
	
	for (let i = 1; i <= equipTypeLastIndex; i++){
        let c = JSON.parse(myStorage3.getItem("equipTypeID:" +  i.toString()));

		if (c !== null){
			equipTypeTable = equipTypeTable + equipTypeBuildTableRowLoad(c[0],c[1]);
		}
        
	}
    document.getElementById("equipTypeTable").innerHTML = equipTypeTable;
}

function filterEquipTypeTable(){
	let myStorage3 = window.localStorage;
    let equipTypeLastIndex = parseInt(myStorage3.getItem('equipTypeLastIndex'));
    let equipTypeTable = "";
	
	for (let i = 1; i <= equipTypeLastIndex; i++){
        let c = JSON.parse(myStorage3.getItem("equipTypeID:" + i.toString()));

		if (c !== null){
			if ($('#filterEquipType').val() !== "" && c[1].toUpperCase().includes($('#filterEquipType').val().toUpperCase())){
                equipTypeTable = equipTypeTable + equipTypeBuildTableRowLoad(c[0],c[1]);                
            }			
		}        
	}
    document.getElementById("equipTypeTable").innerHTML = equipTypeTable;
}
