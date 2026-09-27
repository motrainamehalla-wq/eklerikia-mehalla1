import fetch from 'node-fetch';

async function testGvizCsvSheet(sheetName: string) {
  const url = `https://docs.google.com/spreadsheets/d/1WIocuAknLCrhOhFjvNE3RU6Fk4acfHwS-dhJaUXnfXk/gviz/tq?tqx=out:csv&sheet=${sheetName}`;
  const res = await fetch(url);
  const text = await res.text();
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  console.log(`CSV Sheet "${sheetName}": lines=${lines.length}`);
  if (lines.length > 0) {
    console.log(`  Headers:`, lines[0].substring(0, 150));
    console.log(`  Row 1:`, lines[1]?.substring(0, 150));
  }
}

async function main() {
  await testGvizCsvSheet('1');
  await testGvizCsvSheet('2');
  await testGvizCsvSheet('3');
  await testGvizCsvSheet('4');
}

main();
