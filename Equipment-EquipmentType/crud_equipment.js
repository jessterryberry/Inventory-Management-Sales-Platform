//current customer being edited
var editRow = null;

function equipmentDelete(ctl) {
    let myStorage = window.localStorage;    
    
    if (confirm("Are you sure you want to delete this customer?")) {
        myStorage.removeItem($("#inputEquipNumber").val().toString());        
    }
    loadEquipmentTable();
}

function equipmentDisplay(ctl, mode) {
    editRow = $(ctl).parents("tr");
    var cols = editRow.children("td");
    var equipmentID = $(cols[0]).text();
    let myStorage = window.localStorage;
    var equipmentData = JSON.parse(myStorage.getItem(equipmentID.toString()));
        
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
    let myStorage = window.localStorage;
    var cols = editRow.children("td");
    var equipmentID = $(cols[0]).text();
    var equipmentUpdate = [equipmentID.toString(), $("#inputEquipName").val(), $("#inputSerial").val(), $("#inputEquipType").val(), $("#inputManu").val(), $("#inputCustomer").val()];

    myStorage.setItem(equipmentID.toString(), JSON.stringify(equipmentUpdate));  

    loadEquipmentTable();
}

//Function to create a first set of "hardcoded" example customers (same ones we currently have, just create them here instead of hardcoding them into the table)
//could add a Demo button to call this to create a set of customers to start with. really only needs to run one time
function demoData(){
	let myStorage = window.localStorage;
    let equipment1 = ['1', 'Joe', 'Smith', '12 Main St', 'Welland', 'L3C 6M1'];
    let equipment2 = ['2', 'Sarah', 'Yates', '35 W Main St', 'NOTL', 'L2C 7S4'];
    let equipment3 = ['3', 'Nathan', 'Jones', '72 Side Rd', 'Wainfleet', 'L0R 2A0'];
    let equipment4 = ['4', 'Farrah', 'Parker', '10 Ontario St', 'Toronto', 'M1H 6L8'];
	
	//save them each to local storage
	//myStorage.setItem only stores strings -> use JSON.stringify to save the array as strings and JSON.parse to put them back into an array when loading
	myStorage.setItem('1', JSON.stringify(equipment1));
	myStorage.setItem('2', JSON.stringify(equipment2));
	myStorage.setItem('3', JSON.stringify(equipment3));
	myStorage.setItem('4', JSON.stringify(equipment4));
	
	//save a total number of customers so we can loop later to load the data
	//myStorage.setItem only stores strings -> saving the number as a string, can use parseInt() to convert it to a number when loading
	myStorage.setItem('equipmentNum', '4');
}

//Function to save/add a new customer
function saveEquipment(){
    let myStorage = window.localStorage;
	//loading current total amount of customers
	let equipmentNum = parseInt(myStorage.getItem('equipmentNum'));
	
	//increasing total by 1 since we are adding a customer
	equipmentNum++;
	console.log(equipmentNum);
	//creating new customer string array from inputs
	let newCustomer = [equipmentNum.toString(), $("#inputEquipName").val(), $("#inputSerial").val(), $("#inputEquipType").val(), $("#inputManu").val(), $("#inputCustomer").val()];
	console.log(newEquipment);
	//saving the new customer to myStorage
	myStorage.setItem(equipmentNum.toString(), JSON.stringify(newEquipment))
	
	//saving the new total customer amount
	myStorage.setItem('equipmentNum', equipmentNum.toString())
}
//slightly changed version of the customerBuildTableRow we had already
function customerBuildTableRowLoad(id, name, serial, type, manu, custom) {
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
//Function to load all of our customers into a table for CustomerAll page
function loadEquipmentable(){
	//checking total amount of customers
	let myStorage = window.localStorage;
    let equipmentNum = parseInt(myStorage.getItem('equipmentNum'));
    let equipTable = "";
	
	//looping through 1 to total amount of customers
	for (let i = 1; i <= equipmentNum; i++){
		//loading the customer data and parsing the string back into a string array if there is data stored
		if (myStorage.getItem(i.toString()) !== null){
			let c = JSON.parse(myStorage.getItem(i.toString()));

			//building a table row with the customer's information
			//c[0] to c[6] are the elements in the array -> first name, last name, address, ...
			equipTable = equipTable + customerBuildTableRowLoad(c[0],c[1],c[2],c[3],c[4],c[5],c[6],c[7]);
		}
        
	}
    document.getElementById("equipmentNum").innerHTML = equipTable;
}

function filterEquipmentTable(){
	//checking total amount of customers
	let myStorage = window.localStorage;
    let equipmentNum = parseInt(myStorage.getItem('equipmentNum'));
    let equipTable = "";
	
	//looping through 1 to total amount of customers
	for (let i = 1; i <= equipmentNum; i++){
		//loading the customer data and parsing the string back into a string array if there is data stored
		if (myStorage.getItem(i.toString()) !== null){
			let c = JSON.parse(myStorage.getItem(i.toString()));

			//building a table row with the customer's information
			//c[0] to c[6] are the elements in the array -> first name, last name, address, ...
            if ($('#filterFirstName').val() !== "" && c[1].toUpperCase().includes($('#filterFirstName').val().toUpperCase())){
                equipTable = equipTable + customerBuildTableRowLoad(c[0],c[1],c[2],c[3],c[4],c[5],c[6],c[7]);                
            }
			else if ($('#filterLastName').val() !== "" && c[2].toUpperCase().includes($('#filterLastName').val().toUpperCase())){
                equipTable = equipTable + customerBuildTableRowLoad(c[0],c[1],c[2],c[3],c[4],c[5],c[6],c[7]);
            }
            else if ($('#filterCity').val() !== "" && c[4].toUpperCase().includes($('#filterCity').val().toUpperCase())){
                equipTable = custTable + customerBuildTableRowLoad(c[0],c[1],c[2],c[3],c[4],c[5],c[6],c[7]);
            }
		}        
	}
    document.getElementById("equipmentNum").innerHTML = equipTable;
}
