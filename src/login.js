import inquirer from 'inquirer';
import { mainPage } from './main-page.js';
import { createAccount } from './create-account.js';
import { validateEmail, validatePassword } from '../utils/validate.js';
import { readJSONFromFile } from '../service/file.js';
import { filePath } from '../const/consts.js'

export async function login() {
    while (true) {
        console.clear();
        console.log('Login\n');

        const answers = await inquirer
            .prompt([
                {
                    name: 'email',
                    message: 'Type your email?',
                    validate: validateEmail,
                },
                {
                    type: 'password',
                    name: 'password',
                    message: 'Type your password:',
                    validate: validatePassword,
                },
            ]);

        const user = checkCredentials(answers);
        if(user == null) {
            const choice = await inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'option',
                        message: 'Invalid email/password:',
                        choices: ['Try again', 'Create account', 'Exit'],
                    },
                ]);

            if(choice.option === 'Create account') {
                await createAccount();
                break;
            } else if(choice.option === 'Exit') {
                process.exit()
            }
        } else {
            await mainPage(user);
            break;
        }
    }
}

function checkCredentials(user_credentials) {
    var json = readJSONFromFile(filePath);
    var index = json.findIndex(item =>
        item.email === user_credentials.email && item.password === user_credentials.password
    );

    if (index !== -1) {
        return json[index]
    } else {
        return null
    }
}