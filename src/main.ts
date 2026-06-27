import { Parser } from "./ast/parser.ts";

const parser = new Parser();
console.log(JSON.stringify(parser.produceAST("x + 5"), null, 2));