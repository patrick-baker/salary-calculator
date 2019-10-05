$(document).ready(readyNow);

let employees = [];

function readyNow () {
$("#submitButton").on("click", addEmployee);
$("tbody").on("click", ".deleteButton", removeFromTable)
}

// creates employee object from input fields, pushes to employee array
function addEmployee () {
    let employee = {
        firstName: $("#inputFirstName").val(),
        lastName: $("#inputLastName").val(),
        id: $("#inputID").val(),
        title: $("#inputTitle").val(),
        annualSalary: $("#inputAnnualSalary").val()
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
        totalMonthlyCosts += object.annualSalary;
    }
    $("#totalMonthly").text(`Total Monthly:$${Math.round(totalMonthlyCosts/12)}`);
}

// removes row from table
function removeFromTable () {
    let id = $(this).parent().siblings(".id").text();
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