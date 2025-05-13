// actions/organize.js

const fs = require('fs');

const README_PATH = 'README.md';
const HEADER_PATH = './_partials/header-main.md';
const README_DATA_PATH = './_partials/readme-data.md';
const SUPPORT_PATH = './_partials/support.md';

/**
 * Extracts the tools and link references from readme-data.md
 */
function extractReadmeData(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const freeSectionStart = '## Completely Free (Hosted, No Limits)';
    const generousTierStart = '## Free with Generous Tier';
    const linkReferencesStart = '<!-- Completely Free -->';

    const freeSectionStartIndex = content.indexOf(freeSectionStart);
    const generousTierStartIndex = content.indexOf(generousTierStart);
    const linkReferencesStartIndex = content.indexOf(linkReferencesStart);

    if (freeSectionStartIndex === -1 || generousTierStartIndex === -1 || linkReferencesStartIndex === -1) {
        console.error('Could not find sections in readme-data.md');
        return { freeTools: [], generousTierTools: [], linkReferences: '' };
    }

    const freeToolsText = content.substring(freeSectionStartIndex, generousTierStartIndex).trim();
    const generousTierToolsText = content.substring(generousTierStartIndex, linkReferencesStartIndex).trim();
    const linkReferences = content.substring(linkReferencesStartIndex).trim();

    const freeTools = parseToolsFromMarkdownTable(freeToolsText);
    const generousTierTools = parseToolsFromMarkdownTable(generousTierToolsText);

    return { freeTools, generousTierTools, linkReferences };
}

/**
 * Parses the tool rows from a markdown table.
 */
function parseToolsFromMarkdownTable(markdown) {
    const lines = markdown.split('\n');
    const tools = [];
    let inTable = false;

    for (const line of lines) {
        if (line.startsWith('Site') && line.includes('|')) {
            inTable = true;
            continue;
        }

        if (inTable && line.startsWith('---')) {
            continue;
        }

        if (inTable && line.includes('|')) {
            const parts = line.split('|').map(part => part.trim());
            if (parts.length === 3) {
                const [name, category, description] = parts;
                tools.push({ name, category, description });
            }
        } else if (inTable && line.trim() === '') {
            inTable = false;
        }
    }
    return tools;
}

/**
 * Sort tools alphabetically by Category, then by Site name
 */
function sortToolsByCategoryAndName(tools) {
    return tools.sort((a, b) => {
        const categoryComparison = a.category.localeCompare(b.category);
        if (categoryComparison !== 0) {
            return categoryComparison;
        }
        return a.name.localeCompare(b.name); // If categories are the same, sort by name
    });
}

/**
 * Renders tools back to markdown
 */
function renderToolsSection(title, tools) {
    let md = `${title}\n\n`; // Removed extra ##
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
    const { freeTools, generousTierTools, linkReferences } = extractReadmeData(README_DATA_PATH);

    const sortedFreeTools = sortToolsByCategoryAndName(freeTools);
    const sortedGenerousTierTools = sortToolsByCategoryAndName(generousTierTools);

    const freeSection = renderToolsSection('## Completely Free (Hosted, No Limits)', sortedFreeTools); // Corrected header
    const generousTierSection = renderToolsSection('## Free with Generous Tier', sortedGenerousTierTools); // Corrected header

    const support = getSupportContent();

    const finalOutput = [
        header,
        '',
        freeSection,
        '---',
        '',
        generousTierSection,
        '---',
        '',
        linkReferences,
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
