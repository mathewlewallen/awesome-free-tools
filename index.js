// index.js for Awesome Tools - Rebuild category.md grouped by category

const fs = require('fs');

/**
 * Parse README.md and extract tools grouped by category
 */
function extractToolsByCategory(file) {
  const content = fs.readFileSync(file, 'utf-8');
  const lines = content.split('\n');

  const toolsByCategory = {};
  let capturing = false;
  let currentSection = '';

  for (const line of lines) {
    const match = /^##+\s+(?:✅|💸|🧪|🛠️)?\s*(.*)/.exec(line);
    if (match) {
      currentSection = match[1].trim();
      capturing = false;
      continue;
    }

    if (line.startsWith('Site') && line.includes('|')) {
      capturing = true;
      continue;
    }

    if (capturing && line.trim().startsWith('---')) {
      continue;
    }

    if (capturing && line.includes('|')) {
      const columns = line.split('|').map(col => col.trim());
      if (columns.length === 3) {
        const [name, category, description] = columns;
        const cleanCategory = category.replace(/[`]/g, '');

        if (!toolsByCategory[cleanCategory]) {
          toolsByCategory[cleanCategory] = [];
        }

        toolsByCategory[cleanCategory].push({ name, description, section: currentSection });
      }
    } else if (capturing && line.trim() === '') {
      capturing = false;
    }
  }

  return toolsByCategory;
}

function getHeaderContent() {
  return fs.readFileSync('./_partials/header.md', 'utf-8');
}

function getSupportContent() {
  return fs.readFileSync('./_partials/support.md', 'utf-8');
}

function getReferenceLinks() {
  const content = fs.readFileSync('README.md', 'utf-8');
  const refLinks = content.split('\n').filter(l => l.match(/^\[.*?\]:\s+https?:\/\//));
  return refLinks.join('\n');
}

function generateTOC(toolsByCategory) {
  return Object.keys(toolsByCategory)
    .sort()
    .map(cat => `- [${cat}](#${cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')})`)
    .join('\n');
}

/**
 * Write a complete README grouped by category to category.md
 */
function writeCategoryFile(outputFile = 'category.md') {
  const tools = extractToolsByCategory('README.md');
  let output = '';

  output += getHeaderContent();

  output += '\n\n## Contents\n\n';
  output += generateTOC(tools);

  output += `\n\n---\n<p align="center">\n  <strong><ins><em><span style="font-size: 1.75em;">Free, Cheap & Easy to Integrate</span></em></ins></strong>\n</p>\n\n`;

  output += `**This is a curated list of tools that are:**\n\n- 🎯 Easy to integrate into **any app**  \n- 💸 Either **completely free**, **extremely cheap**, has a **generous free tier**, or **free to self-host**  \n- 🧩 Drop-in with minimal config (CLI, SDK, GitHub Action, etc.)  \n- 🚀 Perfect for solo devs, MVPs, & indie hackers\n\n---\n\n`;

  Object.keys(tools).sort().forEach(category => {
    output += `## ${category}\n\n`;
    output += `Tool | Description | Pricing Tier\n`;
    output += `---- | ----------- | -------------\n`;
    tools[category].forEach(tool => {
      output += `${tool.name} | ${tool.description} | ${tool.section}\n`;
    });
    output += `\n`;
  });

  output += getSupportContent();
  output += `\n\n` + getReferenceLinks();

  fs.writeFileSync(outputFile, output, 'utf-8');
  console.log(`\n📁 Rewritten: \x1b[32m${outputFile}\x1b[0m`);
}

/**
 * Count reference-style links
 */
function countLinks(file = 'README.md') {
  const content = fs.readFileSync(file, 'utf8');
  const links = content.match(/\[.*?\]:\s+https?:\/\/.*$/gm) || [];
  console.log(`\n🔗 Total reference-style links: \x1b[32m${links.length}\x1b[0m`);
}

function run() {
  writeCategoryFile();
  countLinks();
}

run();
