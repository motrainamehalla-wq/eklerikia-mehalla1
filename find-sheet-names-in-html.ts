import fetch from 'node-fetch';

async function main() {
  const url = 'https://docs.google.com/spreadsheets/d/1WIocuAknLCrhOhFjvNE3RU6Fk4acfHwS-dhJaUXnfXk/edit';
  try {
    const res = await fetch(url);
    const html = await res.text();
    console.log('HTML size:', html.length);
    
    // In Google Sheets HTML, the sheets info is inside a script tag.
    // Let's find any occurrences of sheet names "1", "2", "3", "4" with their GIDs.
    // Usually, the sheet structure is like:
    // [sheetId, "sheetName", ...] or similar.
    // Let's use regex to find where "1", "2", "3", "4" are declared as sheet names!
    // For example: `[1, "1",` or `"1",` or `"sheetName": "1"`
    
    // Let's write a regular expression that looks for "1", "2", "3", "4" in the vicinity of "gid" or "sheetId" or "sheetName"
    const regex = /"sheetId"\s*:\s*(\d+)\s*,\s*"sheetName"\s*:\s*"([^"]+)"/g;
    let match;
    console.log('Regex 1 matches:');
    while ((match = regex.exec(html)) !== null) {
      console.log(`GID: ${match[1]}, Name: ${match[2]}`);
    }
    
    // Let's look for standard Google Sheets JSON structure:
    // {"sheetId":...,"title":...} or similar
    const regex2 = /"sheetId"\s*:\s*(\d+)/g;
    // Let's find matches and inspect their surroundings
    let lastIdx = 0;
    while ((match = regex2.exec(html)) !== null) {
      const idx = match.index;
      const context = html.substring(idx - 50, idx + 150);
      console.log(`Context near "sheetId":`, context);
      lastIdx = idx;
      if (lastIdx > 50000) break; // limit output
    }
  } catch (err) {
    console.error(err);
  }
}

main();
