var GoogleSpreadsheet = require('google-spreadsheet'),
    dbConnector = require('./database-connector');

var my_sheet = new GoogleSpreadsheet('1PqUkOOi2mnhsnt3IVIC-3gcUABMn4vBRTANVi2k525Y');
//var my_sheet = new GoogleSpreadsheet('1txNLxjH69-qVnOQCeELRWQJhcSlAJjQHCZtiaHpIPVQ');

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
        worksheet.getRows({
            limit: 10
        },(err, rows) => {
            if(err)
                return;

            //console.log('Got rows', rows);
        });


        console.log('\n\n\n');

        /*worksheet.getCells({
            'min-row': 1,
            'max-row': 50,
            'min-col': 1,
            'max-col': 10
        }, (err, cells) => {
            if(err)
                return console.error('Error', err);

            console.log('Got cells', cells);
        });*/
    });
});


setTimeout(() => {
    dbConnector.connect().then(() => {
        console.log('Connected.');
        return dbConnector.fetchTasks();
    })
    .then((tasks) => {
        console.log('Got tasks', tasks);
    })
    .catch((err) => {
        console.error('An error occured', err);
    });
}, 1000);