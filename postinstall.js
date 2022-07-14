import minify from "@node-minify/core";
import uglifyjs from "@node-minify/uglify-js";

minify({
	compressor: uglifyjs,
	input: './adminPanel/dev/js/*.js',
	output: './adminPanel/public/js/app.js',
	callback: function(err, min) {}
});
