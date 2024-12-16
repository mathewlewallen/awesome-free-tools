const fs = require('fs');

fs.readFile('test.md', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    let lines = data.split('\n');

    const modifiedLines = lines.map(line => {
        if (line.includes('![')) {
            const icons = line.match(/!\[[^\]]+\]\([^\)]+\)/g);
            if (icons) {
                let remainingContent = line.replace(/!\[[^\]]+\]\([^\)]+\)/g, '').trim();
                remainingContent = remainingContent.replace(/^\s*-?\s*/, '');
                return `- ${icons.join(' ')} ${remainingContent}`;
            }
        }
        return line;
    });

    const modifiedData = modifiedLines.join('\n');

    fs.writeFile('output.md', modifiedData, (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('File successfully written to output.md');
        }
    });
});
