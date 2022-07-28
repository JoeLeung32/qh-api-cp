/*
* https://docs.strapi.io/user-docs/latest/content-types-builder/configuring-fields-content-type.html
* */

class PrivateTypes {
	// privateField= false
}

class BasicTypes extends PrivateTypes {
	name = ''
	requestField = false
	uniqueField = false
}

class PlainTextDefaultTypes extends PrivateTypes {
	name = ''
	defaultValue = ''
	requestField = false
	uniqueField = false
}

class PlainTextLimitTypes extends PlainTextDefaultTypes {
	maximumLength = null
	minimumLength = 0
}

export class Text extends PlainTextLimitTypes {
	// table.string(name, length) // tinytext(255)
	maximumLength = 255
	// regExpPattern= null
}

export class RichText extends PlainTextLimitTypes {
	// table.text(name) // text(65535)
	// table.text(name, 'mediumtext') // mediumtext(16777215)
	// table.text(name, 'longtext') // mediumtext(4294967295)
}

export class Number extends PlainTextLimitTypes {
	// table.tinyint(name, length) // tinyint(255)
	// table.smallint(name) // smallint(65535)
	// table.mediumint(name) // mediumint(16777215)
	// table.integer(name, length) //integer(4294967295)
	// table.bigInteger(name) // (2^64)
	// table.bigint(name) // (2^64)
	numberFormat = ''
}

export class Email extends PlainTextLimitTypes {
	// table.string(name, length) // tinytext(255)
}

export class Password extends PlainTextLimitTypes {
	// table.string(name, length) // tinytext(255)
}

export class UID extends PlainTextLimitTypes {
	// table.uuid(name, options=({[useBinaryUuid:boolean],[primaryKey:boolean]})
	attachedField = ''
}

export class Date extends PlainTextDefaultTypes {
	// table.date(name)
	// table.datetime(name, options={[useTz: boolean], [precision: number]})
	// table.time(name, [precision])
	// table.timestamp(name, options={[useTz: boolean], [precision: number]})
	// table.timestamps([useTimestamps], [defaultToNow], [useCamelCase])
	type = ''
}

export class Boolean extends PlainTextDefaultTypes {
	// table.boolean(name)
}

export class Enumeration extends PlainTextDefaultTypes {
	// table.enu(col, values, [options])
	values = [] // one pre line
}

export class JSON extends BasicTypes {
	// table.json(name)
	// table.jsonb(name)
}

export class Media extends BasicTypes {
	// table.text(name) // text(65535) // FOR FILEPATH
	type = '' // Multiple or Single
	allowedTypes = {
		'.csv': 'text/csv',
		'.doc': 'application/msword',
		'.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		'.gif': 'image/gif',
		'.jpg': 'image/jpeg',
		'.json': 'application/json',
		'.mp3': 'audio/mpeg',
		'.mp4': 'video/mp4',
		'.mpeg': 'video/mpeg',
		'.png': 'image/png',
		'.pdf': 'application/pdf',
		'.ppt': 'application/vnd.ms-powerpoint',
		'.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
		'.rar': 'application/vnd.rar',
		'.svg': 'image/svg+xml',
		'.txt': 'text/plain',
		'.xls': 'application/vnd.ms-excel',
		'.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		'.xml': 'application/xml',
		'.zip': 'application/zip',
		'.7z': 'application/x-7z-compressed',
	}
}

export class Relation extends PrivateTypes {
	// TODO
	/*
	* One-to-one: Content-type A has and belong to one Content-type B
	* |- Example: Student[studentId] <-> StudentInfo[studentId]
	* One-to-many: Content-type A belongs to many Content-type B
	* |- Example: Company <-> Employee[companyId]
	* Many-to-one: Content-type B has many Content-type A
	* |- Example: Employee[companyId] <-> Company
	* Many-to-many: Content-type A has and belongs to many Content-type B
	* |- Example: Doctors <-> Hospitals
	* One way: Content-type A has one Content-type B
	* |- Example: User[detailsId] -> Details(Single Record)
	* Many way: Content-type A has many Content-type B
	* |- Example: User[carId] -> Car(Multiple Records where is same carId)
	* Polymorphic:
	* |- Example: Tire <-> Toyota & Tire <-> Mercedes
	* */
}
