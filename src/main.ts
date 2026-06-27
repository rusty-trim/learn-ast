import { Parser } from "./ast/parser.ts";

const parser = new Parser();
console.log(JSON.stringify(parser.produceAST("null"), null, 2));