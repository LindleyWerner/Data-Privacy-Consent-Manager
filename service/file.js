import fs from 'fs';

export function saveJSONToFile(jsonData, filePath) {
    const jsonString = JSON.stringify(jsonData, null, 2);
    fs.writeFileSync(filePath, jsonString);
}

export function readJSONFromFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(data);
        return jsonData;
    } catch (error) {
        return [];
    }
}