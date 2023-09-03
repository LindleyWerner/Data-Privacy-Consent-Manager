import inquirer from 'inquirer';
import { editPreferences } from './edit-preferences.js';
import { states_with_choices, consents_list } from '../const/consts.js'

const main_page_choices = ['Edit preferences', 'Log out']

export async function mainPage(user) {
    while(true) {
        console.clear()
        console.log('Main Page\n');
        console.log('Hello', user.name, 'your consent preferences are:');
        consents_list.forEach(consent => {
            const symbol = user.preferences.includes(consent) ? '\u2713' : '\u2717';
            console.log(symbol, consent);
        });
        console.log('');

        const answers = await inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'option',
                    message: 'Choose one option:',
                    choices: states_with_choices.includes(user.location) 
                        ? main_page_choices
                        : main_page_choices.slice(1),
                },
            ]);

        if(answers.option === main_page_choices[0]) {
            await editPreferences(user)
        } else {
            break;
        }
    }
}