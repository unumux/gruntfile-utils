var grunt = require('grunt');
var crypto = require('crypto');
var fs = require('fs');
var path = require('path');
var Stream = require('stream');


module.exports = {
    getTasks: function(filename, taskArray) {
        var oldGruntRegisterTask = grunt.task.registerTask;
        var origDir = process.cwd();
        process.chdir(path.dirname(filename));
        var gruntfile = require(filename);

        grunt.task.registerTask = function(taskName, taskList) {
            taskArray.push(taskName);
            oldGruntRegisterTask(taskName, taskList);
        }

        grunt.registerTask = grunt.task.registerTask;

        gruntfile(grunt);        
        process.chdir(origDir);
    },
    getHash: function(filename) {
        var fd = fs.createReadStream(filename);
        var hash = crypto.createHash('sha1');
        
        hash.setEncoding('hex');

        fd.on('end', function() {
            hash.end();
            console.log(hash.read());
        });

        fd.pipe(hash);        
    },
    runTask: function(taskname, filename) {
        var fork = require('child_process').fork;
        var ls = fork(path.resolve(__dirname + '/lib/run-grunt-process.js'), [filename, taskname], { silent: true, execPath: 'node' });

        return ls;
        
    }
}
