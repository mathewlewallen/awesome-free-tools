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

create("windows-only", "🪟");
create("macOS-only", "🍎");
create("linux-only", "🐧");
create("open-source-only", "🟢");
create("recommended-only", "⭐");
