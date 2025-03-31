const minimist = require("minimist");
var argv = minimist(process.argv.slice(2));
console.log("🚀 ~ process.argv.slice(2):", process.argv.slice(2))
console.log(argv);
