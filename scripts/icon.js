import fs from "fs";
import path from "path";

const files = fs.readdirSync("./src/lib/icons");

const components = files
  .filter(file => path.extname(file) === ".svelte")
  .map(file => path.basename(file, ".svelte"));

const exports = components
  .map(name => `export { default as ${name} } from "./${name}.svelte";`)
  .join("\n");

const componentsArray = `export const icons = [\n  "${components.join("\",\n  \"")}"\n];`;

const iconDeclare = `export type IconProps = {\n  size?:number;\n  class?:string;\n}`;

const content = `${iconDeclare}\n\n${exports}\n\n${componentsArray}\n`;

fs.writeFileSync("./src/lib/icons/index.ts", content);

console.log("Successfully generated icon file！");
