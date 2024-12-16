const fs = require('fs');
const http = require('http');
const https = require('https');

const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const RESET = "\x1b[0m";

function extractLinks(markdown) {
    const linkRegex = /\[.*?\]\((https?:\/\/.*?)\)/g;
    const links = [];
    let match;
    while ((match = linkRegex.exec(markdown)) !== null) {
        links.push(match[1]);
    }
    return links;
}

function checkLink(url) {
    return new Promise((resolve) => {
        const client = url.startsWith('https') ? https : http;
        client
            .get(url, (res) => {
                resolve({ url, statusCode: res.statusCode });
            })
            .on('error', () => {
                resolve({ url, statusCode: 404 });
            });
    });
}

async function main() {
    try {
        const markdown = fs.readFileSync('README.md', 'utf-8');
        const links = extractLinks(markdown);
        console.log(`Found ${links.length} links in README.md.`);

        const failedLinks = [];

        for (const link of links) {
            const { url, statusCode } = await checkLink(link);
            if (statusCode === 404) {
                console.log(`${RED}404 Not Found:${RESET} ${url}`);
                failedLinks.push(url);
            } else {
                console.log(`${GREEN}200 OK:${RESET} ${url}`);
            }
        }

        if (failedLinks.length > 0) {
            console.log("\n-----------------------------\n");
            console.log("Double-checking failed links...");

            const doubleCheckedFailedLinks = [];
            for (const link of failedLinks) {
                const { url, statusCode } = await checkLink(link);
                if (statusCode === 404) {
                    doubleCheckedFailedLinks.push(url);
                } else {
                    console.log(`${GREEN}200 OK (after retry):${RESET} ${url}`);
                }
            }

            if (doubleCheckedFailedLinks.length > 0) {
                console.log("\n-----------------------------\n");
                console.log("The following links failed after double-checking:");
                doubleCheckedFailedLinks.forEach((url) => {
                    console.log(`${RED}${url}${RESET}`);
                });
            } else {
                console.log("\nAll links are working!");
            }
        }

    } catch (err) {
        console.error('Error:', err.message);
    }
}

main();
