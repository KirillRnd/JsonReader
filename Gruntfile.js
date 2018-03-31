module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
		options: {
		  curly: true,
		  eqeqeq: true,
		  eqnull: true,
		  browser: true,
		  globals: {
			jQuery: true
		  },
		},
		all: ['Gruntfile.js', 'assets/js/steal.js']
	  }
  });
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('default', ['jshint']);
};