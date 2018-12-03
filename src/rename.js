var fs = require('fs');
fs.readFile('./media', function(error, data) {
    if (error) {
        console.log(error);
        return;
    }

    var obj = JSON.parse(data);
    for(var p in obj) {
        fs.rename('../public/audio/' + p, '../public/audio/' +  obj[p], function(err) {
            if ( err ) console.log('ERROR: ' + err);
        });
    }
});