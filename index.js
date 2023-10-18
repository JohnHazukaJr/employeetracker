const inquirer = require('inquirer');
const connection = require('./connection');

const start = async () => {
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

  switch (choice) {
    case 'View all departments':
      // View all departments logic here
      break;
    case 'View all roles':
      // View all roles logic here
      break;
    case 'View all employees':
      // View all employees logic here
      break;
    case 'Add a department':
      // Add a department logic here
      break;
    case 'Add a role':
      // Add a role logic here
      break;
    case 'Add an employee':
      // Add an employee logic here
      break;
    case 'Update an employee role':
      // Update an employee role logic here
      break;
    case 'Exit':
      connection.end();
      return;
  }

  start();
};

start();
