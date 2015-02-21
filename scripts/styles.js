var glob = require("glob");
var sass = require('node-sass');
var fs = require('fs');

var src = "app/";
var dst = "dist/";

dst = process.argv[2];

function echo(err) {
    if (err) console.log(err);
}

fs.mkdir(dst + "styles", echo);

glob(src + "styles/*.scss", function (err, files) {
    if (err) {
        console.log(err);
    } else {
        for (var f in files) {
            var source = files[f];
            var dest = dst + source.substring(source.indexOf('/')+1);
            dest = dest.substring(0, dest.length - 4) + "css";

            var result = sass.renderSync({
                file: source,
                outputStyle: 'compressed',
                outFile: dest,
            });
            fs.writeFile(dest, result.css, echo);
        }
    }

});