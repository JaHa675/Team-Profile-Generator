const inquirer = require("inquirer")
const fs = require("fs")
const Employee = require("./lib/Employee");
const Intern = require("./lib/Intern");
const Engineer = require("./lib/Engineer");
const Manager = require("./lib/Manager");
const team = require("./util/generateHtml")
const teamMembers = [];

function createManager(){
    inquirer
    .prompt([
        {
            name:'managerName',
            type:'input',
            message:'Managers name?'
        },{
            name:'managerId',
            type:'input',
            message:'Managers ID?'
        },{
            name:'managerEmail',
            type:'input',
            message:'Managers email?'
        },{
            name:'managerOfficeNumber',
            type:'input',
            message:'Managers office number?'
        }
    ]).then(answers =>{
        const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber)
        teamMembers.push(manager)
        console.log(teamMembers)
        ask();
    })
}

function ask(){
    inquirer
    .prompt([
        {
            name: 'question',
            type: 'list',
            choices: ["add an engineer", "add an intern", "finish building team"]
        }
    ]).then(answers =>{
        switch (answers.question) {
            case "add an engineer":
                console.log("add an engineer")
                addEngineer();
                break;

            case "add an intern":
                console.log("add an intern")
                addIntern();
                break;

            default:
                console.log("generating HTML")
                createTeamPage();
                break;
        }
    })
}

function addEngineer(){
    inquirer
    .prompt([
        {
            name:'engineerName',
            type:'input',
            message:'engineers name?'
        },{
            name:'engineerId',
            type:'input',
            message:'engineers ID?'
        },{
            name:'engineerEmail',
            type:'input',
            message:'engineers email?'
        },{
            name:'engineerGithub',
            type:'input',
            message:'engineers github?'
        }
    ]).then(engineerAnswers =>{
        const engineer = new Engineer(engineerAnswers.engineerName, engineerAnswers.engineerId, engineerAnswers.engineerEmail, engineerAnswers.engineerGithub)
        teamMembers.push(engineer)
        console.log(teamMembers)
        ask();
    })
}
function addIntern(){
    inquirer
    .prompt([
        {
            name:'internName',
            type:'input',
            message:'interns name?'
        },{
            name:'internId',
            type:'input',
            message:'interns ID?'
        },{
            name:'internEmail',
            type:'input',
            message:'interns email?'
        },{
            name:'internSchool',
            type:'input',
            message:'interns school?'
        }
    ]).then(internAnswers =>{
        const intern = new Intern(internAnswers.internName, internAnswers.internId, internAnswers.internEmail, internAnswers.internSchool)
        teamMembers.push(intern)
        console.log(teamMembers)
        ask();
    })
}

function createTeamPage(){
    fs.writeFile('./output/team.html', team(teamMembers),(err) => err ? console.error(err) : console.log('Success!'))
};

createManager();
