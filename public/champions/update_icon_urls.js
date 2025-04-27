import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the champions.ts file
const championsFilePath = path.join(__dirname, '..', '..', 'src', 'store', 'champions.ts');
let championsFileContent = fs.readFileSync(championsFilePath, 'utf8');

// Replace all icon URLs with local paths
const iconRegex = /icon: "https:\/\/ddragon\.leagueoflegends\.com\/cdn\/13\.10\.1\/img\/champion\/([^"]+)"/g;
championsFileContent = championsFileContent.replace(iconRegex, (match, championFileName) => {
  return `icon: "/champions/${championFileName}"`;
});

// Write the updated content back to the file
fs.writeFileSync(championsFilePath, championsFileContent);

console.log('All icon URLs updated successfully!');