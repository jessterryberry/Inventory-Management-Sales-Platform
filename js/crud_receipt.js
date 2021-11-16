// Load data lists for blank new sale page
function initializeNewSale(){
    loadCustomerDDL();
    loadEmployeeDDL();
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
		//loading the customer data and parsing the string back into a string array if there is data stored
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

function addOrderLine(){
    let saleTable = document.getElementById("saleTable").innerHTML; // Get existing table data
    let rowNo = document.getElementById("saleTable").rows.length;   // Check current number of rows to see if table exists

    
    let dict = new Map(); // Map can be used like a dictionary, which I use here to hold previous selected values

    // If table exists, loop through rows to save currently selected values
    for (let i = 1; i <= rowNo; i++){
        dict.set("inventoryDDLRow" + i, document.getElementById("inventoryDDLRow" + i).value);
        dict.set("qtyRow" + i, document.getElementById("qtyRow" + i).value);
        dict.set("priceRow" + i, document.getElementById("priceRow" + i).value);
    }

    let oldRowNo = rowNo;   // Remember old row number
    rowNo++; // Increment number for new row

    // Generate blank new row
    let newLine = "<tr id='orderRow" + rowNo + "'>" +
    "<td>" + rowNo + "</td>" +
    "<td id='itemRow" + rowNo + "'></td>" +
    "<td id='qohRow" + rowNo + "'></td>" +
    "<td>" + "<select id='qtyRow" + rowNo + "'>" + "</td>" +        
    "<td id='suggestedPriceRow" + rowNo + "' style='text-align:right'></td>" +
    "<td style='text-align:right'>" + "$<input type='text' style='text-align:right' id='priceRow" + rowNo + "'>" + "</td>" +
    "<td>" + '<input title="Delete This Line From Order" type="button" onclick="removeOrderLine();" id="deleteButtonRow' + rowNo + '" class="btn btn-primary btn-sm" style="background-color:#67C18C; color:black;" value="❌"/>' + "</td>" +
    "</tr>" 

    // Add row to table
    document.getElementById("saleTable").innerHTML = saleTable + newLine;

    // Access local storage
    let myStorage2 = window.localStorage;

    // Prepare to add inventory DDL data to row
    let inventoryLastIndex = parseInt(myStorage2.getItem('inventoryLastIndex'));

    let inventoryDDL = "<select id='inventoryDDLRow" + rowNo + "' onchange='refreshRowData(" + rowNo + ")'>";
    
    // Pull data for inventory DDL
    for (let i = 1; i <= inventoryLastIndex; i++){
        let c = JSON.parse(myStorage2.getItem("inventoryID:" + i.toString()));
        
		if (c !== null){
			inventoryDDL +=  "<option value='inventoryID:" + i + "'>" + c[1] + "</option>";
		}
        
	}

    inventoryDDL += "</select>";

    // Add new inventory DDL to new row in sale table
    document.getElementById("itemRow" + rowNo).innerHTML = inventoryDDL;

    // Refresh data inside new row using data from inventory
    refreshRowData(rowNo);

    // Set previous rows to previously selected values
    for (let i = 1; i <= oldRowNo; i++){
        document.getElementById("inventoryDDLRow" + i).value = dict.get("inventoryDDLRow" + i);;
        let c = JSON.parse(myStorage2.getItem(document.getElementById("inventoryDDLRow" + i).value));
        document.getElementById("qohRow" + i).innerHTML = c[5];
        document.getElementById("suggestedPriceRow" + i).innerHTML = c[6];
        document.getElementById("qtyRow" + i).value = dict.get("qtyRow" + i);
        document.getElementById("priceRow" + i).value = dict.get("priceRow" + i);
    }
}

function removeOrderLine(rowID){
    
}

// Gets data about inventory when an item DDL is changed
function refreshRowData(rowNo){
    // Access local storage
    let myStorage2 = window.localStorage;

    // Get inventory item data
    let c = JSON.parse(myStorage2.getItem(document.getElementById("inventoryDDLRow" + rowNo).value));

    // Put data into row boxes
    document.getElementById("qohRow" + rowNo).innerHTML = c[5];
    document.getElementById("suggestedPriceRow" + rowNo).innerHTML = c[6];
    document.getElementById("priceRow" + rowNo).value = c[6].replace('$','');

    // Populate drop down list for quantity
    let qtyDDL = document.getElementById("qtyRow" + rowNo)
    $("#qtyRow" + rowNo).empty();

    for (let i = 1; i <= parseInt(c[5]); i++){
        let option = document.createElement("option");
        option.text = i;
        option.value = i;
        qtyDDL.add(option); 
	}
}
