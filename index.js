const fs = require('fs');

function create(fileName, emoji) {
  const startTime = Date.now();
  let data = fs.readFileSync('README.md', 'utf8');
  const emojis = new Set(["🪟", "🍎", "🐧", "🟢", "⭐"]);
  let result = [];
  let lineCount = 0;
  const lines = data.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (lineCount < 20) {
      result.push(line);
      lineCount++;
      continue;
    }
    line = line.replace(/ /g, '');
    if ([...emojis].some(emojiChar => line.includes(emojiChar)) && !line.includes(emoji)) {
      continue;
    }
    result.push(lines[i]);
  }

  fs.writeFileSync(`${fileName}.md`, result.join('\n'));
  console.log(`${fileName} execution time: ${Date.now() - startTime}ms`);
}

function categorize() {
  create("windows-only", "🪟");
  create("macOS-only", "🍎");
  create("linux-only", "🐧");
  create("open-source-only", "🟢");
  create("recommended-only", "⭐");
}

function format() {
  const data = fs.readFileSync('README.md', 'utf8');

  const updatedData = data
    .split('\n')
    .map(line => {
      line = line.replace(/https:\/\/www\./g, 'https://');
      if (line.startsWith('- [')) {
        const parts = line.split(' - ');
        if (parts.length >= 2) {
          let description = parts[1];
          description = description.replace(/^A\s+/i, '').replace(/^An\s+/i, '');
          description = description.charAt(0).toUpperCase() + description.slice(1);
          parts[1] = description;
          line = parts.join(' - ');
        }
      }
      return line;
    })
    .join('\n');

  fs.writeFileSync('README.md', updatedData, 'utf8');
  console.log('README.md has been formatted.');
}

function countLinks() {
  const data = fs.readFileSync('README.md', 'utf8');
  const linkCount = (data.match(/\[.*?\]\(https?:\/\/.*?\)/g) || []).length;
  console.log(`Total links in README.md: \x1b[32m${linkCount}\x1b[0m`);
}

const args = process.argv.slice(2);

if (args.includes('--categorize')) {
  categorize();
} else if (args.includes('--format')) {
  format();
} else if (args.includes('--links')) {
  countLinks();
} else {
  console.log("Usage:");
  console.log("  node index.js --categorize    Run the categorize function");
  console.log("  node index.js --format        Format the README.md file");
  console.log("  node index.js --links         Count and display total links in README.md");
}
