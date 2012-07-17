module.exports = function (file) {
    var exec = require('child_process').exec,
        linter = require("jslint/lib/linter"),
        reporter = require("jslint/lib/reporter"),
        fs = require('fs'),
        code = fs.readFileSync(file, 'utf-8'),
        result = linter.lint(code, {sloppy:true, node:true, nomen:true, white:true});

    reporter.report(file, result);

    return result;
}