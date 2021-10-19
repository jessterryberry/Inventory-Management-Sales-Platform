var editRow = null;

function equipmentDelete(ctl) {
    let myStorage2 = window.localStorage;    
    
    if (confirm("Are you sure you want to delete this Equipment?")) {
        myStorage2.removeItem($("#inputEquipNumber").val().toString());        
    }
    loadEquipmentTable();
}

function equipmentDisplay(ctl, mode) {
    editRow = $(ctl).parents("tr");
    var cols = editRow.children("td");
    var equipmentID = $(cols[0]).text();
    let myStorage2 = window.localStorage;
    var equipmentData = JSON.parse(myStorage2.getItem(equipmentID.toString()));
        
        $("#inputEquipNumber").val(equipmentData[0]);
        $("#inputEquipName").val(equipmentData[1]);
        $("#inputSerial").val(equipmentData[2]);
        $("#inputEquipType").val(equipmentData[3]);
        $("#inputManu").val(equipmentData[4]);
        $("#inputCustomer").val(equipmentData[5]);
    
    const updateButton = document.getElementById('updateButton2');
    const deleteButton = document.getElementById('deleteButton2'); 

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

function equipmentUpdate() {
    let myStorage2 = window.localStorage;
    var cols = editRow.children("td");
    var equipmentID = $(cols[0]).text();
    var equipmentUpdate = [equipmentID.toString(), $("#inputEquipName").val(), $("#inputSerial").val(), $("#inputEquipType").val(), $("#inputManu").val(), $("#inputCustomer").val()];

    myStorage2.setItem(equipmentID.toString(), JSON.stringify(equipmentUpdate));  

    loadEquipmentTable();
}

function demoEquipData(){
	let myStorage2 = window.localStorage;
    let equipment1 = ['101', 'Hydrolic Amplifier', '289501', 'Rammer', 'Dell', 'Joe Smith'];
    let equipment2 = ['102', 'Ice Skater', '59184912', 'SnowBlower', 'McAfee', 'Sarah Yates'];
    let equipment3 = ['103', 'Rover', '58230948', 'Wheelbarrow', 'Ranger', 'Nathan Jones'];
    let equipment4 = ['104', 'Fable Blower', '603458', 'Lawn Mower', 'Diablo', 'Farrah Parker'];
	
    myStorage2.setItem('101', JSON.stringify(equipment1));
	myStorage2.setItem('102', JSON.stringify(equipment2));
	myStorage2.setItem('103', JSON.stringify(equipment3));
	myStorage2.setItem('104', JSON.stringify(equipment4));
	
	myStorage2.setItem('equipmentNum', '4');
}

function saveEquipment(){
    let myStorage2 = window.localStorage;
	let equipmentNum = parseInt(myStorage2.getItem('equipmentNum'));
	
	equipmentNum++;
	console.log(equipmentNum);
	let newEquipment = [(100 + equipmentNum).toString(), $("#inputEquipName").val(), $("#inputSerial").val(), $("#inputEquipType").val(), $("#inputManu").val(), $("#inputCustomer").val()];
	console.log(newEquipment);
	myStorage2.setItem((equipmentNum + 100).toString(), JSON.stringify(newEquipment))
	
	myStorage2.setItem('equipmentNum', equipmentNum.toString())
}
function equipmentBuildTableRowLoad(id, name, serial, type, manu, custom) {
    var ret = "<tr>" +
        "<td class='hide-col'>" + id + "</td>" +
        "<td>" + name + "</td>" +
        "<td>" + serial + "</td>" +
        "<td class='hide-col'>" + type + "</td>" +        
        "<td>" + manu + "</td>" +
        "<td class='hide-col'>" + custom + "</td>" +
        "<td>" +
        "<button class='btn btn-outline-secondary' onclick='equipmentDisplay(this, 3);' style='color:black;' type='button' data-bs-toggle='collapse' id='editToggle' href='#collapseEdit' aria-expanded='false' aria-controls='collapseEdit'>Details</button>" +
        "</td>" +
        "<td>" +
        "<button class='btn btn-outline-secondary' onclick='equipmentDisplay(this, 1);' style='color:black;' type='button' data-bs-toggle='collapse' id='editToggle' href='#collapseEdit' aria-expanded='false' aria-controls='collapseEdit'>Edit</button>" +
        "</td>" +
        "<td>" + "<button class='btn btn-outline-secondary' onclick='equipmentDisplay(this, 2);' style='color:black;' type='button' data-bs-toggle='collapse' id='editToggle' href='#collapseEdit' aria-expanded='false' aria-controls='collapseEdit'>Delete</button>" + "</td>" +
        "</tr>"  
        
	return ret;
}
function loadEquipmentTable(){
	//checking total amount of customers
	let myStorage2 = window.localStorage;
    let equipmentNum = parseInt(myStorage2.getItem('equipmentNum'));
    let equipTable = "";
	
	for (let i = 101; i <= (100 + equipmentNum); i++){
		if (myStorage2.getItem(i.toString()) !== null){
			let c = JSON.parse(myStorage2.getItem(i.toString()));

			equipTable = equipTable + equipmentBuildTableRowLoad(c[0],c[1],c[2],c[3],c[4],c[5]);
		}
        
	}
    document.getElementById("equipmentTable").innerHTML = equipTable;
}

function filterEquipmentTable(){
	let myStorage2 = window.localStorage;
    let equipmentNum = parseInt(myStorage2.getItem('equipmentNum'));
    let equipTable = "";
	
	for (let i = 101; i <= (100 + equipmentNum); i++){
		if (myStorage2.getItem(i.toString()) !== null){
			let c = JSON.parse(myStorage2.getItem(i.toString()));

            if ($('#filterEquipName').val() !== "" && c[1].toUpperCase().includes($('#filterEquipName').val().toUpperCase())){
                equipTable = equipTable + equipmentBuildTableRowLoad(c[0],c[1],c[2],c[3],c[4],c[5]);                
            }
			else if ($('#filterEquipType').val() !== "" && c[2].toUpperCase().includes($('#filterEquipType').val().toUpperCase())){
                equipTable = equipTable + equipmentBuildTableRowLoad(c[0],c[1],c[2],c[3],c[4],c[5]);
            }
            else if ($('#filterEquipManu').val() !== "" && c[4].toUpperCase().includes($('#filterEquipManu').val().toUpperCase())){
                equipTable = equipTable + equipmentBuildTableRowLoad(c[0],c[1],c[2],c[3],c[4],c[5]);
            }
		}        
	}
    document.getElementById("equipmentTable").innerHTML = equipTable;
}
