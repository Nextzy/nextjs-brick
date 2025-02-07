import axios from "axios";
import fs from "fs";
import path from "path";
import csvParser from "csv-parser";
import readline from "readline";
import { fileURLToPath } from "url";

// สร้าง interface สำหรับ readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// กำหนด __dirname สำหรับ ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ฟังก์ชันสำหรับรับ input จากผู้ใช้
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// 📥 ฟังก์ชันสำหรับดาวน์โหลด CSV
async function downloadCSV(sheetId, sheetName) {
  console.log("📥 Downloading CSV...");
  try {
    const CSV_URL = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;
    const CSV_FILE = path.join(__dirname, "../public/csv/strings.i18n.csv");
    
    // สร้าง directory csv ถ้ายังไม่มี
    const csvDir = path.dirname(CSV_FILE);
    if (!fs.existsSync(csvDir)) {
      fs.mkdirSync(csvDir, { recursive: true });
    }

    const response = await axios.get(CSV_URL, { responseType: "stream" });
    const writer = fs.createWriteStream(CSV_FILE);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on("finish", () => {
        console.log("✅ CSV downloaded successfully!");
        resolve(CSV_FILE);
      });
      writer.on("error", reject);
    });
  } catch (error) {
    console.error("❌ Failed to download CSV:", error);
    throw error;
  }
}

// 🔄 แปลง CSV เป็น JSON แบบ nested
async function convertCSVtoJSON(csvFilePath) {
  console.log("🔄 Converting CSV to JSON...");
  const jsonData = {
    th: {},
    en: {}
  };

  const OUTPUT_DIR = path.join(__dirname, "../public/messages");

  return new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csvParser({
        skipLines: 0,
        headers: ['key', 'th_TH', 'en_GB']
      }))
      .on("data", (row) => {
        const key = row.key.replace(/^["'\s]+|["'\s]+$/g, '');
        if (!key || key === 'key') return;

        const thValue = row.th_TH?.trim();
        const enValue = row.en_GB?.trim();
        const keyParts = key.split('.');

        if (thValue) {
          setNestedValue(jsonData.th, keyParts, thValue);
        }
        if (enValue) {
          setNestedValue(jsonData.en, keyParts, enValue);
        }
      })
      .on("end", () => {
        if (!fs.existsSync(OUTPUT_DIR)) {
          fs.mkdirSync(OUTPUT_DIR, { recursive: true });
        }

        for (const lang of ['th', 'en']) {
          const filePath = path.join(OUTPUT_DIR, `${lang}.json`);
          fs.writeFileSync(filePath, JSON.stringify(jsonData[lang], null, 2));
          console.log(`✅ Generated: ${filePath}`);
        }
        resolve();
      })
      .on("error", (error) => {
        console.error("❌ Error processing CSV:", error);
        reject(error);
      });
  });
}

// 🏗 ฟังก์ชันสร้าง JSON nested structure
function setNestedValue(obj, keys, value) {
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!current[key]) {
      current[key] = {};
    }
    current = current[key];
  }
  current[keys[keys.length - 1]] = value;
}

// 🚀 Run the script
async function main() {
  try {    
    const sheetId = await askQuestion("Enter Google Sheet ID: ");
    const sheetName = await askQuestion("Enter Sheet Name: ");    

    const csvFilePath = await downloadCSV(sheetId, sheetName);
    await convertCSVtoJSON(csvFilePath);
    console.log("✅ Process completed successfully!");
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    rl.close();
  }
}

main();
