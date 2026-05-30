const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('c:/Users/eswar/OneDrive/Desktop/portfolio/site/PENCHALA_ESWAR__RESUME_.pdf');

pdf(dataBuffer).then(function(data) {
    console.log(data.text);
}).catch(function(err) {
    console.error(err);
});
