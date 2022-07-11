import ftp from "basic-ftp"
import fs from 'fs'
import path from 'path'

class FTP {
	#client
	#config = {
		host: process.env.FTP_HOST,
		user: process.env.FTP_USER,
		password: process.env.FTP_PASS,
		secure: true
	}

	constructor() {
		this.#client = new ftp.Client()
	}

	async upload(fileSource, folder = '/') {
		let filename = '', extname = ''
		let uploadedFile = {}, uploadedFiles = []
		const action = async (file) => {
			extname = path.extname(file.originalname)
			filename = `${folder}${file.filename}${extname}`
			if (fs.existsSync(file.path)) {
				await this.#client.uploadFrom(file.path, filename)
				await this.#fsUnlink(file.path)
			}
			uploadedFile = {
				originalname: file.originalname,
				filename: file.filename,
				path: filename,
				size: file.size,
				mimetype: file.mimetype,
				encoding: file.encoding,
			}
		}
		return new Promise(async (resolve) => {
			await this.#connect()
			if (typeof fileSource === 'object' && fileSource.length) {
				for (const file of fileSource) {
					await action(file)
					uploadedFiles.push(uploadedFile)
				}
				resolve(uploadedFiles);
			} else {
				await action(fileSource)
				resolve(uploadedFile);
			}
			this.#client.close()
		})
	}

	#fsUnlink(file) {
		return new Promise((resolve, reject) => {
			fs.unlink(file, (err) => {
				if (err) reject(err)
				resolve(file)
			})
		})
	}

	async #connect() {
		this.#client.ftp.verbose = true
		await this.#client.access(this.#config)
	}
}

export const basicFTP = new FTP();
