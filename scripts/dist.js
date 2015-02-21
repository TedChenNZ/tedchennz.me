var ncp = require('ncp').ncp;
var fs = require('fs');
var glob = require("glob");


var src = "app/";
var dst = "dist/";

function echo(err) {
    if (err) console.log(err);
}

function donothing() {}
// Copies a directory, including it's subdirectory and files within these directories
function copy(directory) {
    fs.mkdir(dst + directory, echo);
    glob(src + directory + "*", function (err, files) {
        if (err) 
            console.log(err);
        else {
            for (var f in files) {
                f = files[f].substring(files[f].lastIndexOf('/')+1);
                if (f.indexOf('.') == -1) {
                    copy(directory + "/"  + f + "/");
                } else {
                    ncp(src + directory + f, dst + directory + f, echo);
                }
            }
        }
    });
}

// Creates a directory path for a file
function createDirectory(file) {
    var split = file.split("/");
    for (var i in split) {
        var mkdir = split.slice(0,i).join("/");
        fs.mkdir(mkdir, donothing);
    }
}

ncp.limit = 16;

// Create the dst folder
fs.mkdir(dst, echo);

// Get cmd args
var args = process.argv.slice(3);

dst = process.argv[2];
for (var arg in args) {
    if (args[arg].indexOf('.') == -1) {
        copy(args[arg]);
    } else {
        createDirectory(dst + args[arg]);
        ncp(src + args[arg], dst + args[arg], echo);
    }
}