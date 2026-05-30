const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('c:/Users/eswar/OneDrive/Desktop/portfolio/PENCHALA_ESWAR__RESUME.pdf');

pdf(dataBuffer).then(function(data) {
    console.log(data.text);
}).catch(function(err) {
    console.error(err);
});
