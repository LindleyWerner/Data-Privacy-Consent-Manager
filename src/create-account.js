import inquirer from 'inquirer';
import { mainPage } from './main-page.js';
import { saveJSONToFile, readJSONFromFile } from '../service/file.js';
import { validateEmail, validateName, validatePassword } from '../utils/validate.js';
import { states_abbreviations, states_with_choices, consents_list, filePath } from '../const/consts.js'

export async function createAccount() {
    console.clear()
    console.log('Create account\n');
    const answers = await inquirer
        .prompt([
            {
                name: 'email',
                message: 'What is your email?',
                validate: validateEmail,
            },
            {
                name: 'name',
                message: 'What is your name?',
                validate: validateName,
            },
            {
                type: 'password',
                name: 'password',
                message: 'Type a password (four numbers):',
                validate: validatePassword,
            },
            {
                type: 'list',
                name: 'location',
                message: 'Choose your state:',
                choices: states_abbreviations,
            },
        ])

        if (states_with_choices.includes(answers.location)) {
            const user_consents = await consentPreferencesSelection()
            answers.preferences = user_consents.preferences;
        } else {
            const user_choice = await confirmOrExit()
            if(user_choice.allow === 'Confirm') {
                answers.preferences = consents_list;
            } else {
                return;
            }
        }

        saveData(answers);
        await mainPage(answers);
}

async function consentPreferencesSelection() {
    return await inquirer
        .prompt([
            {
                type: 'checkbox',
                name: 'preferences',
                message: 'Which consents you give?',
                choices: consents_list,
            },
        ]);
}

async function confirmOrExit() {
    console.log('By confirming you are giving consent to:');
    consents_list.forEach( consent => {
        console.log(' > ', consent);
    })
    console.log('Based on your state regulation, you cannot change it');

    return await inquirer
        .prompt([
            {
                type: 'list',
                name: 'allow',
                message: 'Proceed?',
                choices: [
                    'Confirm', 'Exit',
                ],
            },
        ]);
}

function saveData(answers) {
    var json = readJSONFromFile(filePath);
    json.push(answers)
    saveJSONToFile(json, filePath);
}