$(document).ready(readyNow);

let employees = [
    {
        firstName: "Jen",
        lastName: "Barber",
        id: 4521,
        title: "Team Lead",
        annualSalary: 80000
    },
    {
        firstName: "Maurice",
        lastName: "Moss",
        id: 8724,
        title: "Support Team",
        annualSalary: 58000
    },
    {
        firstName: "Roy",
        lastName: "Smith",
        id: 9623,
        title: "Quality Assurance",
        annualSalary: 48000
    }
];

function readyNow () {
calculateMonthlyCosts(employees);
$("#submitButton").on("click", addEmployee);
$("tbody").on("click", ".deleteButton", removeFromTable)
}

// creates employee object from input fields, pushes to employee array
function addEmployee () {
    let employee = {
        firstName: $("#inputFirstName").val(),
        lastName: $("#inputLastName").val(),
        id: Number($("#inputID").val()),
        title: $("#inputTitle").val(),
        annualSalary: Number($("#inputAnnualSalary").val())
    }
    employees.push(employee);
    emptyFields();
    appendToTable(employee);
    calculateMonthlyCosts(employees);
}

// empties input fields
function emptyFields() {
    $("#inputFirstName").val("");
    $("#inputLastName").val("");
    $("#inputID").val("");
    $("#inputTitle").val("");
    $("#inputAnnualSalary").val("");
}

// appends object argument data to table
function appendToTable (object) {
    $('tbody').append(`
    <tr>
    <td>${object.firstName}</td>
    <td>${object.lastName}</td>
    <td class="id">${object.id}</td>
    <td>${object.title}</td>
    <td class="salary">$${object.annualSalary}</td>
    <td class="button-container"><button type="button" class="deleteButton">Delete</button></td>
    </tr>`)
}

// calculates monthly consts from array argument
function calculateMonthlyCosts (array) {
    let totalMonthlyCosts = 0;
    for (object of array) {
        totalMonthlyCosts += Number(object.annualSalary)/12;
    }
    $("#totalMonthly").text(`Total Monthly:$${Math.round(totalMonthlyCosts)}`);
    if (totalMonthlyCosts >= 20000) {
        $("#totalMonthly").css("background", "red");
    }
}

// removes row from table
function removeFromTable () {
    let id = Number($(this).parent().siblings(".id").text());
    console.log(id);
    $(this).closest('tr').remove();
    removeEmployeeFromArray(id);
    calculateMonthlyCosts(employees);
}

// removes employee from employees array
function removeEmployeeFromArray(indicator) {
    for (i in employees) {
        if (indicator === employees[i].id) {
            employees.splice(i,1);
        }
    }
    console.log(employees);
}