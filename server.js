var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require('console.table')

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Gucc1@ndBuddy",
  database: "managementDB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    runSearch();
  });

  function runSearch() {
    inquirer
      .prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
          "View all employees",
          "View all departments",
          "View all roles",
          "Add employee",
          "Remove employee",
          "Update employee",
          "Exit",
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "View all employees":
          viewEmployee();
          break;
  
        case "View all departments":
          viewEmployeeDepartment();
          break;

        case "View all roles":
            viewEmployeeRole();
            break;

        case "Add employee":
          addEmployee();
          break;
  
        case "Remove employee":
          removeEmployee();
          break;
        case "Update employee":
          updateEmployee();
          break;
        case "Exit":
            exit();
            break;
      }
    });
  }

function viewEmployee(){
    var query = "SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS departments, roles.salary FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments on roles.department_id = departments.id"; 
    connection.query(query, function(err, res) {
        console.log("\n Retriving all currently employed employees \n");
        console.table(res);
    });
    runSearch();
    
}

function viewEmployeeDepartment(){
  connection.query("SELECT * FROM departments" , function(err, res){
    console.log("\n Retriving all available departments \n")
    console.table(res);
  })
  runSearch();
}

  function viewEmployeeRole() {
  connection.query("SELECT * FROM roles", function( err, res){
    console.log("\n Retriving all available roles \n");
    console.table(res);
    })
    runSearch();
  }
  
