import minify from "@node-minify/core";
import uglifyjs from "@node-minify/uglify-js";

minify({
	compressor: uglifyjs,
	input: './cp/dev/js/*.js',
	output: './cp/public/js/app.js',
	callback: function(err, min) {}
});
