var GoogleSpreadsheet = require('google-spreadsheet');

var my_sheet = new GoogleSpreadsheet('1PqUkOOi2mnhsnt3IVIC-3gcUABMn4vBRTANVi2k525Y');

var credentials = require('./google-spreadsheets-credentials.json');

console.log('Authenticating...');
my_sheet.useServiceAccountAuth(credentials, (err) => {
    if(err)
        return console.error('Authentication unsuccessful. An error occured', err);

    console.log('Authenticated successfully');
    my_sheet.getInfo((err, info) => {
        if(err)
            return console.error('Cannot get sheet info.');

        console.log('Got info');
        console.log(info);

        var worksheet = info.worksheets[0];
        worksheet.getRows((err, rows) => {
            if(err)
                return;

            console.log('Got rows', rows);
        })
    });
});