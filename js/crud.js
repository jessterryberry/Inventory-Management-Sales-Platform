function customerDelete(ctl) {
    if (confirm("Are you sure you want to delete this customer?")) {
        $(ctl).parents("tr").remove();
    }
}

function customerBuildTableRow() {
    var ret = "<tr>" +
        "<td>" + $("#inputFirstName").val() + "</td>" +
        "<td>" + $("#inputLastName").val() + "</td>" +
        "<td class='hide-col'>" + $("#inputAddress").val() + "</td>" +        
        "<td>" + $("#inputCity").val() + "</td>" +
        "<td class='hide-col'>" + $("#inputPostalCode").val() + "</td>" +
        "<td>" + $("#inputEmail").val() + "</td>" +
        "<td>" + $("#inputPhone").val() + "</td>" +
        "<td>" +
        "<button class='btn btn-outline-secondary' onclick='customerDisplay(this);' type='button' data-bs-toggle='collapse' id='editToggle' href='#collapseEdit' aria-expanded='false' aria-controls='collapseEdit'>Edit</button>" +
        "</td>" +
        "<td>" + "<button type='button' class='btn btn-outline-secondary' onclick= 'customerDelete(this);' data-id='1'>Delete</button>" + "</td>" +
        "</tr>"  
        
        return ret;
    }

//current customer being edited
var editRow = null;

function customerDisplay(ctl) {
    editRow = $(ctl).parents("tr");
    var cols = editRow.children("td");

        $("#inputFirstName").val($(cols[0]).text());
        $("#inputLastName").val($(cols[1]).text());
        $("#inputAddress").val($(cols[2]).text());
        $("#inputCity").val($(cols[3]).text());
        $("#inputPostalCode").val($(cols[4]).text());
        $("#inputEmail").val($(cols[5]).text());
        $("#inputPhone").val($(cols[6]).text());
    //Changing button to update
    $("#updateButton").text("Update");
}

function customerUpdate() {
    customerUpdateInTable();
    
    //clear the fields
    formClear();  
}

function customerUpdateInTable() {
    //add changed customer to the table
    $(editRow).after(customerBuildTableRow());

    //remove old customer row
    $(editRow).remove();

    //clear the form
    formClear();
}

function customerUpdateDDL() {
    if ($("#customers option:selected").text = "Joe Smith") {
        $("#inputFirstName").val();
        $("#inputLastName").val();
        $("#inputAddress").val();
        $("#inputCity").val();
        $("#inputPostalCode").val();
        $("#inputEmail").val($(cols[5]).text());
        $("#inputPhone").val($(cols[6]).text());
    }
}