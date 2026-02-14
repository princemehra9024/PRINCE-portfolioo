const fs = require('fs');
const content = fs.readFileSync('dist/assets/index-CVURGfPJ.js', 'utf8');

const titles = [];
const regex = /"title":"([^"]+)"/g;
let match;
while ((match = regex.exec(content)) !== null) {
    titles.push(match[1]);
}

console.log("ALL TITLES FOUND:");
console.log(JSON.stringify(titles, null, 2));
