var editRow = null;

function equipTypeDelete(ctl) {
    let myStorage3 = window.localStorage;    
    
    if (confirm("Are you sure you want to delete this Equipment Type?")) {
        myStorage3.removeItem($("#inputEquipNumber").val().toString());        
    }
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
    let equipType1 = ['201', 'Rammer'];
    let equipType2 = ['202', 'SnowBlower'];
    let equipType3 = ['203', 'Wheelbarrow'];
    let equipType4 = ['204', 'Lawn Mower'];
	
    myStorage3.setItem('201', JSON.stringify(equipType1));
	myStorage3.setItem('202', JSON.stringify(equipType2));
	myStorage3.setItem('203', JSON.stringify(equipType3));
	myStorage3.setItem('204', JSON.stringify(equipType4));
	
	myStorage3.setItem('equipTypeAmount', '4');
}

function saveEquipType(){
    let myStorage3 = window.localStorage;
	let equipTypeAmount = parseInt(myStorage3.getItem('equipTypeAmount'));
	
	equipTypeAmount++;
	console.log(equipTypeAmount);
	let newEquipType = [(200 + equipTypeAmount).toString(), $("#inputEquipType").val()];
	console.log(newEquipType);
	myStorage3.setItem((equipTypeAmount + 200).toString(), JSON.stringify(newEquipType))
	
	myStorage3.setItem('equipTypeAmount', equipTypeAmount.toString())
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
	//checking total amount of customers
	let myStorage3 = window.localStorage;
    let equipTypeAmount = parseInt(myStorage3.getItem('equipTypeAmount'));
    let equipTypeTable = "";

    console.log(equipTypeAmount);
	
	for (let i = 201; i <= (200 + equipTypeAmount); i++){
		if (myStorage3.getItem(i.toString()) !== null){
			let c = JSON.parse(myStorage3.getItem(i.toString()));

			equipTypeTable = equipTypeTable + equipTypeBuildTableRowLoad(c[0],c[1]);
		}
        
	}
    document.getElementById("equipTypeTable").innerHTML = equipTypeTable;
}

function filterEquipTypeTable(){
	let myStorage3 = window.localStorage;
    let equipTypeAmount = parseInt(myStorage3.getItem('equipTypeAmount'));
    let equipTypeTable = "";
	
	for (let i = 201; i <= (200 + equipTypeAmount); i++){
		if (myStorage3.getItem(i.toString()) !== null){
			let c = JSON.parse(myStorage3.getItem(i.toString()));

            if ($('#filterEquipType').val() !== "" && c[1].toUpperCase().includes($('#filterEquipType').val().toUpperCase())){
                equipTypeTable = equipTypeTable + equipTypeBuildTableRowLoad(c[0],c[1]);                
            }			
		}        
	}
    document.getElementById("equipTypeTable").innerHTML = equipTypeTable;
}
