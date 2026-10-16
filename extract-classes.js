const fs = require("fs");
const path = require("path");

const cssPath = path.join(__dirname, "designs", "tailwind-utilities.css");
const outputPath = path.join(__dirname, "allowed-classes.txt");
const css = fs.readFileSync(cssPath, "utf8");

const classes = new Set();
const re = /\.((?:\\.|[A-Za-z0-9_-])+)/g;
const rules = /([^{}]+)\{/g;
let rule;
while ((rule = rules.exec(css))) {
  const selector = rule[1].trim();
  if (selector.startsWith("@")) continue;

  let match;
  while ((match = re.exec(selector))) {
    const name = match[1].replace(/\\(.)/g, "$1");
    if (!/^\d/.test(name)) classes.add(name);
  }
  re.lastIndex = 0;
}

fs.writeFileSync(outputPath, [...classes].sort().join("\n") + "\n");
console.log(classes.size + " classes written");