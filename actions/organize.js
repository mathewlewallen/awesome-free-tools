// actions/organize.js

const fs = require('fs');

const README_PATH = 'README.md';
const HEADER_PATH = './_partials/header-main.md'; // Updated path
const README_DATA_PATH = './_partials/readme-data.md';
const SUPPORT_PATH = './_partials/support.md';

/**
 * Extract tool rows from a specific section from readme-data.md
 */
function extractToolsBySection(sectionHeading) {
    const content = fs.readFileSync(README_DATA_PATH, 'utf-8');
    const lines = content.split('\n');

    const tools = [];
    let inSection = false;
    let passedHeader = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Start capturing tools
        if (line.startsWith(`## ${sectionHeading}`)) {
            inSection = true;
            continue;
        }

        // Stop when we hit a new section or end of table
        if (inSection && line.startsWith('## ')) {
            break;
        }

        if (inSection) {
            if (!passedHeader && line.startsWith('Site | Category | Description')) {
                passedHeader = true;
                continue;
            }

            if (passedHeader && line.includes('|')) {
                const parts = line.split('|').map(part => part.trim());
                if (parts.length === 3) {
                    const [name, category, description] = parts;
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
    }

    return tools;
}

/**
 * Sort tools alphabetically by Site name
 */
function sortToolsByName(tools) {
    return tools.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Renders tools back to markdown
 */
function renderToolsSection(title, tools) {
    let md = `## ${title}\n\n`;
    md += `Site | Category | Description\n`;
    md += `-----|----------|------------\n`;

    for (const tool of tools) {
        md += `${tool.name} | ${tool.category} | ${tool.description}\n`;
    }

    md += `\n`;
    return md;
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
 * Write a complete README with sorted sections
 */
function writeOrganizedReadme() {
    const header = getHeaderContent();
    const freeTools = extractToolsBySection('Completely Free (Hosted, No Limits)');
    const tierTools = extractToolsBySection('Free with Generous Tier');

    const sortedFreeTools = sortToolsByName(freeTools);
    const sortedTierTools = sortToolsByName(tierTools);

    const freeSection = renderToolsSection('✅ Completely Free (Hosted, No Limits)', sortedFreeTools);
    const tierSection = renderToolsSection('💸 Free with Generous Tier', sortedTierTools);

    const support = getSupportContent();

    const finalOutput = [
        header,
        '',
        freeSection,
        '---',
        '',
        tierSection,
        '---',
        '',
        support,
    ].join('\n');

    fs.writeFileSync(README_PATH, finalOutput, 'utf-8');
    console.log(`\n📁 Rewritten: \x1b[32m${README_PATH}\x1b[0m`);
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
