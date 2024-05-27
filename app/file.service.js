import { writeFileSync, readFileSync } from "fs";

const clear = ({ filePath }) => writeFileSync(filePath, "");
const append = ({ filePath, content }) =>
  writeFileSync(filePath, content, { flag: "a+" });
const read = ({ filePath }) => readFileSync(filePath).toString();

export { clear, read, append };
