function initializeEquipmentManagement() {
    loadAllDDLs();
    loadEquipmentTable();
}

function loadAllDDLs() {
    loadEquipTypeDDL();
    loadManufacturerDDL();
    loadCustomerDDL();
}

function loadEquipTypeDDL(){
    //checking latest index
	let myStorage = window.localStorage;
    let equipTypeLastIndex = parseInt(myStorage.getItem('equipTypeLastIndex'));
    select = document.getElementById('inputEquipType');
	
    // Save default option
    let default_options = $("#inputEquipType option");

    // Empty select list
    $("#inputEquipType").empty()

	//looping through 1 to all indexes
	for (let i = 1; i <= equipTypeLastIndex; i++){
		//loading the data and parsing the string back into a string array if there is data stored
        let c = JSON.parse(myStorage.getItem("equipTypeID:" + i.toString()));

		if (c !== null){
			// Add each customer name to select list
            let opt = document.createElement('option');
            opt.value = c[0];
            opt.innerHTML = c[1];
            select.add(opt);
		}
	}

    // sort alphabetically
    let my_options = $("#inputEquipType option");

    my_options.sort(function(a,b) {
        if (a.text > b.text) return 1;
        if (a.text < b.text) return -1;
        return 0
    })

    // Re-generate select list
    $("#inputEquipType").empty().append( default_options );
    $("#inputEquipType").append( my_options );
    $("#inputEquipType").val("");
}

function loadManufacturerDDL(){
    //checking latest index
	let myStorage = window.localStorage;
    let manufacturerLastIndex = parseInt(myStorage.getItem('manufacturerLastIndex'));
    select = document.getElementById('inputManu');
	
    // Save default option
    let default_options = $("#inputManu option");

    // Empty select list
    $("#inputManu").empty();

	//looping through 1 to all indexes
	for (let i = 1; i <= manufacturerLastIndex; i++){
		//loading the data and parsing the string back into a string array if there is data stored
        let c = JSON.parse(myStorage.getItem("manufacturerID:" + i.toString()));

		if (c !== null){
			// Add each customer name to select list
            let opt = document.createElement('option');
            opt.value = c[0];
            opt.innerHTML = c[1];
            select.add(opt);
		}
	}

    // sort alphabetically
    let my_options = $("#inputManu option");

    my_options.sort(function(a,b) {
        if (a.text > b.text) return 1;
        if (a.text < b.text) return -1;
        return 0
    })

    // Re-generate select list
    $("#inputManu").empty().append( default_options );
    $("#inputManu").append( my_options );
    $("#inputManu").val("");
}

function loadCustomerDDL(){
    //checking latest index of customers
	let myStorage = window.localStorage;
    let customerLastIndex = parseInt(myStorage.getItem('customerLastIndex'));
    select = document.getElementById('inputCustomer');
	
    // Save default option
    let default_options = $("#inputCustomer option");

    // Empty select list
    $("#inputCustomer").empty()

	//looping through 1 to all indexes of customers
	for (let i = 1; i <= customerLastIndex; i++){
		//loading the customer data and parsing the string back into a string array if there is data stored
        let c = JSON.parse(myStorage.getItem("customerID:" + i.toString()));

		if (c !== null){
			// Add each customer name to select list
            let opt = document.createElement('option');
            opt.value = c[0];
            opt.innerHTML = c[1] + " " + c[2];
            select.add(opt);
		}
	}

    // sort alphabetically
    let my_options = $("#inputCustomer option");

    my_options.sort(function(a,b) {
        if (a.text > b.text) return 1;
        if (a.text < b.text) return -1;
        return 0
    })

    // Re-generate select list
    $("#inputCustomer").empty().append( default_options );
    $("#inputCustomer").append( my_options );
    $("#inputCustomer").val("");
}

function saveNewEquipType(){
    // Add new equipment type
    let myStorage = window.localStorage;
	let equipTypeLastIndex = parseInt(myStorage.getItem('equipTypeLastIndex'));
    let newTypeName = $("#inputNewEqType").val();
	
	equipTypeLastIndex++;
	console.log(equipTypeLastIndex);
	let newEquipType = ["equipTypeID:" + equipTypeLastIndex.toString(), newTypeName];
	console.log(newEquipType);
	myStorage.setItem("equipTypeID:" + equipTypeLastIndex.toString(), JSON.stringify(newEquipType))
	
	myStorage.setItem('equipTypeLastIndex', equipTypeLastIndex.toString())

    // Refresh equip type DDL and select the new type
    select = document.getElementById('inputEquipType');

    $("#inputEquipType").empty(); // Empty select list

	//looping through 1 to all indexes
	for (let i = 1; i <= equipTypeLastIndex; i++){
		//loading the data and parsing the string back into a string array if there is data stored
        let c = JSON.parse(myStorage.getItem("equipTypeID:" + i.toString()));

		if (c !== null){
			// Add each customer name to select list
            let opt = document.createElement('option');
            opt.value = c[0];
            opt.innerHTML = c[1];
            select.add(opt);
		}
	}

    // sort alphabetically
    let my_options = $("#inputEquipType option");

    my_options.sort(function(a,b) {
        if (a.text > b.text) return 1;
        if (a.text < b.text) return -1;
        return 0
    })

    // Re-generate select list
    $("#inputEquipType").append( my_options );
    $("#inputEquipType").val("equipTypeID:" + equipTypeLastIndex); // Select the new type
}

function saveNewManufacturer(){
    // Add new equipment type
    let myStorage = window.localStorage;
	let manufacturerLastIndex = parseInt(myStorage.getItem('manufacturerLastIndex'));
	let newManuName = $("#inputNewManu").val();

	manufacturerLastIndex++;
	console.log(manufacturerLastIndex);
	let newManufacturer = ["manufacturerID:" + manufacturerLastIndex.toString(), newManuName];
	console.log(newManufacturer);
	myStorage.setItem("manufacturerID:" + manufacturerLastIndex.toString(), JSON.stringify(newManufacturer))
	
	myStorage.setItem('manufacturerLastIndex', manufacturerLastIndex.toString())

    // Refresh equip type DDL and select the new manufacturer
    select = document.getElementById('inputManu');
    
    $("#inputManu").empty(); // Empty select list

	//looping through 1 to all indexes
	for (let i = 1; i <= manufacturerLastIndex; i++){
		//loading the data and parsing the string back into a string array if there is data stored
        let c = JSON.parse(myStorage.getItem("manufacturerID:" + i.toString()));

		if (c !== null){
			// Add each customer name to select list
            let opt = document.createElement('option');
            opt.value = c[0];
            opt.innerHTML = c[1];
            select.add(opt);
		}
	}

    // sort alphabetically
    let my_options = $("#inputManu option");

    my_options.sort(function(a,b) {
        if (a.text > b.text) return 1;
        if (a.text < b.text) return -1;
        return 0
    })

    // Re-generate select list
    $("#inputManu").append( my_options );
    $("#inputManu").val("manufacturerID:" + manufacturerLastIndex); // Select the new type
}

//current entry being edited
var editRow = null;

function equipmentDelete(ctl) {
    let myStorage2 = window.localStorage;
    myStorage2.removeItem($("#inputEquipNumber").val().toString());
    loadEquipmentTable();
    location.reload();
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
    let equipment1 = ['equipmentID:1', 'Hydrolic Amplifier', '5536997088', 'equipTypeID:1', 'manufacturerID:1', 'customerID:1'];
    let equipment2 = ['equipmentID:2', 'Ice Skater', '6498855765', 'equipTypeID:2', 'manufacturerID:2', 'customerID:2'];
    let equipment3 = ['equipmentID:3', 'Rover', '1659567747', 'equipTypeID:3', 'manufacturerID:3', 'customerID:3'];
    let equipment4 = ['equipmentID:4', 'Fable Cutter', '3377476242', 'equipTypeID:4', 'manufacturerID:4', 'customerID:4'];
	
    myStorage2.setItem('equipmentID:1', JSON.stringify(equipment1));
	myStorage2.setItem('equipmentID:2', JSON.stringify(equipment2));
	myStorage2.setItem('equipmentID:3', JSON.stringify(equipment3));
	myStorage2.setItem('equipmentID:4', JSON.stringify(equipment4));
	
	myStorage2.setItem('equipmentLastIndex', '4');
}

function saveEquipment(){
    let myStorage2 = window.localStorage;
	let equipmentLastIndex = parseInt(myStorage2.getItem('equipmentLastIndex'));
	
	equipmentLastIndex++;
	console.log(equipmentLastIndex);
	let newEquipment = ["equipmentID:" + equipmentLastIndex.toString(), $("#inputEquipName").val(), $("#inputSerial").val(), $("#inputEquipType").val(), $("#inputManu").val(), $("#inputCustomer").val()];
	console.log(newEquipment);
	myStorage2.setItem("equipmentID:" + equipmentLastIndex.toString(), JSON.stringify(newEquipment))
	
	myStorage2.setItem('equipmentLastIndex', equipmentLastIndex.toString())
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
    // Clear filter input fields in HTML
    $('#filterEquipName').val("");
    $('#filterEquipType').val("");
    $('#filterEquipManu').val("");

	//checking latest index
	let myStorage2 = window.localStorage;
    let equipmentLastIndex = parseInt(myStorage2.getItem('equipmentLastIndex'));
    let equipTable = "";
	
	for (let i = 1; i <= equipmentLastIndex; i++){
        let c = JSON.parse(myStorage2.getItem("equipmentID:" + i.toString()));
        
		if (c !== null){
            let typeName = JSON.parse(myStorage2.getItem(c[3]))[1];
            let manuName = JSON.parse(myStorage2.getItem(c[4]))[1];
            let cust = JSON.parse(myStorage2.getItem(c[5]));
            let custName = cust[1] + " " + cust[2];

			equipTable = equipTable + equipmentBuildTableRowLoad(c[0],c[1],c[2],typeName,manuName,custName);
		}
        
	}
    document.getElementById("equipmentTable").innerHTML = equipTable;
}

function filterEquipmentTable(){
	let myStorage2 = window.localStorage;
    let equipmentLastIndex = parseInt(myStorage2.getItem('equipmentLastIndex'));
    let equipTable = "";
	
	for (let i = 1; i <= equipmentLastIndex; i++){
        let c = JSON.parse(myStorage2.getItem("equipmentID:" + i.toString()));
        
		if (c !== null){
            let addThisRecord = true; // Toggle this to false if the record fails the filter checks
            let typeName = JSON.parse(myStorage2.getItem(c[3]))[1];
            let manuName = JSON.parse(myStorage2.getItem(c[4]))[1];
            let cust = JSON.parse(myStorage2.getItem(c[5]));
            let custName = cust[1] + " " + cust[2];

            if ($('#filterEquipName').val() !== "" && !custName.toUpperCase().includes($('#filterEquipName').val().toUpperCase())){
                addThisRecord = false;
            }
			if ($('#filterEquipType').val() !== "" && !typeName.toUpperCase().includes($('#filterEquipType').val().toUpperCase())){
                addThisRecord = false;
            }
            if ($('#filterEquipManu').val() !== "" && !manuName.toUpperCase().includes($('#filterEquipManu').val().toUpperCase())){
                addThisRecord = false;
            }

            if (addThisRecord)
                equipTable = equipTable + equipmentBuildTableRowLoad(c[0],c[1],c[2],typeName,manuName,custName);
		}        
	}
    document.getElementById("equipmentTable").innerHTML = equipTable;
}
