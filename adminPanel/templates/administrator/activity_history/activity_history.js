import moment from "moment-timezone";
import {knex} from "#utils/database/index.js";
import {CPAuthContainer} from "#cp/shared/container.js";
import {Hepler} from "#cp/shared/helper.js";

export class ActivityHistory extends Hepler {
	constructor(req, res, next) {
		super(req, res, next)
		this.getList()
			.then(response => {
				this.pageRender('html/html', {
					title: req.t('dashboard:Activity History'),
					page: 'administrator/activity_history/activity_history',
					data: response
				})
			})
	}

	async getList() {
		const dateMask = 'MMM-DD HH:mm:ss'
		const sql = knex('ap-admin-token AS at')
			.select(
				'at.id',
				'at.createdAt', 'at.updatedAt', 'at.updatedAt',
				'at.expiryAt', 'at.isValid',
				'a.username')
			.leftJoin('ap-admin AS a', 'at.adminId', 'a.id')
			.orderBy('at.createdAt', 'desc')
		const tokens = await sql
		tokens.forEach((data, idx) => {
			tokens[idx].createdAt = moment(data.createdAt).format(dateMask)
			tokens[idx].updatedAt = moment(data.updatedAt).format(dateMask)
			tokens[idx].expiryAt = moment(data.expiryAt).format(dateMask)
		})
		return tokens
	}
}

export const AdministratorActivityHistoryComponent = CPAuthContainer(async (req, res, next) => new ActivityHistory(req, res, next))
