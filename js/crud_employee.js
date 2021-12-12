function saveNewPosition(){
    // Since we don't have position management in this system, we don't actually save positions, we just add to the dropdownlist
    
    let newPositionName = $("#inpuNewPosition").val();
	
	// Add new position to select list
    select = document.getElementById('inputPosition');

	let opt = document.createElement('option');
    opt.value = newPositionName;
    opt.innerHTML = newPositionName;
    select.add(opt);
	

    // sort alphabetically
    let my_options = $("#inputPosition option");

    my_options.sort(function(a,b) {
        if (a.value == "") select.remove(a);
        if (a.text > b.text) return 1;
        if (a.text < b.text) return -1;
        return 0
    })

    // Re-generate select list
    $("#inputPosition").append( my_options );
    $("#inputPosition").val(newPositionName); // Select the new position name
}

//current entry being edited
var editRow = null;

function employeeDelete(ctl) {
    let myStorage = window.localStorage; 
    myStorage.removeItem($("#inputEmpNumber").val().toString());        
    loadEmployeeTable();
    location.reload();
}

function employeeDisplay(ctl, mode) {
    editRow = $(ctl).parents("tr");
    var cols = editRow.children("td");
    var employeeID = $(cols[0]).text();
    let myStorage = window.localStorage;
    var employeeData = JSON.parse(myStorage.getItem(employeeID.toString()));
        
        $("#inputEmpNumber").val(employeeData[0]);
        $("#inputFirstName").val(employeeData[1]);
        $("#inputLastName").val(employeeData[2]);
        $("#inputPosition").val(employeeData[3]);
    
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

function employeeUpdate() {
    let myStorage = window.localStorage;
    var cols = editRow.children("td");
    var employeeID = $(cols[0]).text();
    var employeeUpdate = [employeeID.toString(), $("#inputFirstName").val(), $("#inputLastName").val(), $("#inputPosition").val()];

    myStorage.setItem(employeeID.toString(), JSON.stringify(employeeUpdate));  

    loadEmployeeTable();
}

//Function to create a first set of "hardcoded" example employees (same ones we currently have, just create them here instead of hardcoding them into the table)
//could add a Demo button to call this to create a set of employees to start with. really only needs to run one time
function demoData(){
	let myStorage = window.localStorage;
    let employee1 = ['employeeID:1', 'Emma', 'Carr', 'Manager', 'ecarr'];
    let employee2 = ['employeeID:2', 'Sam', 'Delign', 'Ordering', 'sdelign'];
    let employee3 = ['employeeID:3', 'Eugene', 'Downey', 'Technician', 'edowney'];
    let employee4 = ['employeeID:4', 'Sarah', 'Kendell', 'Technician', 'skendell'];
    let employee5 = ['employeeID:5', 'Wendy', 'Tutti', 'Sales', 'wtutti'];
    let employee6 = ['employeeID:6', 'William', 'Dickey', 'Sales', 'wdickey'];
    let employee7 = ['employeeID:7', 'Emily', 'Rosten', 'Administration', 'erosten'];
	
	//save them each to local storage
	//myStorage.setItem only stores strings -> use JSON.stringify to save the array as strings and JSON.parse to put them back into an array when loading
	myStorage.setItem('employeeID:1', JSON.stringify(employee1));
	myStorage.setItem('employeeID:2', JSON.stringify(employee2));
	myStorage.setItem('employeeID:3', JSON.stringify(employee3));
	myStorage.setItem('employeeID:4', JSON.stringify(employee4));
    myStorage.setItem('employeeID:5', JSON.stringify(employee5));
    myStorage.setItem('employeeID:6', JSON.stringify(employee6));
    myStorage.setItem('employeeID:7', JSON.stringify(employee7));
	
	//save the highest index of the latest employees so we can loop later to load the data
	//myStorage.setItem only stores strings -> saving the number as a string, can use parseInt() to convert it to a number when loading
	myStorage.setItem('employeeLastIndex', '7');

    //save usernames and passwords for each employee
    myStorage.setItem(employee1[4], 'password');
    myStorage.setItem(employee2[4], 'password');
    myStorage.setItem(employee3[4], 'password');
    myStorage.setItem(employee4[4], 'password');
    myStorage.setItem(employee5[4], 'password');
    myStorage.setItem(employee6[4], 'password');
    myStorage.setItem(employee7[4], 'password');

}

//Function to save/add a new employee
function saveEmployee(){
    let myStorage = window.localStorage;
	//loading current latest index of current employees
	let employeeLastIndex = parseInt(myStorage.getItem('employeeLastIndex'));
	
	//increasing index by 1 since we are adding a employee
	employeeLastIndex++;
	console.log(employeeLastIndex);
	//creating new employee string array from inputs
	let newEmployee = ["employeeID:" + employeeLastIndex.toString(), $("#inputFirstName").val(), $("#inputLastName").val(), $("#inputPosition").val(), $("#inputUsername").val()];
	console.log(newEmployee);
	//saving the new employee to myStorage
	myStorage.setItem("employeeID:" + employeeLastIndex.toString(), JSON.stringify(newEmployee));
	
	//saving the new highest employee index
	myStorage.setItem('employeeLastIndex', employeeLastIndex.toString());

    //saving new employee password
    myStorage.setItem($("#inputUsername").val(), $("#inputPassword").val());
}
//slightly changed version of the employeeBuildTableRow we had already
function employeeBuildTableRowLoad(id, first, last, position) {
    var ret = "<tr>" +
        "<td class='hide-col'>" + id + "</td>" +
        "<td>" + first + "</td>" +
        "<td>" + last + "</td>" +
        "<td>" + position + "</td>" +        
        "<td>" +
        "<button class='btn btn-outline-secondary' onclick='employeeDisplay(this, 3);' style='color:black;' type='button' data-bs-toggle='collapse' id='editToggle' href='#collapseEdit' aria-expanded='false' aria-controls='collapseEdit'>Details</button>" +
        "</td>" +
        "<td>" +
        "<button class='btn btn-outline-secondary' onclick='employeeDisplay(this, 1);' style='color:black;' type='button' data-bs-toggle='collapse' id='editToggle' href='#collapseEdit' aria-expanded='false' aria-controls='collapseEdit'>Edit</button>" +
        "</td>" +
        "<td>" + "<button class='btn btn-outline-secondary' onclick='employeeDisplay(this, 2);' style='color:black;' type='button' data-bs-toggle='collapse' id='editToggle' href='#collapseEdit' aria-expanded='false' aria-controls='collapseEdit'>Delete</button>" + "</td>" +
        "</tr>"  
        
	return ret;
}
//Function to load all of our employees into a table for EmployeeAll page
function loadEmployeeTable(){
    // Clear filter input fields in HTML
    $('#filterFirstName').val("");
    $('#filterLastName').val("");
    $('#filterPosition').val("");

	//checking latest index of employees
	let myStorage = window.localStorage;
    let employeeLastIndex = parseInt(myStorage.getItem('employeeLastIndex'));
    let empTable = "";
	
	//looping through 1 to all indexes of employees
	for (let i = 1; i <= employeeLastIndex; i++){
		//loading the employee data and parsing the string back into a string array if there is data stored
        let e = JSON.parse(myStorage.getItem("employeeID:" + i.toString()));

		if (e !== null){
			//building a table row with the employee's information
			//c[0] to c[6] are the elements in the array -> first name, last name, address, ...
			empTable = empTable + employeeBuildTableRowLoad(e[0],e[1],e[2],e[3]);
		}
        
	}
    document.getElementById("employeeTable").innerHTML = empTable;
}

function filterEmployeeTable(){
	//checking latest index of employees
	let myStorage = window.localStorage;
    let employeeLastIndex = parseInt(myStorage.getItem('employeeLastIndex'));
    let empTable = "";
	
	//looping through 1 to all indexes of employees
	for (let i = 1; i <= employeeLastIndex; i++){
		//loading the employee data and parsing the string back into a string array if there is data stored
        let e = JSON.parse(myStorage.getItem("employeeID:" + i.toString()));

		if (e !== null){
			//building a table row with the employee's information
			//c[0] to c[6] are the elements in the array -> first name, last name, address, ...
            if ($('#filterFirstName').val() !== "" && e[1].toUpperCase().includes($('#filterFirstName').val().toUpperCase())){
                empTable = empTable + employeeBuildTableRowLoad(e[0],e[1],e[2],e[3]);                
            }
			else if ($('#filterLastName').val() !== "" && e[2].toUpperCase().includes($('#filterLastName').val().toUpperCase())){
                empTable = empTable + employeeBuildTableRowLoad(e[0],e[1],e[2],e[3]);
            }
            else if ($('#filterPosition').val() !== "" && e[4].toUpperCase().includes($('#filterPosition').val().toUpperCase())){
                empTable = empTable + employeeBuildTableRowLoad(e[0],e[1],e[2],e[3]);
            }
		}        
	}
    document.getElementById("employeeTable").innerHTML = empTable;
}

function loadEmployeeDDL(){
    //checking latest index of employees
	let myStorage = window.localStorage;
    let employeeLastIndex = parseInt(myStorage.getItem('employeeLastIndex'));
    select = document.getElementById('inputEmployee');
	
    // Save default option
    let default_options = $("#inputEmployee option");

    // Empty select list
    $("#inputEmployee").empty()

	//looping through 1 to all indexes of employees
	for (let i = 1; i <= employeeLastIndex; i++){
		//loading the employee data and parsing the string back into a string array if there is data stored
        let c = JSON.parse(myStorage.getItem("employeeID:" + i.toString()));

		if (c !== null){
			// Add each employees name to select list
            let opt = document.createElement('option');
            opt.value = c[0];
            opt.innerHTML = c[1] + " " + c[2] + " (" + c[3] + ")";
            select.add(opt);
		}
	}

    // sort alphabetically
    let my_options = $("#inputEmployee option");

    my_options.sort(function(a,b) {
        if (a.text > b.text) return 1;
        if (a.text < b.text) return -1;
        return 0
    })

    // Re-generate select list
    $("#inputEmployee").empty().append( default_options );
    $("#inputEmployee").append( my_options );
    $("#inputEmployee").val("");
}


function login(){
    let myStorage = window.localStorage;
    let username = $('#inputUsername').val()
    let password = $('#inputPassword').val()

    //load user from local storage
    let u = myStorage.getItem(username);
    if (u != null && password == u){
        //if the entered username exists and the password matches, save the name as "currentuser" and redirect to Index
        myStorage.setItem('currentuser', username);
        
        // Store the current user's full name for easy display purposes
        let employeeLastIndex = parseInt(myStorage.getItem('employeeLastIndex'));//checking latest index of employees
        let fullName = "";
        let role = "";

	    //looping through 1 to all indexes of employees
        for (let i = 1; i <= employeeLastIndex; i++){
            //loading the employee data and parsing the string back into a string array if there is data stored
            let e = JSON.parse(myStorage.getItem("employeeID:" + i.toString()));

            if (e !== null){
                // Check if employee username matches
                //c[0] to c[6] are the elements in the array -> first name, last name, address, ...
                if (e[4] == username){
                    fullName = e[1] + " " + e[2];   // Get their full name
                    role = e[3];
                    break;
                }
            }        
        }
        myStorage.setItem('currentuserFullName', fullName);// Store the current user's full name for easy display purposes
        myStorage.setItem('currentuserRole', role);// Store the current user's role
        
        window.location.href = 'Index.html';
    }
    else{
        //if the user doesn't exist or the password doesn't match, show an alert
        alert('Incorrect username or password!');
    }
}


function loginDisplay() {
    select = document.getElementById('inputEmployee');
    var employeeID = select.value;
    let myStorage = window.localStorage;

    //load username from local storage via employee ID
    var empUsername = JSON.parse(myStorage.getItem(employeeID.toString()))[4];
    //load password to the username from local storage
    var empPassword = myStorage.getItem(empUsername)
        
    //display username and password for the selected employee
    $("#inputUsername").val(empUsername);
    $("#inputPassword").val(empPassword);

    //enable the username and password textboxes
    $("#inputUsername").attr('disabled', false);
    $("#inputPassword").attr('disabled', false);
}

function loginUpdate() {
    let myStorage = window.localStorage;
    select = document.getElementById('inputEmployee');
    var employeeID = select.value;
    var username = $("#inputUsername").val();
    var password = $("#inputPassword").val();

    //get current employee data
    var employeeUpdate = JSON.parse(myStorage.getItem(employeeID.toString()));

    //change only the username of the employee and save changes to local storage
    employeeUpdate[4] = username;
    myStorage.setItem(employeeID.toString(), JSON.stringify(employeeUpdate));

    //update password to the same username
    myStorage.setItem(username, password);

}
