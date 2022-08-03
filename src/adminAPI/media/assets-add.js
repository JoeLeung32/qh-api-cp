import {authedContainer} from "#utils/container.js";
import {knex} from "#utils/database/index.js";
import {StatusCodes} from "#utils/error/errorMessage.js";
import {uploader} from "#utils/uploader/index.js";
import Sharp from "sharp";

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
		console.log('~>result', result)
		// TODO: add to DB
		const fieldsToInsert = result.map(async (field) => {
			// TODO: check it is image
			const image = await Sharp(field.encoding)
			const metadata = await image.metadata()
			console.log('~>', metadata)
			console.log('~>', metadata.width, metadata.height)

			return {
				name: field.originalname,
				alternativeText: field.originalname,
				caption: field.originalname,
				width: null, // TODO: get image width
				height: null, // TODO: get image height
				hash: field.filename,
				ext: null, // TODO: get image ext
				mime: field.mimetype,
				size: field.size, // TODO: transfer to KiB
				url: field.path, // TODO: change to file endpoint
				previewUrl: null, // TODO: if possible
				folderPath: '/', // TODO: will be integrate with folder session
				createdById: 0, // TODO: uploader admin id
				updatedById: 0, // TODO: uploader admin id
			}
		});
		const sql = knex('ap-upload-files')
			.insert(fieldsToInsert)
		await sql

		res.send(result)
	} catch (e) {
		throw new Error(e.message)
	}
}

export const MediaAddNewAssets = authedContainer(async (req, res, next) => await coreFlow(req.files, req, res, next))
