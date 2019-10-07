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
$("input").on("change", correctInputFields); // NOT YET WORKING
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
    // requires employee.id and employee.annualSalary to be strictly digits
    if (!/\d/.test(employee.id) || !/\d/.test(employee.annualSalary)) {
        return (alert("Please use only digits for ID and salary."));
    }
    // requires employee.firstName, employee.lastName and employee.title to use only digits and letts.
    if (/\W/.test(employee.firstName) || /\W/.test(employee.lastName) || /\W/.test(employee.title)) {
        return (alert("Please use only letters or digits for employee's name and title."));
    }
    // requires all input fields to have values
    if (!employee.firstName || !employee.lastName || !employee.id || !employee.title || !employee.annualSalary) {
        return (alert("Please fill all input fields."));
    }
    employees.push(employee);
    emptyFields();
    appendToTable(employee);
    calculateMonthlyCosts(employees);
}
// NOT YET WORKING
function correctInputFields () { //need to finish this function with border colors, make submit button inactive
    let employee = {
        firstName: $("#inputFirstName").val(),
        lastName: $("#inputLastName").val(),
        id: $("#inputID").val(),
        title: $("#inputTitle").val(),
        annualSalary: ("#inputAnnualSalary").val()
    }
    // requires employee.id and employee.annualSalary to be strictly digits
    if (!/\d/.test(employee.id) || !/\d/.test(employee.annualSalary)) {
        $(this).css("border-color", "red");
    }
    // requires employee.firstName, employee.lastName and employee.title to use only digits and letts.
    if (/\W/.test(employee.firstName) || /\W/.test(employee.lastName) || /\W/.test(employee.title)) {
        $(this).css("border-color", "red");
    }

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
    <tr style="display:none" class="entry";>
    <td>${object.firstName}</td>
    <td>${object.lastName}</td>
    <td class="id">${object.id}</td>
    <td>${object.title}</td>
    <td class="salary">${accounting.formatMoney(object.annualSalary)}</td>
    <td class="button-container"><button type="button" class="deleteButton">Delete</button></td>
    </tr>`);
    let newEntry = $(".entry").last(); // targets last added employee row in table, which is hidden
    newEntry.fadeIn(1000, function() { // gives the employee a fadeIn graphic
    });
}

// calculates monthly consts from array argument
function calculateMonthlyCosts (array) {
    let totalMonthlyCosts = 0;
    for (object of array) {
        totalMonthlyCosts += Number(object.annualSalary)/12;
    }
    $("#totalMonthly").text(`Total Monthly: ${accounting.formatMoney(Math.round(totalMonthlyCosts))}`);
    if (totalMonthlyCosts >= 20000) {
        $("#totalMonthly").css("background", "red");
        $("#totalMonthly").css("color", "white");

    } else {
        $("#totalMonthly").css("background", "white");
        $("#totalMonthly").css("color", "#5053ff");
    }
}

// removes row from table
function removeFromTable () {
    let id = Number($(this).parent().siblings(".id").text());
    console.log(id);
    $(this).closest('tr').fadeOut(1000, function() {
        $(this).closest('tr').remove();
    });
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