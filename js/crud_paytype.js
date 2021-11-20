//current entry being edited
var editRow = null;

function payTypeDelete(ctl) {
    let myStorage3 = window.localStorage;
    myStorage3.removeItem($("#inputPayTypeNumber").val().toString());
    loadPayTypeTable();
}

function payTypeDisplay(ctl, mode) {
    editRow = $(ctl).parents("tr");
    var cols = editRow.children("td");
    var payTypeID = $(cols[0]).text();
    let myStorage3 = window.localStorage;
    var payTypeData = JSON.parse(myStorage3.getItem(payTypeID.toString()));
        
        $("#inputPayTypeNumber").val(payTypeData[0]);
        $("#inputPayType").val(payTypeData[1]);        
    
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

function payTypeUpdate() {
    let myStorage3 = window.localStorage;
    var cols = editRow.children("td");
    var payTypeID = $(cols[0]).text();
    var payTypeUpdate = [payTypeID.toString(), $("#inputPayType").val()];

    myStorage3.setItem(payTypeID.toString(), JSON.stringify(payTypeUpdate));  

    loadPayTypeTable();
}

function demoPayTypeData(){
	let myStorage3 = window.localStorage;
    
    let payType1 = ['payTypeID:1', 'American Express'];
    let payType2 = ['payTypeID:2', 'Cash'];
    let payType3 = ['payTypeID:3', 'Debit'];
    let payType4 = ['payTypeID:4', 'Mastercard'];
    let payType5 = ['payTypeID:5', 'Visa'];
	
    myStorage3.setItem('payTypeID:1', JSON.stringify(payType1));
	myStorage3.setItem('payTypeID:2', JSON.stringify(payType2));
	myStorage3.setItem('payTypeID:3', JSON.stringify(payType3));
	myStorage3.setItem('payTypeID:4', JSON.stringify(payType4));
    myStorage3.setItem('payTypeID:5', JSON.stringify(payType5));
	
	myStorage3.setItem('payTypeLastIndex', '5');
}

function savePayType(){
    let myStorage3 = window.localStorage;
	let payTypeLastIndex = parseInt(myStorage3.getItem('payTypeLastIndex'));
	
	payTypeLastIndex++;
	console.log(payTypeLastIndex);
	let newPayType = ["payTypeID:" + payTypeLastIndex.toString(), $("#inputPayType").val()];
	console.log(newPayType);
	myStorage3.setItem("payTypeID:" + payTypeLastIndex.toString(), JSON.stringify(newPayType))
	
	myStorage3.setItem('payTypeLastIndex', payTypeLastIndex.toString())
}

function payTypeBuildTableRowLoad(id, type) {
    var ret = "<tr>" +
        "<td class='hide-col'>" + id + "</td>" + 
        "<td>" + type + "</td>" + 
        "<td>" +
        "<button class='btn btn-outline-secondary' onclick='payTypeDisplay(this, 3);' style='color:black;' type='button' data-bs-toggle='collapse' id='editToggle' href='#collapseEdit' aria-expanded='false' aria-controls='collapseEdit'>Details</button>" +
        "</td>" +
        "<td>" +
        "<button class='btn btn-outline-secondary' onclick='payTypeDisplay(this, 1);' style='color:black;' type='button' data-bs-toggle='collapse' id='editToggle' href='#collapseEdit' aria-expanded='false' aria-controls='collapseEdit'>Edit</button>" +
        "</td>" +
        "<td>" + "<button class='btn btn-outline-secondary' onclick='payTypeDisplay(this, 2);' style='color:black;' type='button' data-bs-toggle='collapse' id='editToggle' href='#collapseEdit' aria-expanded='false' aria-controls='collapseEdit'>Delete</button>" + "</td>" +
        "</tr>"  
        
	return ret;
}
function loadPayTypeTable(){
	// Clear filter input fields in HTML
    $('#filterPayType').val("");
    
    //checking latest index
	let myStorage3 = window.localStorage;
    let payTypeLastIndex = parseInt(myStorage3.getItem('payTypeLastIndex'));
    let payTypeTable = "";

    console.log(payTypeLastIndex);
	
	for (let i = 1; i <= payTypeLastIndex; i++){
        let c = JSON.parse(myStorage3.getItem("payTypeID:" + i.toString()));

		if (c !== null){
			payTypeTable = payTypeTable + payTypeBuildTableRowLoad(c[0],c[1]);
		}
        
	}
    document.getElementById("payTypeTable").innerHTML = payTypeTable;
}

function filterPayTypeTable(){
	let myStorage3 = window.localStorage;
    let payTypeLastIndex = parseInt(myStorage3.getItem('payTypeLastIndex'));
    let payTypeTable = "";
	
	for (let i = 1; i <= payTypeLastIndex; i++){
        let c = JSON.parse(myStorage3.getItem("payTypeID:" + i.toString()));

		if (c !== null){
			if ($('#filterPayType').val() !== "" && c[1].toUpperCase().includes($('#filterPayType').val().toUpperCase())){
                payTypeTable = payTypeTable + payTypeBuildTableRowLoad(c[0],c[1]);                
            }			
		}        
	}
    document.getElementById("payTypeTable").innerHTML = payTypeTable;
}
