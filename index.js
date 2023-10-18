const inquirer = require('inquirer');
const connection = require('./connection').promise();

const start = async () => {
  let exitLoop = false;

  while (!exitLoop) {
    const { choice } = await inquirer.prompt({
      name: 'choice',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ]
    });

    try {
      switch (choice) {
        case 'View all departments':
          await viewAllDepartments();
          break;
        case 'View all roles':
          await viewAllRoles();
          break;
        case 'View all employees':
          await viewAllEmployees();
          break;
        case 'Add a department':
          await addDepartment();
          break;
        case 'Add a role':
          await addRole();
          break;
        case 'Add an employee':
          await addEmployee();
          break;
        case 'Update an employee role':
          await updateEmployeeRole();
          break;
        case 'Exit':
          console.log('Goodbye!');
          connection.end();
          exitLoop = true;
          break;
        default:
          console.log('Invalid choice!');
      }
    } catch (error) {
      console.error("Encountered an error:", error.message);
    }
  }
}

const viewAllDepartments = async () => {
  const [departments] = await connection.query('SELECT * FROM department');
  console.table(departments);
}

const viewAllRoles = async () => {
  const [roles] = await connection.query('SELECT * FROM role');
  console.table(roles);
}

const viewAllEmployees = async () => {
  const [employees] = await connection.query('SELECT * FROM employee');
  console.table(employees);
}

const addDepartment = async () => {
  const { name } = await inquirer.prompt({
      type: 'input',
      name: 'name',
      message: 'Enter the department name:'
  });

  await connection.query('INSERT INTO department (name) VALUES (?)', [name]);
  console.log('Department added successfully!');
}

const addRole = async () => {
  const { title, salary, departmentId } = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the role title:'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the salary for this role:'
    },
    {
      type: 'input',
      name: 'departmentId',
      message: 'Enter the department ID for this role:'
    }
  ]);

  await connection.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentId]);
  console.log('Role added successfully!');
}

const addEmployee = async () => {
  const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'Enter the employee\'s first name:'
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'Enter the employee\'s last name:'
    },
    {
      type: 'input',
      name: 'roleId',
      message: 'Enter the role ID for this employee:'
    },
    {
      type: 'input',
      name: 'managerId',
      message: 'Enter the manager ID for this employee (Leave blank if none):',
      default: null
    }
  ]);

  await connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerId || null]);
  console.log('Employee added successfully!');
}

const updateEmployeeRole = async () => {
  const { employeeId, newRoleId } = await inquirer.prompt([
      {
          type: 'input',
          name: 'employeeId',
          message: 'Enter the ID of the employee you want to update:'
      },
      {
          type: 'input',
          name: 'newRoleId',
          message: 'Enter the new role ID for this employee:'
      }
  ]);

  await connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [newRoleId, employeeId]);
  console.log('Employee role updated successfully!');
}

start();
