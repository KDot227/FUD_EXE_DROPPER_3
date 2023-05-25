const builder = require('electron-builder');

function randomString(length) {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

builder.build({
    targets: builder.Platform.WINDOWS.createTarget(),
    config: {
      appId: 'com.' + randomString(16),
      productName: 'test',
      executableName: 'test',
      compression: 'maximum',
      buildVersion: `${Math.floor(Math.random() * 9)}.${Math.floor(Math.random() * 9)}.${Math.floor(Math.random() * 9)}`,
      artifactName: 'test.exe',
      win: {
        requestedExecutionLevel: 'requireAdministrator',
        target: [ 'portable' ],
      },
      files: ['2.js'],
    },
  });
  