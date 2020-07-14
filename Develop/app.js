const Manager=require("./lib/Manager");
const Engineer=require("./lib/Engineer");
const Intern=require("./lib/Intern");
const inquirer=require("inquirer");
const path=require("path");
const fs=require("fs");

const OUTPUT_DIR=path.resolve(__dirname,"output");
const outputPath=path.join(OUTPUT_DIR,"team.html");

const render=require("./lib/htmlRenderer");
const teamMembers=[];

// Prompting the user if they would like to enter a new employeee
function newEmp() {
    inquirer
        .prompt([
            {
                type: "confirm",
                message: "Would you like to add an employee?",
                name: "confirm"
            }
        ]).then(response => {
            if(response.confirm) {
                createTeam();
            } else {
                console.log("Okay!")
            }
        });

    // Asking which role they want to create a card for
    const createTeam=() => {
        inquirer.prompt([
            {
                type: "list",
                message: "Please select the type of employee you'd like to add.",
                name: "employeetype",
                choices: [
                    "Manager",
                    "Engineer",
                    "Intern",
                ]
            }
        ]).then(response => { // Calling a function based on their role choice
            switch(response.employeetype) {
                case "Manager":
                    addMan();
                    break;
                case "Intern":
                    addInt();
                    break;
                case "Engineer":
                    addEng();
                    break;
                default:
                    buildTeam();
            }
        });
    }

    const addMan=() => {
        inquirer.prompt([
            {
                type: "input",
                message: "What's the employee's name?",
                name: "name"
            },
            {
                type: "input",
                message: "What's the ID for the employee?",
                name: "id"
            },
            {
                type: "input",
                message: "What's the email for the employee?",
                name: "email"
            },
            {
                type: "input",
                message: "What's the Office Number for the employee?",
                name: "officeNumber"
            },
        ]).then(response => { // Taking the response and pushing it into an array
            const manager=new Manager(response.name,response.id,response.email,response.officeNumber);
            teamMembers.push(manager);
            console.log(teamMembers);
            addEmp();

        })
    }

    const addInt=() => {
        inquirer.prompt([
            {
                type: "input",
                message: "What's the employee's name?",
                name: "name"
            },
            {
                type: "input",
                message: "What's the ID for the employee?",
                name: "id"
            },
            {
                type: "input",
                message: "What's the email for the employee?",
                name: "email"
            },
            {
                type: "input",
                message: "What school does this emplyee attend/did they attend?",
                name: "school"
            },
        ]).then(response => { // Taking the response and pushing it into an array
            const intern=new Intern(response.name,response.id,response.email,response.school);
            teamMembers.push(intern);
            console.log(teamMembers);
            addEmp();

        })
    }

    const addEng=() => {
        inquirer.prompt([
            {
                type: "input",
                message: "What's the employee's name?",
                name: "name"
            },
            {
                type: "input",
                message: "What's the ID for the employee?",
                name: "id"
            },
            {
                type: "input",
                message: "What's the email for the employee?",
                name: "email"
            },
            {
                type: "input",
                message: "What's the Github username for this employee?",
                name: "github"
            },
        ]).then(response => { // Taking the response and pushing it into an array
            const engineer=new Engineer(response.name,response.id,response.email,response.github);
            teamMembers.push(engineer);
            console.log(teamMembers);
            addEmp();

        })
    }
    // Asking if they want to add an additional employee
    const addEmp=() => {
        inquirer.prompt([
            {
                type: "confirm",
                message: "Would you like to add another employee?",
                name: "confirm",
            }
        ]).then(response => {
            if(response.confirm) {
                createTeam();
            } else {
                console.log("Thank you.")
                buildTeam();
            }
        })
    }

    // Calling Render to create HTML
    const buildTeam=() => {
        let renderChart=render(teamMembers);
        fs.writeFileSync(outputPath,renderChart,"utf-8")
    }
}


newEmp();


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, pass in an array containing all employee objects;

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.
