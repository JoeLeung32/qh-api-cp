import fs from "fs";
import path from "path";
import {minify} from "terser";

const __dirname = process.cwd();

const getAllFiles = (dirPath, arrayOfFiles) => {
	let files = fs.readdirSync(dirPath);
	arrayOfFiles = arrayOfFiles || [];
	files.forEach(function (file) {
		const filepath = `${dirPath}/${file}`;
		if (fs.statSync(filepath).isDirectory()) {
			arrayOfFiles = getAllFiles(filepath, arrayOfFiles);
		} else {
			arrayOfFiles.push(path.join(__dirname, filepath));
		}
	});
	return arrayOfFiles.filter(path => path.match(/\.js$/));
}

const minifyFiles = async (exportTo, filePaths) => {
	let content = `/* ${new Date().toLocaleString()} */`
	for (const filePath of filePaths) {
		const code = fs.readFileSync(filePath, "utf8")
		const minified = await minify(code)
		content += '\r\n' + minified.code
	}
	fs.writeFileSync(exportTo, content)
}

const files = getAllFiles("./cp/dev/js");
await minifyFiles('./cp/public/js/app.js', files);
