import fetch from 'node-fetch';
import * as fs from 'fs';

async function main() {
  const url = 'https://docs.google.com/spreadsheets/d/1WIocuAknLCrhOhFjvNE3RU6Fk4acfHwS-dhJaUXnfXk/edit';
  try {
    const res = await fetch(url);
    const html = await res.text();
    const startIdx = html.indexOf('bootstrapData = ');
    if (startIdx !== -1) {
      let endIdx = html.indexOf(';</script>', startIdx);
      if (endIdx === -1) {
        endIdx = html.indexOf('};', startIdx);
      }
      if (endIdx !== -1) {
        const jsCode = html.substring(startIdx + 'bootstrapData = '.length, endIdx);
        // Let's parse this JSON if it's JSON
        try {
          const data = JSON.parse(jsCode);
          console.log('Successfully parsed bootstrapData as JSON!');
          console.log('Keys:', Object.keys(data));
          if (data.changes) {
            console.log('Changes keys:', Object.keys(data.changes));
          }
        } catch (jsonErr) {
          console.log('Not valid JSON directly. Let us inspect string patterns.');
          // Let's write code to look for GIDs
          // GIDs in Google Sheets are usually numbers like 0 or long numbers.
          // Let's search for patterns like:
          // [0, "1", ...] or similar
          // Let's see if we can find any numeric GID followed by "1", "2", "3", "4"
          // Or search for sheet data structures
          // Let's print out parts of the code that mention sheet names
          const matchArr = jsCode.match(/\[\d+,\s*"\d+"\s*,/g);
          console.log('Match arr:', matchArr);
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
}

main();
