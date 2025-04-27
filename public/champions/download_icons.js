import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the champions.ts file
const championsFilePath = path.join(__dirname, '..', '..', 'src', 'store', 'champions.ts');
const championsFileContent = fs.readFileSync(championsFilePath, 'utf8');

// Extract champion data using regex
const championRegex = /{[\s\S]*?id:[\s\S]*?name:\s*"([^"]+)"[\s\S]*?icon:\s*"([^"]+)"[\s\S]*?}/g;
const champions = [];
let match;

while ((match = championRegex.exec(championsFileContent)) !== null) {
  const name = match[1];
  const iconUrl = match[2];
  champions.push({ name, iconUrl });
}

console.log(`Found ${champions.length} champions`);

// Download all icons
const downloadIcon = (name, url) => {
  return new Promise((resolve, reject) => {
    const fileName = `${name}.png`;
    const filePath = path.join(__dirname, fileName);

    const file = fs.createWriteStream(filePath);

    https.get(url, (response) => {
      response.pipe(file);

      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${fileName}`);
        resolve();
      });

      file.on('error', (err) => {
        fs.unlink(filePath, () => {}); // Delete the file if there's an error
        console.error(`Error downloading ${fileName}: ${err.message}`);
        reject(err);
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {}); // Delete the file if there's an error
      console.error(`Error downloading ${fileName}: ${err.message}`);
      reject(err);
    });
  });
};

// Download all icons sequentially to avoid overwhelming the server
const downloadAllIcons = async () => {
  for (const champion of champions) {
    try {
      await downloadIcon(champion.name, champion.iconUrl);
    } catch (error) {
      console.error(`Failed to download ${champion.name} icon: ${error.message}`);
    }
  }
  console.log('All icons downloaded successfully!');
};

downloadAllIcons();
