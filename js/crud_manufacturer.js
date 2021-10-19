var editRow = null;

function manufacturerDelete(ctl) {
    let myStorage3 = window.localStorage;    
    
    if (confirm("Are you sure you want to delete this Manufacturer?")) {
        myStorage3.removeItem($("#inputManufacturerNumber").val().toString());        
    }
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
    let manufacturer1 = ['301', 'John Deere'];
    let manufacturer2 = ['302', 'Toro'];
    let manufacturer3 = ['303', 'Troy-Bilt'];
    let manufacturer4 = ['304', 'Greenworks'];
	
    myStorage3.setItem('301', JSON.stringify(manufacturer1));
	myStorage3.setItem('302', JSON.stringify(manufacturer2));
	myStorage3.setItem('303', JSON.stringify(manufacturer3));
	myStorage3.setItem('304', JSON.stringify(manufacturer4));
	
	myStorage3.setItem('manufacturerAmount', '4');
}

function saveManufacturer(){
    let myStorage3 = window.localStorage;
	let manufacturerAmount = parseInt(myStorage3.getItem('manufacturerAmount'));
	
	manufacturerAmount++;
	console.log(manufacturerAmount);
	let newManufacturer = [(300 + manufacturerAmount).toString(), $("#inputManufacturer").val()];
	console.log(newManufacturer);
	myStorage3.setItem((manufacturerAmount + 300).toString(), JSON.stringify(newManufacturer))
	
	myStorage3.setItem('manufacturerAmount', manufacturerAmount.toString())
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
	//checking total amount of customers
	let myStorage3 = window.localStorage;
    let manufacturerAmount = parseInt(myStorage3.getItem('manufacturerAmount'));
    let manufacturerTable = "";

    console.log(manufacturerAmount);
	
	for (let i = 301; i <= (300 + manufacturerAmount); i++){
		if (myStorage3.getItem(i.toString()) !== null){
			let c = JSON.parse(myStorage3.getItem(i.toString()));

			manufacturerTable = manufacturerTable + manufacturerBuildTableRowLoad(c[0],c[1]);
		}
        
	}
    document.getElementById("manufacturerTable").innerHTML = manufacturerTable;
}

function filterManufacturerTable(){
	let myStorage3 = window.localStorage;
    let manufacturerAmount = parseInt(myStorage3.getItem('manufacturerAmount'));
    let manufacturerTable = "";
	
	for (let i = 301; i <= (300 + manufacturerAmount); i++){
		if (myStorage3.getItem(i.toString()) !== null){
			let c = JSON.parse(myStorage3.getItem(i.toString()));

            if ($('#filterManufacturer').val() !== "" && c[1].toUpperCase().includes($('#filterManufacturer').val().toUpperCase())){
                manufacturerTable = manufacturerTable + manufacturerBuildTableRowLoad(c[0],c[1]);                
            }			
		}        
	}
    document.getElementById("manufacturerTable").innerHTML = manufacturerTable;
}
