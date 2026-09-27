import fetch from 'node-fetch';

async function printHeaders(sheetName: string) {
  const url = `https://docs.google.com/spreadsheets/d/1WIocuAknLCrhOhFjvNE3RU6Fk4acfHwS-dhJaUXnfXk/gviz/tq?tqx=out:csv&sheet=${sheetName}`;
  const res = await fetch(url);
  const text = await res.text();
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  console.log(`--- Sheet "${sheetName}" headers ---`);
  if (lines.length > 0) {
    console.log(lines[0]);
    console.log(`Number of columns: ${lines[0].split(',').length}`);
  }
}

async function main() {
  await printHeaders('1');
  await printHeaders('2');
  await printHeaders('3');
  await printHeaders('4');
}

main();
