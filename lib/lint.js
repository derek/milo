module.exports = function (file) {
    var exec = require('child_process').exec,
        linter = require("jslint/lib/linter"),
        reporter = require("jslint/lib/reporter"),
        fs = require('fs'),
        code = fs.readFileSync(file, 'utf-8'),
        result = linter.lint(file);

    reporter.report(file, result);

    return result;
}