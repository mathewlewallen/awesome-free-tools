const fs = require('fs');
const { execSync } = require('child_process');

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
  console.log('\x1b[32mREADME.md has been formatted.\x1b[0m');
}

function countLinks() {
  const data = fs.readFileSync('README.md', 'utf8');
  const linkCount = (data.match(/\[.*?\]\(https?:\/\/.*?\)/g) || []).length;
  console.log(`Total links in README.md: \x1b[32m${linkCount}\x1b[0m`);
}

function fastGit(message = "update") {
  try {
    execSync('git add -A', { stdio: 'inherit' });
    execSync(`git commit -m "${message}"`, { stdio: 'inherit' });
    execSync('git push', { stdio: 'inherit' });
    console.log('Changes have been committed and pushed.');
  } catch (error) {
    console.error('Error running git commands:', error);
  }
}

function runAll() {
  countLinks();
  format();
  createToC();
  categorize();
  countLinks();
}

function analyze() {
  const data = fs.readFileSync('README.md', 'utf8');

  const words = data.match(/\b\w+\b/g);
  const wordCount = words ? words.length : 0;
  const linkCount = (data.match(/\[.*?\]\(https?:\/\/.*?\)/g) || []).length;
  const characterCount = data.length;

  console.log(`Word Count: \x1b[32m${wordCount}\x1b[0m`);
  console.log(`Character Count: \x1b[32m${characterCount}\x1b[0m`);
  console.log(`Link Count: \x1b[32m${linkCount}\x1b[0m`);
}

function generateToc() {
  const filePath = 'README.md';
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  let toc = [];

  lines.forEach(line => {
      const match = /^#{2,6}\s+(.+)/.exec(line);
      if (match) {
          const level = match[0].indexOf(' ') - 1;
          const title = match[1].trim();
          const anchor = title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-+/, '')
              .replace(/-+$/, '');

          toc.push(`${'  '.repeat(level - 1)}- [${title}](#${anchor})`);
      }
  });

  const tocContent = toc.slice(1).join('\n');
  return tocContent;
}

function findAF(name, message, suffix) {
  const data = fs.readFileSync('README.md', 'utf8');

  const startMarker = `<!-- AF-${name}`.trim();
  const endMarker = `<!-- AF-END -->`.trim();

  const startIndex = data.indexOf(startMarker);
  
  if (startIndex !== -1) {
    const cleanStartIndex = data.indexOf(">", startIndex) + 1;

    const endIndex = data.indexOf(endMarker, cleanStartIndex);

    if (endIndex !== -1) {
      let newData = data.slice(0, cleanStartIndex) + message + data.slice(endIndex);

      if (suffix) {
        const newStartMarker = `<!-- AF-${name} ${suffix} -->`;
        newData = newData.replace(data.slice(startIndex, cleanStartIndex), newStartMarker);
      }

      fs.writeFileSync('README.md', newData, 'utf8');
      console.log("File updated successfully.");
    } else {
      console.log(`No end marker found for ${startMarker}`);
    }
  } else {
    console.log(`No content found for ${startMarker}`);
  }
}

function createToC() {
  findAF("TOC", "\n\n" + generateToc() + "\n\n", `: ${new Date().toLocaleString('en-US', { timeZoneName: 'short', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}`);
}

const args = process.argv.slice(2);

if (args.includes('--analyze')) {
  analyze();
} else if (args.includes('--toc')) {
  createToC();
} else if (args.includes('--categorize')) {
  categorize();
} else if (args.includes('--format')) {
  format();
} else if (args.includes('--links')) {
  countLinks();
} else if (args.includes('--fastgit')) {
  const commitMessage = args.slice(1).join(' ');
  if (commitMessage) {
    fastGit(commitMessage);
  } else {
    console.log('Please provide a commit message after --fastgit');
  }
} else if (args.includes('--all')) {
  runAll();
} else {
  console.log("Usage:");
  console.log("  node index.js --categorize     Categorize based on icons");
  console.log("  node index.js --format         Format README.md");
  console.log("  node index.js --links          Count and display total links in README.md");
  console.log("  node index.js --fastgit <msg>  Run git commands with the specified commit message");
  console.log("  node index.js --analyze        Print some info about README.md");
  console.log("  node index.js --toc            Update the table of contents");
  console.log("  node index.js --all            Run all the commands (format, categorize, links)");
}