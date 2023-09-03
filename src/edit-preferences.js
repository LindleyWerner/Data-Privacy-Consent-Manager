import inquirer from 'inquirer';
import { consents_list, filePath } from '../const/consts.js'
import { saveJSONToFile, readJSONFromFile } from '../service/file.js';

export async function editPreferences(user) {
    console.clear()
    console.log('Edit preferences\n');

    const user_consents = await consentPreferencesSelection();

    const revoked = user.preferences.filter(item => !user_consents.preferences.includes(item));
    if (revoked.length > 0) {
        console.log('\nAre you sure you want to revoke the following consents?');
        revoked.forEach(consent => {
            console.log(' > ', consent);
        })

        const answers = await inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'option',
                    message: 'Choose one option:',
                    choices: ['Revoke', 'Keep'],
                },
            ]);

        if(answers.option === 'Keep') {
            return
        }
    }

    user.preferences = user_consents.preferences;
    saveData(user);
}

function saveData(userData) {
    var json = readJSONFromFile(filePath);
    var index = json.findIndex(item => item.email === userData.email);
    if (index !== -1) {
        json[index] = userData;
        saveJSONToFile(json, filePath);
    }
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