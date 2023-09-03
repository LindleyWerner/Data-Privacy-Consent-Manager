import inquirer from 'inquirer';
import { login } from './src/login.js'
import { createAccount } from './src/create-account.js';

var welcome_choices = ['Login', 'Create Account', 'Exit'];

while(true) {
    console.clear();
    console.log('Welcome to Data Privacy Consent Manager!\n');

    const answers = await inquirer
        .prompt([
            {
                type: 'list',
                name: 'welcome',
                message: 'Choose one option:',
                choices: welcome_choices,
            },
        ]);

    if(answers.welcome === welcome_choices[0]) {
        await login();
    } else if(answers.welcome === welcome_choices[1]) {
        await createAccount();
    } else {
        break;
    }
}