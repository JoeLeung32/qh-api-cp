import {container} from "#utils/container.js";
import {StatusCodes} from "#utils/error/errorMessage.js";
import {uploader} from "#utils/uploader/index.js";

/*
* {
* 	"fieldname": "files",
* 	"originalname": "logo.jpeg",
* 	"encoding": "7bit",
* 	"mimetype": "image/jpeg",
* 	"destination": "uploads/",
* 	"filename": "2e1adf7727851292b9b38ab75f99caaa",
* 	"path": "uploads/2e1adf7727851292b9b38ab75f99caaa",
* 	"size": 13077
* }
* */

const coreFlow = async (dataField, req, res) => {
	if (!dataField) {
		throw StatusCodes.C400
	}

	try {
		const result = await uploader.upload(dataField)
		res.send(result)
	} catch (e) {
		throw new Error(e.message)
	}
}

export const Uploader = {
	single: container(async (req, res, next) => {
		// Data field name was fixed "file" in multer.single() method.
		await coreFlow(req.file, req, res, next)
	}),
	multiple: container(async (req, res, next) => {
		// Data field name was fixed "files" in multer.array() method.
		await coreFlow(req.files, req, res, next)
	}),
	fields: container(async (req, res, next) => {
		// Data field name was NOT fixed in multer.fields() method.
		await coreFlow([
			...req.files['file1'],
			...req.files['file2'],
		], req, res, next)
	})
}
