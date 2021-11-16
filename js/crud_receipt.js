function loadAllDDLs(){
    loadCustomerDDL();
    loadEmployeeDDL();
}

function loadCustomerDDL(){
    //checking latest index of customers
	let myStorage = window.localStorage;
    let customerLastIndex = parseInt(myStorage.getItem('customerLastIndex'));
    select = document.getElementById('inputCustomer');
	
	//looping through 1 to all indexes of customers
	for (let i = 1; i <= customerLastIndex; i++){
		//loading the customer data and parsing the string back into a string array if there is data stored
        let c = JSON.parse(myStorage.getItem("customerID:" + i.toString()));

		if (c !== null){
			// Add each customer name to select list
            var opt = document.createElement('option');
            opt.value = c[0];
            opt.innerHTML = c[1] + " " + c[2];
            select.add(opt);
		}
	}
}

function loadEmployeeDDL(){
    //checking latest index of employees
	let myStorage = window.localStorage;
    let employeeLastIndex = parseInt(myStorage.getItem('employeeLastIndex'));
    select = document.getElementById('inputEmployee');
	
	//looping through 1 to all indexes of employees
	for (let i = 1; i <= employeeLastIndex; i++){
		//loading the customer data and parsing the string back into a string array if there is data stored
        let c = JSON.parse(myStorage.getItem("employeeID:" + i.toString()));

		if (c !== null){
			// Add each employees name to select list
            var opt = document.createElement('option');
            opt.value = c[0];
            opt.innerHTML = c[1] + " " + c[2];
            select.add(opt);
		}
	}
}
