import moment from "moment-timezone";
import {knex} from "#utils/database/index.js";
import {CPAuthContainer} from "#cp/controller/container.js";
import {Helper} from "#cp/controller/helper.js";

class ActivityHistory extends Helper {
	constructor(req, res, next) {
		super(req, res, next)
		const {page, perPage} = req.query
		this.getList(page, perPage)
			.then(response => {
				const {data, pagination} = response
				this.pageRender('html/html', {
					title: req.t('dashboard:Activity History'),
					page: 'administrator/activity_history/activity_history',
					list: data,
					pagination: pagination
				})
			})
	}

	async getList(page = 1, perPage = 25) {
		const dateMask = 'MMM-DD HH:mm:ss'
		const paginate = {
			perPage: perPage,
			currentPage: page,
			isFromStart: false,
			isLengthAware: true,
		}

		const sql = knex('ap-admin-token AS at')
			.select(
				'at.id',
				'at.createdAt', 'at.updatedAt',
				'at.expiryAt', 'at.isValid',
				'a.username')
			.leftJoin('ap-admin AS a', 'at.adminId', 'a.id')
			.orderBy('at.createdAt', 'desc')
		const result = await sql.paginate(paginate)

		result.data.forEach((d, idx) => {
			result.data[idx].createdAt = moment(d.createdAt).format(dateMask)
			result.data[idx].updatedAt = moment(d.updatedAt).format(dateMask)
			result.data[idx].expiryAt = moment(d.expiryAt).format(dateMask)
		})

		return {
			data: result.data,
			pagination: result.pagination
		}
	}
}

export const AdministratorActivityHistoryComponent = CPAuthContainer(async (req, res, next) => new ActivityHistory(req, res, next))
