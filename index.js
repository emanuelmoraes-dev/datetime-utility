const isISODate = require('is-iso-date')

const PERIODS = {
	MILLISECOND: 1,
	SECOND: 1000,
	MINUTE: 60*1000,
	HOUR: 60*60*1000,
	DAY: 24*60*60*1000,
	WEEK: 7*24*60*60*1000,
	MONTH: 'month',
	TWO_MONTHS: 'two_months',
	SEMESTER: 'semester',
	QUARTER: 'quarter',
	YEAR: 'year'
}

function scape(str) {
	if (str === null || str === undefined) return str
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function toDate(str, pattern = 'yyyy/MM/dd hh:mm:ss:l') {
	if (str === null || str === undefined) return str

	str = str.trim()

	let expPattern = /yyyy|y|MM|M|dd|d|hh|h|mm|m|ss|s|l/g
	let seps = pattern.split(expPattern)

	let sepsScape = seps.filter(s => s).map(scape)
	let expSepsScape = new RegExp(sepsScape.join('|'), 'g')
	let mask = pattern.split(expSepsScape).filter(p => p)
	let values = str.split(expSepsScape).filter(p => p)

	let dateValues = {
		day: 1,
		month: 0,
		year: 0,
		hour: 0,
		minute: 0,
		second: 0,
		millisecond: 0
	}

	let valid = true

	for (let i = 0; i < mask.length; i++) {
		let m = mask[i]

		if (i >= values.length)
			break

		let value = values[i]
		v = parseInt(value)

		if (Number.isNaN(v)) {
			valid = false
			break
		}

		switch (m) {
			case 'dd': {
				if (value.length !== 2) return null
			}
			case 'd': {
				dateValues.day = v
				break
			}
			case 'MM': {
				if (value.length !== 2) return null
			}
			case 'M': {
				dateValues.month = v
				break
			}
			case 'yyyy': {
				if (value.length !== 4) return null
			}
			case 'y': {
				dateValues.year = v
				break
			}
			case 'hh': {
				if (value.length !== 2) return null
			}
			case 'h': {
				dateValues.hour = v
				break
			}
			case 'mm': {
				if (value.length !== 2) return null
			}
			case 'm': {
				dateValues.minute = v
				break
			}
			case 'ss': {
				if (value.length !== 2) return null
			}
			case 's': {
				dateValues.second = v
				break
			}
			case 'l': {
				dateValues.millisecond = v
				break
			}
			default: throw new Error(`Pattern ${pattern} Inválid in '${m}'`)
		}
	}

	// Cria um date
	return valid && new Date(
		dateValues.year,
		dateValues.month - 1,
		dateValues.day,
		dateValues.hour,
		dateValues.minute,
		dateValues.second,
		dateValues.millisecond
	)
}

function dateToStr(date, pattern = 'yyyy/MM/dd') {
	if (str === null || str === undefined) return str
	if (pattern === null || pattern === undefined) return null

	pattern = pattern.trim()
	if (typeof (date) === 'string' && isISODate(date)) { date = new Date(date) }

	if (date instanceof Date) {
		let day = `${date.getDate()}`
		let month = `${date.getMonth() + 1}`
		let hour = `${date.getHours()}`
		let minute = `${date.getMinutes()}`
		let second = `${date.getSeconds()}`
		let millisecond = `${date.getMilliseconds()}`
		let year = `${date.getFullYear()}`

		let values = {
			yyyy: year.length < 4 ? null:year,
			yy: year.substring(2),
			y: year,
			MM: month.length === 1 ? `0${month}` : month,
			M: month,
			dd: day.length === 1 ? `0${day}` : day,
			d: day,
			hh: hour.length === 1 ? `0${hour}` : hour,
			h: hour,
			mm: minute.length === 1 ? `0${minute}` : minute,
			m: minute,
			ss: second.length === 1 ? `0${second}` : second,
			s: second,
			l: millisecond,
			'': ''
		}

		let expPattern = /yyyy|yy|y|MM|M|dd|d|hh|h|mm|m|ss|s|l/g
		let seps = pattern.split(expPattern)

		let sepsScape = seps.filter(s => s).map(scape)
		let mask = pattern.split(new RegExp(sepsScape.join('|'), 'g')).filter(p => p)

		return seps.reduce((previous, now, index) => {
			if (previous === null) return null
			let m = mask[index]
			if (!m) m = ''
			let value = values[m]
			if (value === null) return null
			return `${previous}${now}${value}`
		}, '')
	}

	return date
}

function plus(date, period, duration) {
	if (date === null || date === undefined) return date
	if (period === null || period === undefined) return null
	if (duration === null || duration === undefined) return null

	let [day, month, year, hour, minute, second, millisecond] = [
		date.getDate(),
		date.getMonth(),
		date.getFullYear(),
		date.getHours(),
		date.getMinutes(),
		date.getSeconds(),
		date.getMilliseconds()
	]

	switch (period) {
		case PERIODS.MILLISECOND: return new Date(year, month, day, hour, minute, second, millisecond + duration)
		case PERIODS.SECOND: return new Date(year, month, day, hour, minute, second + duration, millisecond)
		case PERIODS.MINUTE: return new Date(year, month, day, hour, minute + duration, second, millisecond)
		case PERIODS.HOUR: return new Date(year, month, day, hour + duration, minute, second, millisecond)
		case PERIODS.DAY: return new Date(year, month, day + duration, hour, minute, second, millisecond)
		case PERIODS.WEEK: return new Date(year, month, day + duration * 7, hour, minute, second, millisecond)
		case PERIODS.MONTH: return new Date(year, month + duration, day, hour, minute, second, millisecond)
		case PERIODS.TWO_MONTHS: return new Date(year, month + duration * 2, day, hour, minute, second, millisecond)
		case PERIODS.SEMESTER: return new Date(year, month + duration * 6, day, hour, minute, second, millisecond)
		case PERIODS.QUARTER: return new Date(year, month + duration * 3, day, hour, minute, second, millisecond)
		case PERIODS.YEAR: return new Date(year + duration, month, day, hour, minute, second, millisecond)
		default:
			throw new Error(`Período ${period} inválido`)
	}
}

function dateEquals(date1, date2, ignore) {
	if (date1 === null || date1 === undefined) throw new Error('date1 is null or undefined')
	if (date2 === null || date2 === undefined) throw new Error('date2 is null or undefined')

	let values1 = [
		date1.getFullYear(),
		date1.getMonth(),
		date1.getDate(),
		date1.getHours(),
		date1.getMinutes(),
		date1.getSeconds(),
		date1.getMilliseconds()
	]

	let values2 = [
		date2.getFullYear(),
		date2.getMonth(),
		date2.getDate(),
		date2.getHours(),
		date2.getMinutes(),
		date2.getSeconds(),
		date2.getMilliseconds()
	]

	return values1.reduce((previous, now, index) => {
		if ((ignore === 0 || ignore) && ignore >= 0 && index >= ignore) { return previous }
		if (!previous) { return false }
		if (now !== values2[index]) { return false }
		return true
	}, true)
}

function getDateIgnore(date, ignore) {
	if (date === null || date === undefined) return null

	let values = [
		date.getFullYear(),
		date.getMonth(),
		date.getDate(),
		date.getHours(),
		date.getMinutes(),
		date.getSeconds(),
		date.getMilliseconds()
	]

	let dateArray = values.reduce((previous, now, index) => {
		if ((ignore === 0 || ignore) && ignore >= 0 && index >= ignore) { return [...previous, 0] }
		return [...previous, now]
	}, [])

	return new Date(...dateArray)
}

function dateEqualsReverse(date1, date2, ignore) {
	if (date1 === null || date1 === undefined) throw new Error('date1 is null or undefined')
	if (date2 === null || date2 === undefined) throw new Error('date2 is null or undefined')

	let values1 = [
		date1.getFullYear(),
		date1.getMonth(),
		date1.getDate(),
		date1.getHours(),
		date1.getMinutes(),
		date1.getSeconds(),
		date1.getMilliseconds()
	]

	let values2 = [
		date2.getFullYear(),
		date2.getMonth(),
		date2.getDate(),
		date2.getHours(),
		date2.getMinutes(),
		date2.getSeconds(),
		date2.getMilliseconds()
	]

	return values1.reduce((previous, now, index) => {
		if ((ignore === 0 || ignore) && ignore >= 0 && index < ignore) { return previous }
		if (!previous) { return false }
		if (now !== values2[index]) { return false }
		return true
	}, true)
}

function getDateIgnoreReverse(date, ignore) {
	if (date === null || date === undefined) return null
	
	let values = [
		date.getFullYear(),
		date.getMonth(),
		date.getDate(),
		date.getHours(),
		date.getMinutes(),
		date.getSeconds(),
		date.getMilliseconds()
	]

	let dateArray = values.reduce((previous, now, index) => {
		if ((ignore === 0 || ignore) && ignore >= 0 && index < ignore) { return [...previous, 0] }
		return [...previous, now]
	}, [])

	return new Date(...dateArray)
}

function formatTime (time) {
	if (time === null || time === undefined) return null

	let ret = []
	for(let i = 1; i < arguments.length; i++) {
		ret.push(Math.trunc(time / arguments[i]))
		time = time % arguments[i]
	}
	return ret
}

function dateInApointment(date, target, period, duration) {
	if (date === null || date === undefined) throw new Error('date is null or undefined')
	if (target === null || target === undefined) throw new Error('target is null or undefined')
	if (period === null || period === undefined) throw new Error('period is null or undefined')
	if (duration === null || duration === undefined) throw new Error('duration is null or undefined')

	let dateIt = date

	while (dateIt.getTime() <= target.getTime()) {
		if (dateEquals(dateIt, target))
			return true
		dateIt = plus(dateIt, period, duration)
	}

	return false
}

module.exports = {
	PERIODS,
	scape,
	toDate,
	dateToStr,
	plus,
	dateEquals,
	dateEqualsReverse,
	getDateIgnore,
	getDateIgnoreReverse,
	formatTime,
	dateInApointment
}
