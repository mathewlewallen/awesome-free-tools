// organize-readme.js

const fs = require('fs');

const README_PATH = 'README.md';
const HEADER_PATH = './_partials/header_main.md';
const SUPPORT_PATH = './_partials/support.md';

/**
 * Parse README.md and extract tools grouped by category
 */
function extractTools(file) {
    const content = fs.readFileSync(file, 'utf-8');
    const lines = content.split('\n');

    const tools = [];
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

                tools.push({
                    name,
                    category: cleanCategory,
                    description,
                    section: currentSection,
                });
            }
        } else if (capturing && line.trim() === '') {
            capturing = false;
        }
    }

    return tools;
}

function getHeaderContent() {
    try {
        return fs.readFileSync(HEADER_PATH, 'utf-8');
    } catch (error) {
        console.error(`Error reading header file: ${HEADER_PATH}`, error);
        return '';
    }
}

function getSupportContent() {
    try {
        return fs.readFileSync(SUPPORT_PATH, 'utf-8');
    } catch (error) {
        console.error(`Error reading support file: ${SUPPORT_PATH}`, error);
        return '';
    }
}

/**
 * Sort tools alphabetically by Site name
 */
function sortToolsByName(tools) {
    return tools.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Renders tools back to markdown, grouped by section
 */
function renderToolsBySection(tools, sectionTitle) {
    let md = `## ${sectionTitle}\n\n`;
    md += `Site | Category | Description\n`;
    md += `-----|----------|------------\n`;

    tools.forEach(tool => {
        md += `${tool.name} | ${tool.category} | ${tool.description}\n`;
    });

    md += `\n`;
    return md;
}

/**
 * Write a complete README with sorted sections
 */
function writeOrganizedReadme() {
    const header = getHeaderContent();
    const allTools = extractTools(README_PATH);

    // Filter tools for each section
    const freeTools = allTools.filter(tool => tool.section === '✅ Completely Free (Hosted, No Limits)');
    const tierTools = allTools.filter(tool => tool.section === '💸 Free with Generous Tier');

    const sortedFreeTools = sortToolsByName(freeTools);
    const sortedTierTools = sortToolsByName(tierTools);

    const freeSection = renderToolsBySection(sortedFreeTools, '✅ Completely Free (Hosted, No Limits)');
    const tierSection = renderToolsBySection(sortedTierTools, '💸 Free with Generous Tier');

    const support = getSupportContent();

    // Extract everything after Generous Tier and before Support
    const remainingContent = extractContentAfterTier(README_PATH);

    const finalOutput = [
        header,
        '',
        freeSection,
        '---',
        '',
        tierSection,
        '---',
        '',
        remainingContent,
        '',
        support,
    ].join('\n');

    fs.writeFileSync(README_PATH, finalOutput, 'utf-8');
    console.log(`\n📁 Rewritten: \x1b[32m${README_PATH}\x1b[0m`);
}

function extractContentAfterTier(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const tierSectionEnd = '## Free with Generous Tier\n';
    const supportSectionStart = '## Support\n';

    const startIndex = content.indexOf(tierSectionEnd);
    const endIndex = content.indexOf(supportSectionStart);

    if (startIndex === -1 || endIndex === -1) {
        console.warn('Could not find Generous Tier or Support sections.');
        return '';
    }

    const startPos = content.indexOf('---', startIndex);
    if (startPos === -1) {
        console.warn('Could not find separator after Generous Tier.');
        return '';
    }

    const extractionStart = startPos + 3; // Move past the '---'
    return content.substring(extractionStart, endIndex).trim();
}

function run() {
    writeOrganizedReadme();
}

try {
    run();
} catch (error) {
    console.error("Error in organize.js:", error);
    process.exit(1);
}
