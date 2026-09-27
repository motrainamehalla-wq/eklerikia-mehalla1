import fetch from 'node-fetch';
import * as fs from 'fs';
import { execSync } from 'child_process';

async function main() {
  const url = 'https://docs.google.com/spreadsheets/d/1WIocuAknLCrhOhFjvNE3RU6Fk4acfHwS-dhJaUXnfXk/export?format=xlsx';
  try {
    const res = await fetch(url);
    const buffer = await res.arrayBuffer();
    fs.writeFileSync('sheet.xlsx', Buffer.from(buffer));
    console.log('Saved sheet.xlsx');
    
    // Create temp directory to unzip
    if (!fs.existsSync('temp_xlsx')) {
      fs.mkdirSync('temp_xlsx');
    }
    
    execSync('unzip -o sheet.xlsx -d temp_xlsx');
    console.log('Unzipped sheet.xlsx successfully!');
    
    // Let's list files in temp_xlsx/xl/worksheets
    const worksheets = fs.readdirSync('temp_xlsx/xl/worksheets');
    console.log('Worksheets files:', worksheets);
    
    // Let's also inspect temp_xlsx/xl/_rels/workbook.xml.rels to see GID mapping or sheet name relations!
    if (fs.existsSync('temp_xlsx/xl/_rels/workbook.xml.rels')) {
      const rels = fs.readFileSync('temp_xlsx/xl/_rels/workbook.xml.rels', 'utf-8');
      console.log('workbook.xml.rels content:');
      console.log(rels);
    }
    
    // Let's check temp_xlsx/xl/sharedStrings.xml if it exists to see if the texts are there
    if (fs.existsSync('temp_xlsx/xl/sharedStrings.xml')) {
      const strings = fs.readFileSync('temp_xlsx/xl/sharedStrings.xml', 'utf-8');
      console.log('sharedStrings.xml size:', strings.length);
      console.log('sharedStrings.xml preview (first 1000 chars):');
      console.log(strings.substring(0, 1000));
    }
  } catch (err) {
    console.error(err);
  }
}

main();
