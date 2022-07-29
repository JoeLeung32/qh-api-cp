import {CPAuthContainer} from "#cp/controller/container.js";
import {Helper} from "#cp/controller/helper.js";

class MediaLibrary extends Helper {
	constructor(req, res, next) {
		super(req, res, next)
		this.pageRender('html/html', {
			title: req.t('dashboard:Media Library'),
			page: 'media-library/media-library',
			folders: 0,
			assets: 0,
		})
	}
}

export const MediaLibraryComponent = CPAuthContainer(async (req, res, next) => new MediaLibrary(req, res, next))
