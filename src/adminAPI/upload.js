import {container} from "#utils/util.js";
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

const coreFlow = async (dataField, req, res, next) => {
	let rejectReason = {
		noFile: {
			status: 400,
			message: "Bad Request",
		},
		uploadError: {
			status: 400,
			message: "",
		},
	}

	if (!dataField) {
		res.status(rejectReason.noFile.status)
			.json({
				message: rejectReason.noFile.message
			});
		return
	}

	try {
		const result = await uploader.upload(dataField)
		res.send(result)
	} catch (e) {
		res.status(rejectReason.uploadError.status)
			.json({
				message: e.message
			});
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
