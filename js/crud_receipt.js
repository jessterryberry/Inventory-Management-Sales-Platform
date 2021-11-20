// Load data lists and prepare blank new sale page
function initializeNewSale(){
    // Populate DDLs
    loadCustomerDDL();
    loadEmployeeDDL();
    loadPayTypeDDL();

    // Set date picker default to today
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    var today = year + "-" + month + "-" + day;

    document.getElementById("inputOrderDate").value = today;

    // Disable default submit behaviour
    $('form').on('submit', function(event) {
        event.preventDefault();
    });
}

// Load data lists and prepare sales management page
function initializeSalesManagement(){
    // Populate DDLs
    loadCustomerDDL();
    loadEmployeeDDL();
    loadPayTypeDDL();

    // Populate table of all sales
    loadAllSalesTable();

    // Disable default submit behaviour
    $('form').on('submit', function(event) {
        event.preventDefault();
    });

    // Show details of order if this was a redirect
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const saleID = urlParams.get('orderNo');

    if (saleID != null)
    {
        if (document.getElementById('saleID:' + saleID + "Update") != null)
            document.getElementById('saleID:' + saleID + "Update").click();
    }
}

function loadPayTypeDDL(){
    //checking latest index of payment methods
	let myStorage = window.localStorage;
    let payTypeLastIndex = parseInt(myStorage.getItem('payTypeLastIndex'));
    select = document.getElementById('inputPaymentMethod');
	
    // Save default option
    let default_options = $("#inputPaymentMethod option");

    // Empty select list
    $("#inputPaymentMethod").empty()

	//looping through 1 to all indexes of payment methods
	for (let i = 1; i <= payTypeLastIndex; i++){
		//loading the payment data and parsing the string back into a string array if there is data stored
        let c = JSON.parse(myStorage.getItem("payTypeID:" + i.toString()));

		if (c !== null){
			// Add each payment method to select list
            let opt = document.createElement('option');
            opt.value = c[0];
            opt.innerHTML = c[1];
            select.add(opt);
		}
	}

    // sort alphabetically
    let my_options = $("#inputPaymentMethod option");

    my_options.sort(function(a,b) {
        if (a.text > b.text) return 1;
        if (a.text < b.text) return -1;
        return 0
    })

    // Re-generate select list
    $("#inputPaymentMethod").empty().append( default_options );
    $("#inputPaymentMethod").append( my_options );
    $("#inputPaymentMethod").val("");
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

// Seed data for sales
function demoData(){
	let myStorage = window.localStorage;
    
    // Create sales and order lines
    let sale1 = ["saleID:1","employeeID:5","customerID:4","2021-09-14",2,"25.95","25.95","payTypeID:1",true,""];
    let sale1orderLine1 = ["saleID:1+orderLine:1","inventoryID:1","3","4.95"];
    let sale1orderLine2 = ["saleID:1+orderLine:2","inventoryID:2","2","5.55"];
    
    let sale2 = ["saleID:2","employeeID:6","customerID:1","2021-10-09",1,"25.98","25.98","payTypeID:2",true,""]
    let sale2orderLine1 = ["saleID:2+orderLine:1","inventoryID:4","2","12.99"]

    let sale3 = ["saleID:3","employeeID:5","customerID:3","2021-10-20",1,"21.98","21.98","payTypeID:3",true,""];
    let sale3orderLine1 = ["saleID:3+orderLine:1","inventoryID:3","2","10.99"];

    let sale4 = ["saleID:4","employeeID:6","customerID:2","2021-11-20",3,"33.88","0.00","payTypeID:2",false,"Reservation. Will pick up and pay on a later date."];
    let sale4orderLine1 = ["saleID:4+orderLine:1","inventoryID:3","1","10.99"];
    let sale4orderLine2 = ["saleID:4+orderLine:2","inventoryID:1","2","4.95"];
    let sale4orderLine3 = ["saleID:4+orderLine:3","inventoryID:4","1","12.99"]

    //save them each to local storage
	//myStorage.setItem only stores strings -> use JSON.stringify to save the array as strings and JSON.parse to put them back into an array when loading
	myStorage.setItem("saleID:1", JSON.stringify(sale1));
    myStorage.setItem("saleID:1+orderLine:1", JSON.stringify(sale1orderLine1));
    myStorage.setItem("saleID:1+orderLine:2", JSON.stringify(sale1orderLine2));

    myStorage.setItem("saleID:2", JSON.stringify(sale2));
	myStorage.setItem("saleID:2+orderLine:1", JSON.stringify(sale2orderLine1));
    
    myStorage.setItem("saleID:3", JSON.stringify(sale3));
	myStorage.setItem("saleID:3+orderLine:1", JSON.stringify(sale3orderLine1));

    myStorage.setItem("saleID:4", JSON.stringify(sale4));
	myStorage.setItem("saleID:4+orderLine:1", JSON.stringify(sale4orderLine1));
    myStorage.setItem("saleID:4+orderLine:2", JSON.stringify(sale4orderLine2));
    myStorage.setItem("saleID:4+orderLine:3", JSON.stringify(sale4orderLine3));

	//save the highest index of the latest customers so we can loop later to load the data
	//myStorage.setItem only stores strings -> saving the number as a string, can use parseInt() to convert it to a number when loading
	myStorage.setItem('saleLastIndex', '4');
}

// Generate a single row of the All Sales index table
function manageSaleBuildTableRow(id, date, customerName, saleTotal, isFullyPaid) {
    var ret = "<tr>" +
        "<td class='hide-col'>" + id + "</td>" +
        "<td>" + date + "</td>" +
        "<td>" + customerName + "</td>" +
        '<td style="text-align:right">$' + saleTotal + "</td>" +
        '<td style="text-align:center">' +'<input class="form-check-input" type="checkbox" onclick="return false;"' + (isFullyPaid? ' checked' : '') + '>' + "</td>" +
        "<td>" +
        "<button class='btn btn-outline-secondary' style='color:black;' type='button'>Print</button>" +
        "</td>" +
        "<td>" +
        "<button class='btn btn-outline-secondary' onclick='receiptDisplay(this, 3);' style='color:black;' type='button' data-bs-toggle='modal' data-bs-target='#receiptModal'>Details</button>" +
        "</td>" +
        "<td>" +
        "<button id='" + id + "Update' class='btn btn-outline-secondary' onclick='receiptDisplay(this, 1);' style='color:black;' type='button' data-bs-toggle='modal' data-bs-target='#receiptModal'>Edit</button>" +
        "</td>" +
        "<td>" +
        "<button class='btn btn-outline-secondary' onclick='receiptDisplay(this, 2);' style='color:black;' type='button' data-bs-toggle='modal' data-bs-target='#receiptModal'>Delete</button>" +
        "</td>" +
        "</tr>"  
        
	return ret;
}

// Load the data from a single sale into the edit modal
function receiptDisplay(ctl, mode) {
    // Get sale ID from row
    editRow = $(ctl).parents("tr");
    let cols = editRow.children("td");
    let saleID = $(cols[0]).text();

    // Load sale from local storage
    let myStorage = window.localStorage;
    var saleData = JSON.parse(myStorage.getItem(saleID.toString()));
    
    // Select data in fields inside modal
    let formattedOrderNum = "00000" + saleData[0].replace('saleID:','');    // These two lines are to add leading zeros to the order number in the modal label
    document.getElementById("receiptModalLabel").innerHTML = "Order #" + (formattedOrderNum).substr(formattedOrderNum.length-6);

    $("#inputEmployee").val(saleData[1]);
    $("#inputCustomer").val(saleData[2]);
    $("#inputOrderDate").val(saleData[3]);
    $("#inputAmountPaid").val(saleData[6]);
    $("#inputPaymentMethod").val(saleData[7]);
    $("#inputNotes").val(saleData[9]);
    
    let rowNo = saleData[4];   // Check number of order lines for this sale
    
    // Make sure order line table is empty
    $("#saleTable tr").remove();

    // Add each order line
    for (let i = 1; i <= rowNo; i++){
        // Load the order line
        let orderLine = JSON.parse(myStorage.getItem(saleID + "+" + "orderLine:" + i));
        
        // Add line to table
        addOrderLine();

        refreshRowData(i);

        // Select the values
        document.getElementById("inventoryDDLRow" + i).value = orderLine[1];
        document.getElementById("qtyRow" + i).value = orderLine[2];
        document.getElementById("priceRow" + i).value = orderLine[3];
        let inventoryDetails = JSON.parse(myStorage.getItem(orderLine[1]));
        document.getElementById("qohRow" + i).innerHTML = inventoryDetails[5];
        document.getElementById("suggestedPriceRow" + i).innerHTML = '$' + inventoryDetails[6].replace('$','');
    }

    // Show order total
    document.getElementById("totalCost").innerHTML = "$" + saleData[5];

    // Show whether the order was fully paid
    document.getElementById("flexSwitchCheckDefault").checked = saleData[8];

    const updateButton = document.getElementById('updateButton');
    const addOrderLineButton = document.getElementById('addOrderLineButton'); 
    const deleteButton = document.getElementById('deleteButton');

    // Update button functions
    document.querySelector("form").onsubmit = function (event) {
        updateSale(saleData[0]);
    };
    deleteButton.onclick = function() { deleteSale(saleData[0]); }

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
    addOrderLineButton.disabled = updateButton.disabled; // Disable the Add Order Line button is the Update button is disabled
}

//Function to load all sales into a table for Manage Sales page
function loadAllSalesTable(){
    // Clear filters
    document.getElementById('filterCustomerName').value = '';
    document.getElementById('filterAfterDate').value = '';
    document.getElementById('filterBeforeDate').value = '';

    //checking latest index of sales
	let myStorage = window.localStorage;
    let saleLastIndex = parseInt(myStorage.getItem('saleLastIndex'));
    let allSaleTable = "";
	
	//looping through 1 to all indexes of sales
	for (let i = 1; i <= saleLastIndex; i++){
		//loading the sale data and parsing the string back into a string array if there is data stored
        let c = JSON.parse(myStorage.getItem("saleID:" + i.toString()));

		if (c !== null){
			//building a table row with the sale's information
			//c[0] to c[6] are the elements in the array
            let customer = JSON.parse(myStorage.getItem(c[2]));
            let customerName = customer[1] + " " + customer[2];

			allSaleTable = manageSaleBuildTableRow(c[0],c[3],customerName, c[5], c[8]) + allSaleTable;
		}
        
	}
    document.getElementById("allSalesTable").innerHTML = allSaleTable;
}

//Function to load sales into the Manage Sales table, but only if they match filters
function filterAllSalesTable(){
	//checking latest index of sales
	let myStorage = window.localStorage;
    let saleLastIndex = parseInt(myStorage.getItem('saleLastIndex'));
    let allSaleTable = "";
	
	//looping through 1 to all indexes of sales
	for (let i = 1; i <= saleLastIndex; i++){
		//loading the sale data and parsing the string back into a string array if there is data stored
        let c = JSON.parse(myStorage.getItem("saleID:" + i.toString()));

		if (c !== null){
			//building a table row with the customer's information
			//c[0] to c[6] are the elements in the array -> first name, last name, address, ...
            
            let addThisRecord = true; // Toggle this to false if the record fails the filter checks
            
            let customer = JSON.parse(myStorage.getItem(c[2]));
            let custFullName = customer[1] + " " + customer[2]; // Get customer full name

            if ($('#filterCustomerName').val() !== ""){
                if (!custFullName.toUpperCase().includes($('#filterCustomerName').val().toUpperCase()))
                    addThisRecord = false;
            }
			if (Date.parse(document.getElementById('filterAfterDate').value)){
                let afterDateFilter = Date.parse(document.getElementById('filterAfterDate').value);
                
                if (Date.parse(c[3]) < afterDateFilter)
                    addThisRecord = false;
            }
            if (Date.parse(document.getElementById('filterBeforeDate').value)){
                let beforeDateFilter = Date.parse(document.getElementById('filterBeforeDate').value);
                
                if (beforeDateFilter < Date.parse(c[3]))
                    addThisRecord = false;
            }

            if (addThisRecord)
            {
                allSaleTable = manageSaleBuildTableRow(c[0],c[3],custFullName, c[5], c[8]) + allSaleTable;
            }
		}        
	}
    document.getElementById("allSalesTable").innerHTML = allSaleTable;
}

// Save this sale receipt as a new sale
function saveNewSale(){
    let myStorage = window.localStorage;
	
    //loading current latest index of current sales
	let saleLastIndex = parseInt(myStorage.getItem('saleLastIndex'));
    if (isNaN(saleLastIndex)) saleLastIndex = 0;
	
	//increasing index by 1 since we are adding a sale
	saleLastIndex++;
	console.log(saleLastIndex);
	//creating new sale string array from inputs
    let rowNo = document.getElementById("saleTable").rows.length;   // Check current number of order lines
    let saleTotal = (document.getElementById("totalCost").innerHTML).replace('$',''); // Get total for this sale
    let isFullyPaid = document.getElementById("flexSwitchCheckDefault").checked;
	let newSale = ["saleID:" + saleLastIndex.toString(), $("#inputEmployee").val(), $("#inputCustomer").val(), $("#inputOrderDate").val(), rowNo, saleTotal, $("#inputAmountPaid").val(), $("#inputPaymentMethod").val(), isFullyPaid, $("#inputNotes").val()];
	console.log(newSale);
	//saving the new sale to myStorage
	myStorage.setItem("saleID:" + saleLastIndex.toString(), JSON.stringify(newSale))
	
    //save each order line to storage
    for (let i = 1; i <= rowNo; i++){
        let newOrderLine = ["saleID:" + saleLastIndex.toString() + "+" + "orderLine:" + i, document.getElementById("inventoryDDLRow" + i).value, document.getElementById("qtyRow" + i).value, document.getElementById("priceRow" + i).value]
        myStorage.setItem("saleID:" + saleLastIndex.toString() + "+" + "orderLine:" + i, JSON.stringify(newOrderLine))
        console.log(newOrderLine);
    }

	//saving the new highest sale index
	myStorage.setItem('saleLastIndex', saleLastIndex.toString())
   
    // Redirect to management page
    window.location.href = 'ManageSales.html' + "?orderNo=" + saleLastIndex;
}

// Update this sale receipt over an existing receipt
function updateSale(id){
    let myStorage = window.localStorage;
	
    //creating new sale string array from inputs
    let rowNo = document.getElementById("saleTable").rows.length;   // Check current number of order lines
    let saleTotal = (document.getElementById("totalCost").innerHTML).replace('$',''); // Get total for this sale
    let isFullyPaid = document.getElementById("flexSwitchCheckDefault").checked;
	let updatedSale = [id, $("#inputEmployee").val(), $("#inputCustomer").val(), $("#inputOrderDate").val(), rowNo, saleTotal, $("#inputAmountPaid").val(), $("#inputPaymentMethod").val(), isFullyPaid, $("#inputNotes").val()];
	
	//saving the sale to myStorage
	myStorage.setItem(id, JSON.stringify(updatedSale))
	
    //save each order line to storage
    for (let i = 1; i <= rowNo; i++){
        let newOrderLine = [id + "+" + "orderLine:" + i, document.getElementById("inventoryDDLRow" + i).value, document.getElementById("qtyRow" + i).value, document.getElementById("priceRow" + i).value]
        myStorage.setItem(id + "+" + "orderLine:" + i, JSON.stringify(newOrderLine))
        console.log(newOrderLine);
    }

    window.alert("Saved " + document.getElementById("receiptModalLabel").innerHTML + ".");
    loadAllSalesTable();
}

// Delete a single receipt based on the ID
function deleteSale(id) {
    let myStorage = window.localStorage;
        // Delete order lines related to this receipt
        var saleData = JSON.parse(myStorage.getItem(id));
        let rowNo = saleData[4];   // Check number of order lines for this sale
        for (let i = 1; i <= rowNo; i++){
            // Delete the order line
            myStorage.removeItem(id + "+" + "orderLine:" + i);
        }
        // Delete receipt
        myStorage.removeItem(id);        
    
    loadAllSalesTable();
}

// Add a new order line to the current sale receipt
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
    "<td id='qohRow" + rowNo + "' style='text-align:right'></td>" +
    "<td style='text-align:right'>" + "<select id='qtyRow" + rowNo + "' onchange='calculateTotal()'>" + "</td>" +        
    "<td id='suggestedPriceRow" + rowNo + "' style='text-align:right'></td>" +
    "<td style='text-align:right'>" + "<span class='input-dollar left'><input type='number' onchange='calculateTotal()' min='0.01' step='0.01' style='text-align:right' id='priceRow" + rowNo + "'></span>" + "</td>" +
    "<td>" + '<input title="Delete This Line From Order" type="button" onclick="deleteOrderLine(' + rowNo + ');" id="deleteButtonRow' + rowNo + '" class="btn btn-primary btn-sm" style="background-color:#67C18C; color:black;" value="❌"/>' + "</td>" +
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
        document.getElementById("inventoryDDLRow" + i).value = dict.get("inventoryDDLRow" + i);
        let c = JSON.parse(myStorage2.getItem(dict.get("inventoryDDLRow" + i)));
        document.getElementById("qohRow" + i).innerHTML = c[5];
        document.getElementById("suggestedPriceRow" + i).innerHTML = '$' + c[6].replace('$','');
        document.getElementById("qtyRow" + i).value = dict.get("qtyRow" + i);
        document.getElementById("priceRow" + i).value = dict.get("priceRow" + i);
    }

    // Recalculate order total
    calculateTotal();
}

// "Delete" a specific row from the order table by saving all values except the row you want to delete,
// deleting the final row, then re-entering the previous values into the table so only saved values remain
function deleteOrderLine(rowID){
    let rowNo = parseInt(rowID);
    let myStorage2 = window.localStorage;
    let saleTable = document.getElementById("saleTable");

    let dict = new Map(); // Map can be used like a dictionary, which I use here to hold previous selected values

    // Loop through rows to save currently selected values, except from row marked for deletion
    for (let i = 1; i <= saleTable.rows.length; i++){
        if (i != rowNo)
        {
            dict.set("inventoryDDLRow" + i, document.getElementById("inventoryDDLRow" + i).value);
            dict.set("qtyRow" + i, document.getElementById("qtyRow" + i).value);
            dict.set("priceRow" + i, document.getElementById("priceRow" + i).value);
        }
    }

    saleTable.deleteRow(saleTable.rows.length - 1); // Delete last row in sale table
    
    // Set previous rows to previously selected values
    for (let i = 1; i <= saleTable.rows.length; i++){
        if (i < rowNo)  // For rows before the deleted row, just re-enter the values
        {
            document.getElementById("inventoryDDLRow" + i).value = dict.get("inventoryDDLRow" + i);
            let c = JSON.parse(myStorage2.getItem(dict.get("inventoryDDLRow" + i)));
            document.getElementById("qohRow" + i).innerHTML = c[5];
            document.getElementById("suggestedPriceRow" + i).innerHTML = '$' + c[6].replace('$','');
            document.getElementById("qtyRow" + i).value = dict.get("qtyRow" + i);
            document.getElementById("priceRow" + i).value = dict.get("priceRow" + i);
        }
        else    // For rows after the deleted row, offset the number by 1 when getting from dictionary to account for gap in table left by deletion
        {
            document.getElementById("inventoryDDLRow" + i).value = dict.get("inventoryDDLRow" + (i + 1));
            let c = JSON.parse(myStorage2.getItem(dict.get("inventoryDDLRow" + (i + 1))));
            document.getElementById("qohRow" + i).innerHTML = c[5];
            document.getElementById("suggestedPriceRow" + i).innerHTML = '$' + c[6].replace('$','');
            document.getElementById("qtyRow" + i).value = dict.get("qtyRow" + (i + 1));
            document.getElementById("priceRow" + i).value = dict.get("priceRow" + (i + 1));
        }
    }

    // Recalculate order total
    calculateTotal();
}

// Gets data about inventory when an item DDL is changed
function refreshRowData(rowNo){
    // Access local storage
    let myStorage2 = window.localStorage;

    // Get inventory item data
    let c = JSON.parse(myStorage2.getItem(document.getElementById("inventoryDDLRow" + rowNo).value));

    // Put data into row boxes
    document.getElementById("qohRow" + rowNo).innerHTML = c[5];
    document.getElementById("suggestedPriceRow" + rowNo).innerHTML = '$' + c[6].replace('$','');
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

    // Recalculate order total
    calculateTotal();
}

// Calculates the total from order lines and puts it into the footer of the table
function calculateTotal(){
    let saleTable = document.getElementById("saleTable");

    let sum = 0; // For tallying total

    // Loop through table and add up total
    for (let i = 1; i <= saleTable.rows.length; i++){
        document.getElementById("priceRow" + i).value = parseFloat(document.getElementById("priceRow" + i).value).toFixed(2); // Ensure price is 2 decimals only
        sum += parseFloat(document.getElementById("qtyRow" + i).value) * parseFloat(document.getElementById("priceRow" + i).value);
    }

    // Write sum into the footer
    document.getElementById("totalCost").innerHTML = "$" + sum.toFixed(2);

    // Toggle fully-paid checkbox if customer has paid enough
    document.getElementById("flexSwitchCheckDefault").checked = (sum.toFixed(2) <= parseFloat(document.getElementById("inputAmountPaid").value));
}

// Rounds customer's amount paid to 2 decimals and then compares it to the order total
function compareAmountPaidToOrderTotal(){
    document.getElementById("inputAmountPaid").value = parseFloat(document.getElementById("inputAmountPaid").value).toFixed(2); // Ensure price is 2 decimals only

    let amountPaid = document.getElementById("inputAmountPaid").value;
    let totalCost = parseFloat((document.getElementById("totalCost").innerHTML).replace('$',''));

    // Toggle fully-paid checkbox if customer has paid enough
    document.getElementById("flexSwitchCheckDefault").checked = (totalCost <= amountPaid);
}