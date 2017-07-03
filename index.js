const antlr4 = require("antlr4/index");
const CircLexer = require("./gen/CircLexer").CircLexer;
const CircParser = require("./gen/CircParser").CircParser;
const ast = require("./frontend").ast;
const exec = require("./interpreter").exec;

let source = `
// time(() -> {
//   let key = "testKey"
//   let a = { 
//     "b": [1, 2, 3], 
//     [key]: "val" 
//   }
//   a.b[0] = 5
//   a
// })

let sum = (n, ret) -> if n == 0 then ret 
								else sum(n - 1, ret + n);
time(() -> println(sum(50000, 0)))
`;

const input = new antlr4.InputStream(source);
const lexer = new CircLexer(input);
const tokens = new antlr4.CommonTokenStream(lexer);
const parser = new CircParser(tokens);
parser.buildParseTrees = true;

const astTree = ast(parser);
// console.log(JSON.stringify(astTree, null, 2));

exec(astTree, (out) => {
  console.log("\nDone:");
  console.dir(out);
});
