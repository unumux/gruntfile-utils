# gruntfile-utils

Simple library utilizing gruntfiles outside of the command line. Needs lots of work and testing.

## Available methods

### getTasks(filename, taskArray)
Get a list of available tasks in a gruntfile
* filename: the name of the gruntfile, including path
* taskArray: an empty array that tasks will be stored in

### getHash(filename)
Return a SHA1 hash of the gruntfile. Useful for caching
* filename: the name of the gruntfile, including path

### runTask(taskname, filename)
Runs a grunt task. Returns a child_process stream
