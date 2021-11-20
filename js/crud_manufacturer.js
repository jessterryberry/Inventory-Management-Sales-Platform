//current entry being edited
var editRow = null;

function manufacturerDelete(ctl) {
    let myStorage3 = window.localStorage;
    myStorage3.removeItem($("#inputManufacturerNumber").val().toString());
    loadManufacturerTable();
}

function manufacturerDisplay(ctl, mode) {
    editRow = $(ctl).parents("tr");
    var cols = editRow.children("td");
    var manufacturerID = $(cols[0]).text();
    let myStorage3 = window.localStorage;
    var manufacturerData = JSON.parse(myStorage3.getItem(manufacturerID.toString()));
        
        $("#inputManufacturerNumber").val(manufacturerData[0]);
        $("#inputManufacturer").val(manufacturerData[1]);        
    
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

function manufacturerUpdate() {
    let myStorage3 = window.localStorage;
    var cols = editRow.children("td");
    var manufacturerID = $(cols[0]).text();
    var manufacturerUpdate = [manufacturerID.toString(), $("#inputManufacturer").val()];

    myStorage3.setItem(manufacturerID.toString(), JSON.stringify(manufacturerUpdate));  

    loadManufacturerTable();
}

function demoManufacturerData(){
	let myStorage3 = window.localStorage;
    let manufacturer1 = ['manufacturerID:1', 'John Deere'];
    let manufacturer2 = ['manufacturerID:2', 'Toro'];
    let manufacturer3 = ['manufacturerID:3', 'Troy-Bilt'];
    let manufacturer4 = ['manufacturerID:4', 'Greenworks'];
	
    myStorage3.setItem('manufacturerID:1', JSON.stringify(manufacturer1));
	myStorage3.setItem('manufacturerID:2', JSON.stringify(manufacturer2));
	myStorage3.setItem('manufacturerID:3', JSON.stringify(manufacturer3));
	myStorage3.setItem('manufacturerID:4', JSON.stringify(manufacturer4));
	
	myStorage3.setItem('manufacturerLastIndex', '4');
}

function saveManufacturer(){
    let myStorage3 = window.localStorage;
	let manufacturerLastIndex = parseInt(myStorage3.getItem('manufacturerLastIndex'));
	
	manufacturerLastIndex++;
	console.log(manufacturerLastIndex);
	let newManufacturer = ["manufacturerID:" + manufacturerLastIndex.toString(), $("#inputManufacturer").val()];
	console.log(newManufacturer);
	myStorage3.setItem("manufacturerID:" + manufacturerLastIndex.toString(), JSON.stringify(newManufacturer))
	
	myStorage3.setItem('manufacturerLastIndex', manufacturerLastIndex.toString())
}

function manufacturerBuildTableRowLoad(id, type) {
    var ret = "<tr>" +
        "<td class='hide-col'>" + id + "</td>" + 
        "<td>" + type + "</td>" + 
        "<td>" +
        "<button class='btn btn-outline-secondary' onclick='manufacturerDisplay(this, 3);' style='color:black;' type='button' data-bs-toggle='collapse' id='editToggle' href='#collapseEdit' aria-expanded='false' aria-controls='collapseEdit'>Details</button>" +
        "</td>" +
        "<td>" +
        "<button class='btn btn-outline-secondary' onclick='manufacturerDisplay(this, 1);' style='color:black;' type='button' data-bs-toggle='collapse' id='editToggle' href='#collapseEdit' aria-expanded='false' aria-controls='collapseEdit'>Edit</button>" +
        "</td>" +
        "<td>" + "<button class='btn btn-outline-secondary' onclick='manufacturerDisplay(this, 2);' style='color:black;' type='button' data-bs-toggle='collapse' id='editToggle' href='#collapseEdit' aria-expanded='false' aria-controls='collapseEdit'>Delete</button>" + "</td>" +
        "</tr>"  
        
	return ret;
}
function loadManufacturerTable(){
	// Clear filter input fields in HTML
    $('#filterManufacturer').val("");
    
    //checking latest index
	let myStorage3 = window.localStorage;
    let manufacturerLastIndex = parseInt(myStorage3.getItem('manufacturerLastIndex'));
    let manufacturerTable = "";

    console.log(manufacturerLastIndex);
	
	for (let i = 1; i <= manufacturerLastIndex; i++){
        let c = JSON.parse(myStorage3.getItem("manufacturerID:" + i.toString()));

		if (c !== null){
			manufacturerTable = manufacturerTable + manufacturerBuildTableRowLoad(c[0],c[1]);
		}
        
	}
    document.getElementById("manufacturerTable").innerHTML = manufacturerTable;
}

function filterManufacturerTable(){
	let myStorage3 = window.localStorage;
    let manufacturerLastIndex = parseInt(myStorage3.getItem('manufacturerLastIndex'));
    let manufacturerTable = "";
	
	for (let i = 1; i <= manufacturerLastIndex; i++){
        let c = JSON.parse(myStorage3.getItem("manufacturerID:" + i.toString()));

		if (c !== null){
			if ($('#filterManufacturer').val() !== "" && c[1].toUpperCase().includes($('#filterManufacturer').val().toUpperCase())){
                manufacturerTable = manufacturerTable + manufacturerBuildTableRowLoad(c[0],c[1]);                
            }			
		}        
	}
    document.getElementById("manufacturerTable").innerHTML = manufacturerTable;
}
