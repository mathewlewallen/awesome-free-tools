// organize-readme.js

const fs = require('fs');

const README_PATH = 'README.md';
const OUTPUT_PATH = 'README_grouped.md';

/**
 * Extract tool rows from a specific section
 */
function extractToolsBySection(sectionHeading) {
  const content = fs.readFileSync(README_PATH, 'utf-8');
  const lines = content.split('\n');

  const tools = [];
  let inSection = false;
  let passedHeader = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Start capturing tools
    if (line.includes(sectionHeading)) {
      inSection = true;
      continue;
    }

    // Stop when we hit a new section or end of table
    if (inSection && line.startsWith('## ')) {
      break;
    }

    if (inSection) {
      if (!passedHeader && line.startsWith('Site') && line.includes('|')) {
        passedHeader = true;
        continue;
      }

      if (passedHeader && line.includes('|')) {
        const [name, category, description] = line.split('|').map(part => part.trim());
        if (name && category && description) {
          tools.push({
            name,
            category,
            description,
          });
        }
      }
    }
  }

  return tools;
}

/**
 * Group tools alphabetically by category
 */
function groupToolsByCategory(tools) {
  const grouped = {};
  for (const tool of tools) {
    const category = tool.category;
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(tool);
  }

  // Sort alphabetically by category
  return Object.keys(grouped)
    .sort()
    .reduce((acc, key) => {
      acc[key] = grouped[key];
      return acc;
    }, {});
}

/**
 * Renders grouped tools back to markdown
 */
function renderGroupedSection(title, groupedTools) {
  let md = `## ${title}\n\n`;

  for (const category of Object.keys(groupedTools)) {
    md += `### ${category}\n\n`;
    md += `Site | Category | Description\n`;
    md += `-----|----------|------------\n`;

    for (const tool of groupedTools[category]) {
      md += `${tool.name} | ${category} | ${tool.description}\n`;
    }

    md += `\n`;
  }

  return md;
}

/**
 * Extract all lines after a given header (tail sections)
 */
function extractSectionAfter(header) {
  const content = fs.readFileSync(README_PATH, 'utf-8');
  const pattern = new RegExp(`## ${header}[\\s\\S]*`, 'g');
  const match = content.match(pattern);
  return match ? match[0].trim() : '';
}

/**
 * Write new README with grouped sections
 */
function generateGroupedReadme() {
  const original = fs.readFileSync(README_PATH, 'utf-8');
  const header = original.split('## Completely Free')[0].trim();

  const freeTools = extractToolsBySection('Completely Free (Hosted, No Limits)');
  const tierTools = extractToolsBySection('Free with Generous Tier');

  const groupedFree = groupToolsByCategory(freeTools);
  const groupedTier = groupToolsByCategory(tierTools);

  const freeSection = renderGroupedSection('✅ Completely Free (Hosted, No Limits)', groupedFree);
  const tierSection = renderGroupedSection('💸 Free with Generous Tier', groupedTier);
  const tail = extractSectionAfter('Free Stuff');

  const finalOutput = [
    header,
    '',
    freeSection,
    '---',
    '',
    tierSection,
    '---',
    '',
    tail,
  ].join('\n');

  fs.writeFileSync(OUTPUT_PATH, finalOutput, 'utf-8');
  console.log(`✅ Grouped README written to \x1b[32m${OUTPUT_PATH}\x1b[0m`);
}

generateGroupedReadme();
