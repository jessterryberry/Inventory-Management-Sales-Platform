//current entry being edited
var editRow = null;

function inventoryDelete(ctl) {
    let myStorage2 = window.localStorage;    
    
    if (confirm("Are you sure you want to delete this Item?")) {
        myStorage2.removeItem($("#inputInvNumber").val().toString());        
    }
    loadInventoryTable();
}

function inventoryDisplay(ctl, mode) {
    editRow = $(ctl).parents("tr");
    var cols = editRow.children("td");
    var inventoryID = $(cols[0]).text();
    let myStorage2 = window.localStorage;
    var inventoryData = JSON.parse(myStorage2.getItem(inventoryID.toString()));
        
        $("#inputInvNumber").val(inventoryData[0]);
        $("#inputInvName").val(inventoryData[1]);
        $("#inputInvDesc").val(inventoryData[2]);
        $("#inputBrand").val(inventoryData[3]);
        $("#inputSize").val(inventoryData[4]);
        $("#inputQuantity").val(inventoryData[5]);
        $("#inputPrice").val(inventoryData[6]);
    
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

function inventoryUpdate() {
    let myStorage2 = window.localStorage;
    var cols = editRow.children("td");
    var inventoryID = $(cols[0]).text();
    var inventoryUpdate = [inventoryID.toString(), $("#inputInvName").val(), $("#inputInvDesc").val(), $("#inputBrand").val(), $("#inputSize").val(), $("#inputQuantity").val(), $("#inputPrice").val()];

    myStorage2.setItem(inventoryID.toString(), JSON.stringify(inventoryUpdate));  

    loadInventoryTable();
}

function demoInvData(){
	let myStorage2 = window.localStorage;
    let inventory1 = ['inventoryID:1', '2 stroke oil (Blue)', 'Blue - Oil for a two stroke engine.', 'Castrol', '6 oz', '24', '$4.95'];
    let inventory2 = ['inventoryID:2', '2 stroke oil (Red)', 'Red - Oil for a two stroke engine.', 'Penzoil', '6 oz', '19', '$5.55'];
    let inventory3 = ['inventoryID:3', '4 stroke oil', 'Oil for a four stroke engine.', 'Castrol', '24 oz', '36', '$10.99'];
    let inventory4 = ['inventoryID:4', '50:1 Mixed Gas', 'Pre-mixed gas for two stroke engines requiring a 50:1 gas to oil ratio.', 'Castrol', '1 L', '28', '$12.99'];
    let inventory5 = ['inventoryID:5', 'Replacement Blade', 'For mower.', 'Honda', '', '7', '$19.99'];
    let inventory6 = ['inventoryID:6', 'Green Cutter', 'Gasoline powered lawn mower.', 'John Deere', '', '5', '$59.99'];
	
    myStorage2.setItem('inventoryID:1', JSON.stringify(inventory1));
	myStorage2.setItem('inventoryID:2', JSON.stringify(inventory2));
	myStorage2.setItem('inventoryID:3', JSON.stringify(inventory3));
	myStorage2.setItem('inventoryID:4', JSON.stringify(inventory4));
    myStorage2.setItem('inventoryID:5', JSON.stringify(inventory5));
    myStorage2.setItem('inventoryID:6', JSON.stringify(inventory6));
	
	myStorage2.setItem('inventoryLastIndex', '6');
}

function saveInventory(){
    let myStorage2 = window.localStorage;
	let inventoryLastIndex = parseInt(myStorage2.getItem('inventoryLastIndex'));
	
	inventoryLastIndex++;
	console.log(inventoryLastIndex);
	let newInventory = ["inventoryID:" + inventoryLastIndex.toString(), $("#inputInvName").val(), $("#inputInvDesc").val(), $("#inputBrand").val(), $("#inputSize").val(), $("#inputQuantity").val(), $("#inputPrice").val()];
	console.log(newInventory);
	myStorage2.setItem("inventoryID:" + inventoryLastIndex.toString(), JSON.stringify(newInventory))
	
	myStorage2.setItem('inventoryLastIndex', inventoryLastIndex.toString())
}
function inventoryBuildTableRowLoad(id, name, desc, brand, size, quantity, price) {
    var ret = "<tr>" +
        "<td class='hide-col'>" + id + "</td>" +
        "<td>" + name + "</td>" +
        "<td class='hide-col'>" + desc + "</td>" +     
        "<td>" + brand + "</td>" +   
        "<td>" + size + "</td>" +
        "<td>" + quantity + "</td>" +
        "<td>" + price + "</td>" +
        "<td>" +
        "<button class='btn btn-outline-secondary' onclick='inventoryDisplay(this, 3);' style='color:black;' type='button' data-bs-toggle='collapse' id='editToggle' href='#collapseEdit' aria-expanded='false' aria-controls='collapseEdit'>Details</button>" +
        "</td>" +
        "<td>" +
        "<button class='btn btn-outline-secondary' onclick='inventoryDisplay(this, 1);' style='color:black;' type='button' data-bs-toggle='collapse' id='editToggle' href='#collapseEdit' aria-expanded='false' aria-controls='collapseEdit'>Edit</button>" +
        "</td>" +
        "<td>" + "<button class='btn btn-outline-secondary' onclick='inventoryDisplay(this, 2);' style='color:black;' type='button' data-bs-toggle='collapse' id='editToggle' href='#collapseEdit' aria-expanded='false' aria-controls='collapseEdit'>Delete</button>" + "</td>" +
        "</tr>"  
        
	return ret;
}
function loadInventoryTable(){
    // Clear filter input fields in HTML
    $('#filterInvName').val("");
    $('#filterBrand').val("");
    $('#filterSize').val("");

	//checking latest index
	let myStorage2 = window.localStorage;
    let inventoryLastIndex = parseInt(myStorage2.getItem('inventoryLastIndex'));
    let invTable = "";
	
	for (let i = 1; i <= inventoryLastIndex; i++){
        let c = JSON.parse(myStorage2.getItem("inventoryID:" + i.toString()));
        
		if (c !== null){
			invTable = invTable + inventoryBuildTableRowLoad(c[0],c[1],c[2],c[3],c[4],c[5],c[6]);
		}
        
	}
    document.getElementById("inventoryTable").innerHTML = invTable;
}

function filterInventoryTable(){
	let myStorage2 = window.localStorage;
    let inventoryLastIndex = parseInt(myStorage2.getItem('inventoryLastIndex'));
    let invTable = "";
	
	for (let i = 1; i <= inventoryLastIndex; i++){
        let c = JSON.parse(myStorage2.getItem("inventoryID:" + i.toString()));

		if (c !== null){	
            if ($('#filterInvName').val() !== "" && c[1].toUpperCase().includes($('#filterInvName').val().toUpperCase())){
                invTable = invTable + inventoryBuildTableRowLoad(c[0],c[1],c[2],c[3],c[4],c[5],c[6]);                
            }
			else if ($('#filterBrand').val() !== "" && c[3].toUpperCase().includes($('#filterBrand').val().toUpperCase())){
                invTable = invTable + inventoryBuildTableRowLoad(c[0],c[1],c[2],c[3],c[4],c[5],c[6]);
            }
            else if ($('#filterSize').val() !== "" && c[4].toUpperCase().includes($('#filterSize').val().toUpperCase())){
                invTable = invTable + inventoryBuildTableRowLoad(c[0],c[1],c[2],c[3],c[4],c[5],c[6]);
            }
		}        
	}
    document.getElementById("inventoryTable").innerHTML = invTable;
}
