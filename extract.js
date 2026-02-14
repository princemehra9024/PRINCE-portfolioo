const fs = require('fs');
const content = fs.readFileSync('dist/assets/index-CVURGfPJ.js', 'utf8');

const s = content.indexOf('"id":"1","title":"Sensation"');
if (s !== -1) {
    console.log("FOUND Sensation project at index: " + s);
    const end = content.indexOf('}', s);
    console.log("Project 1: " + content.substring(s - 1, end + 1));
} else {
    console.log("Sensation project not found.");
    // Try to find the start of the projects array
    const projIndex = content.indexOf('projects:[');
    if (projIndex !== -1) {
        console.log("Found projects array at: " + projIndex);
        const arrayEnd = content.indexOf(']', projIndex);
        console.log("Projects Array: " + content.substring(projIndex + 9, arrayEnd + 1));
    }
}
