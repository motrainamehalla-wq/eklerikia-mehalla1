import fetch from 'node-fetch';

async function testGvizSheet(sheetName: string) {
  const url = `https://docs.google.com/spreadsheets/d/1WIocuAknLCrhOhFjvNE3RU6Fk4acfHwS-dhJaUXnfXk/gviz/tq?tqx=out:json&sheet=${sheetName}`;
  const res = await fetch(url);
  const text = await res.text();
  console.log(`Sheet "${sheetName}": size=${text.length}`);
  if (text.length > 200) {
    console.log(`  Preview:`, text.substring(0, 300));
  }
}

async function main() {
  await testGvizSheet('1');
  await testGvizSheet('2');
  await testGvizSheet('3');
  await testGvizSheet('4');
}

main();
