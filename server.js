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
  
  function addEmployee(){
    inquirer.prompt([{
      type: "input",
      message: "Enter the new employee's first name",
      name: "firstname",
      validate: function (answer) {
        if (answer.length < 1) {
            return console.log("Please enter a first name");
        }
        return true;
    }
    },
    {
      type: "input",
      message: "Enter the new employee's last name",
      name: "lastname",
      validate: function (answer) {
        if (answer.length < 1) {
            return console.log("Please enter a last name.");
        }
        return true;
    }
    },
    {
      type: "input",
      message: "Enter Employee ID",
      name: "employeeid",
      default: '1',
    validate: function (answer) {
        if (answer.length < 1) {
            return console.log("Please enter a valid ID.");
        }
        return true;
    }
  },
  ])
  .then(function(res){
    connection.query("INSERT INTO employees SET ?",{
        first_name: res.firstname,
        last_name: res.lastname,
        role_id: res.employeeid,
        manager_id: 0,
      },
      console.log("\n Adding new employee. \n"),
      function(err,res) {
        if (err) {
          throw err;
        }
        console.table(res);
      }
    );
    runSearch();
    });
  }
  function updateEmployee() {
    let employees = [];
    connection.query("SELECT * FROM employees", function(err, res) {
      
      for (let i = 0; i < res.length; i++) {
        let employeeString =
          res[i].id + " " + res[i].first_name + " " + res[i].last_name;
        employees.push(employeeString);
      }
      
  
      inquirer
        .prompt([
          {
            type: "list",
            message: "Select the Employee you would like to promote.",
            name: "employees",
            choices: employees
          },
          {
            type: "list",
            message: "Please Select the new role.",
            choices: ["Software Engineer", "Analog Engineer", "Manager" ],
            name: "newjob"
          }
        ])
        .then(function(res) {
          console.log("Updating", res);
          const idToUpdate = {};
          idToUpdate.employeeId = parseInt(res.employees.split("")[0]);
          if (res.newjob === "Software Engineer") {
            idToUpdate.role_id = 2;
          }
          if (res.newjob === "Analog Engineer") {
            idToUpdate.role_id = 3;
          }
          if (res.newjob === "Manager") {
            idToUpdate.role_id = 4;
          } else if (res.newjob=== "New Trainee") {
            idToUpdate.role_id = 1;
          }
          connection.query(
            "UPDATE employees SET role_id = ? WHERE id = ?",
            [idToUpdate.role_id, idToUpdate.employeeId],
            function(err, data) {
              runSearch();
            }
          );
        })
    });
  }

function exit() {
  connection.end(function(err) {
    if (err) {
      return console.log('error:' + err.message);
    }
    console.log('Close the database connection.');
  });
}
