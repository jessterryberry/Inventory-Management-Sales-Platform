//current entry being edited
var editRow = null;

function customerDelete(ctl) {
    let myStorage = window.localStorage;    
    
    if (confirm("Are you sure you want to delete this customer?")) {
        myStorage.removeItem($("#inputCustNumber").val().toString());        
    }
    loadCustomerTable();
}

function customerDisplay(ctl, mode) {
    editRow = $(ctl).parents("tr");
    var cols = editRow.children("td");
    var customerID = $(cols[0]).text();
    let myStorage = window.localStorage;
    var customerData = JSON.parse(myStorage.getItem(customerID.toString()));
        
        $("#inputCustNumber").val(customerData[0]);
        $("#inputFirstName").val(customerData[1]);
        $("#inputLastName").val(customerData[2]);
        $("#inputAddress").val(customerData[3]);
        $("#inputCity").val(customerData[4]);
        $("#inputPostalCode").val(customerData[5]);
        $("#inputEmail").val(customerData[6]);
        $("#inputPhone").val(customerData[7]);
    
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

function customerUpdate() {
    let myStorage = window.localStorage;
    var cols = editRow.children("td");
    var customerID = $(cols[0]).text();
    var customerUpdate = [customerID.toString(), $("#inputFirstName").val(), $("#inputLastName").val(), $("#inputAddress").val(), $("#inputCity").val(), $("#inputPostalCode").val(), $("#inputEmail").val(), $("#inputPhone").val()];

    myStorage.setItem(customerID.toString(), JSON.stringify(customerUpdate));  

    loadCustomerTable();
}

//Function to create a first set of "hardcoded" example customers (same ones we currently have, just create them here instead of hardcoding them into the table)
//could add a Demo button to call this to create a set of customers to start with. really only needs to run one time
function demoData(){
	let myStorage = window.localStorage;
    let customer1 = ['customerID:1', 'Joe', 'Smith', '12 Main St', 'Welland', 'L3C 6M1', 'jsmith@gmail.com', '905-346-7367'];
    let customer2 = ['customerID:2', 'Sarah', 'Yates', '35 W Main St', 'NOTL', 'L2C 7S4', 'ssyates@gmail.com', '905-869-2543'];
    let customer3 = ['customerID:3', 'Nathan', 'Jones', '72 Side Rd', 'Wainfleet', 'L0R 2A0', 'njones@gmail.com', '289-439-9632'];
    let customer4 = ['customerID:4', 'Farrah', 'Parker', '10 Ontario St', 'Toronto', 'M1H 6L8', 'faparker@gmail.com', '416-834-9768'];
	
	//save them each to local storage
	//myStorage.setItem only stores strings -> use JSON.stringify to save the array as strings and JSON.parse to put them back into an array when loading
	myStorage.setItem('customerID:1', JSON.stringify(customer1));
	myStorage.setItem('customerID:2', JSON.stringify(customer2));
	myStorage.setItem('customerID:3', JSON.stringify(customer3));
	myStorage.setItem('customerID:4', JSON.stringify(customer4));
	
	//save the highest index of the latest customers so we can loop later to load the data
	//myStorage.setItem only stores strings -> saving the number as a string, can use parseInt() to convert it to a number when loading
	myStorage.setItem('customerLastIndex', '4');
}

//Function to save/add a new customer
function saveCustomer(){
    let myStorage = window.localStorage;
	//loading current latest index of current customers
	let customerLastIndex = parseInt(myStorage.getItem('customerLastIndex'));
	
	//increasing index by 1 since we are adding a customer
	customerLastIndex++;
	console.log(customerLastIndex);
	//creating new customer string array from inputs
	let newCustomer = ["customerID:" + customerLastIndex.toString(), $("#inputFirstName").val(), $("#inputLastName").val(), $("#inputAddress").val(), $("#inputCity").val(), $("#inputPostalCode").val(), $("#inputEmail").val(), $("#inputPhone").val()];
	console.log(newCustomer);
	//saving the new customer to myStorage
	myStorage.setItem("customerID:" + customerLastIndex.toString(), JSON.stringify(newCustomer))
	
	//saving the new highest customer index
	myStorage.setItem('customerLastIndex', customerLastIndex.toString())
}
//slightly changed version of the customerBuildTableRow we had already
function customerBuildTableRowLoad(id, first, last, address, city, post, email, phone) {
    var ret = "<tr>" +
        "<td class='hide-col'>" + id + "</td>" +
        "<td>" + first + "</td>" +
        "<td>" + last + "</td>" +
        "<td class='hide-col'>" + address + "</td>" +        
        "<td>" + city + "</td>" +
        "<td class='hide-col'>" + post + "</td>" +
        "<td>" + email + "</td>" +
        "<td>" + phone + "</td>" +
        "<td>" +
        "<button class='btn btn-outline-secondary' onclick='customerDisplay(this, 3);' style='color:black;' type='button' data-bs-toggle='collapse' id='editToggle' href='#collapseEdit' aria-expanded='false' aria-controls='collapseEdit'>Details</button>" +
        "</td>" +
        "<td>" +
        "<button class='btn btn-outline-secondary' onclick='customerDisplay(this, 1);' style='color:black;' type='button' data-bs-toggle='collapse' id='editToggle' href='#collapseEdit' aria-expanded='false' aria-controls='collapseEdit'>Edit</button>" +
        "</td>" +
        "<td>" + "<button class='btn btn-outline-secondary' onclick='customerDisplay(this, 2);' style='color:black;' type='button' data-bs-toggle='collapse' id='editToggle' href='#collapseEdit' aria-expanded='false' aria-controls='collapseEdit'>Delete</button>" + "</td>" +
        "</tr>"  
        
	return ret;
}
//Function to load all of our customers into a table for CustomerAll page
function loadCustomerTable(){
    // Clear filter input fields in HTML
    $('#filterFirstName').val("");
    $('#filterLastName').val("");
    $('#filterCity').val("");

	//checking latest index of customers
	let myStorage = window.localStorage;
    let customerLastIndex = parseInt(myStorage.getItem('customerLastIndex'));
    let custTable = "";
	
	//looping through 1 to all indexes of customers
	for (let i = 1; i <= customerLastIndex; i++){
		//loading the customer data and parsing the string back into a string array if there is data stored
        let c = JSON.parse(myStorage.getItem("customerID:" + i.toString()));

		if (c !== null){
			//building a table row with the customer's information
			//c[0] to c[6] are the elements in the array -> first name, last name, address, ...
			custTable = custTable + customerBuildTableRowLoad(c[0],c[1],c[2],c[3],c[4],c[5],c[6],c[7]);
		}
        
	}
    document.getElementById("customerTable").innerHTML = custTable;
}

function filterCustomerTable(){
	//checking latest index of customers
	let myStorage = window.localStorage;
    let customerLastIndex = parseInt(myStorage.getItem('customerLastIndex'));
    let custTable = "";
	
	//looping through 1 to all indexes of customers
	for (let i = 1; i <= customerLastIndex; i++){
		//loading the customer data and parsing the string back into a string array if there is data stored
        let c = JSON.parse(myStorage.getItem("customerID:" + i.toString()));

		if (c !== null){
			//building a table row with the customer's information
			//c[0] to c[6] are the elements in the array -> first name, last name, address, ...
            if ($('#filterFirstName').val() !== "" && c[1].toUpperCase().includes($('#filterFirstName').val().toUpperCase())){
                custTable = custTable + customerBuildTableRowLoad(c[0],c[1],c[2],c[3],c[4],c[5],c[6],c[7]);                
            }
			else if ($('#filterLastName').val() !== "" && c[2].toUpperCase().includes($('#filterLastName').val().toUpperCase())){
                custTable = custTable + customerBuildTableRowLoad(c[0],c[1],c[2],c[3],c[4],c[5],c[6],c[7]);
            }
            else if ($('#filterCity').val() !== "" && c[4].toUpperCase().includes($('#filterCity').val().toUpperCase())){
                custTable = custTable + customerBuildTableRowLoad(c[0],c[1],c[2],c[3],c[4],c[5],c[6],c[7]);
            }
		}        
	}
    document.getElementById("customerTable").innerHTML = custTable;
}
