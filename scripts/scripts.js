var glob = require("glob");
var exec = require("child_process").exec;
var fs = require('fs');

var src = "app/";
var dst = "dist/";
dst = process.argv[2];

function echo(err) {
    if (err) console.log(err);
}
function echo(error, stdout, stderr) {
    if (stdout) console.log(stdout);
}

fs.mkdir(dst + "scripts", echo);

var scripts = []
glob(src + "scripts/*.js", function (err, files) {
    if (err) {
        console.log(err);
    } else {
        for (var f in files) {
            var source = files[f];
            exec("jshint " + source, echo);
            scripts.push(source)
        }
        exec("uglifyjs " + scripts.join(' ') + " -c -m -r '$,require,exports' -o " + dst + "scripts/scripts.js", echo);
    }
});