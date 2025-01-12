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
  console.log('README.md has been formatted.');
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

function backup() {
  try {
    if (!fs.existsSync('.github')) {
      fs.mkdirSync('.github');
    }
    fs.copyFileSync('README.md', '.github/backup.md');
    console.log('README.md has been backed up as .github/backup.md');
  } catch (error) {
    console.error('Error creating backup:', error);
  }
}

const args = process.argv.slice(2);

if (args.includes('--categorize')) {
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
} else if (args.includes('--backup')) {
  backup();
} else {
  console.log("Usage:");
  console.log("  node index.js --categorize    Categorize based on icons");
  console.log("  node index.js --format        Format README.md");
  console.log("  node index.js --links         Count and display total links in README.md");
  console.log("  node index.js --fastgit <msg>  Run git commands with the specified commit message");
  console.log("  node index.js --backup        Backup README.md to .github/backup.md");
}
