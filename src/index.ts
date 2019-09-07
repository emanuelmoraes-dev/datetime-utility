const isISODate = require('is-iso-date')

export const PERIODS = {
	MILLISECOND: 1,
	SECOND: 1000,
	MINUTE: 60*1000,
	HOUR: 60*60*1000,
	DAY: 24*60*60*1000,
	WEEK: 7*24*60*60*1000,
	MONTH: 'month',
	TWO_MONTHS: 'two_months',
	QUARTER: 'quarter',
	SEMESTER: 'semester',
	YEAR: 'year'
}

/**
 * Returns a date based on a string with a given pattern
 * @param {string} str - String to convert to date
 * @param {string=} pattern - String containing date mask (default value 'yyyy/MM/dd hh:mm:ss.l')
 * @returns {Date}
 * 
 * | Pattern | Description                                             |
 * | ------- | ------------------------------------------------------- |
 * | dd      | day of the month containing two characters              |
 * | d       | day of the month                                        |
 * | MM      | month of the year (minimum 1) containing two characters |
 * | M       | month of the year                                       |
 * | yyyy    | full year containing four characters                    |
 * | y       | full year                                               |
 * | hh      | hours of day with two characters                        |
 * | h       | hours of day                                            |
 * | mm      | minutes of hour with two characters                     |
 * | m       | minutes of hour                                         |
 * | ss      | seconds of minute with two characters                   |
 * | s       | seconds of minute                                       |
 * | l       | millisecond of second                                   |
 * 
 * @example
 * toDate('10/06/2019 21:13', 'dd/MM/yyyy hh:mm') // returns Date
 * toDate('10/6/2019 21:13', 'd/M/yyyy hh:mm') // returns Date
 * toDate('10/6/2019 21:13', 'dd/MM/yyyy hh:mm') // returns null, month invalid
 */
export function toDate(str: string, pattern: string = 'yyyy/MM/dd hh:mm:ss.l'): Date {
	if (str === null || str === undefined) return null
	if (pattern === null || pattern === undefined) return null
	if (!str.trim()) return null

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
		let v = parseInt(value)

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
	) || null
}

/**
 * Converts a date to a string in the format described in the pattern
 * @param {Date|string} date - Date (or string in ISO format) to convert to string
 * @param {string=} pattern - date format (default value: 'yyyy/MM/dd')
 * @returns {string}
 * 
 * | Pattern | Description                                             |
 * | ------- | ------------------------------------------------------- |
 * | dd      | day of the month containing two characters              |
 * | d       | day of the month                                        |
 * | MM      | month of the year (minimum 1) containing two characters |
 * | M       | month of the year                                       |
 * | yyyy    | full year containing four characters                    |
 * | yy      | year containing the last two digits                     |
 * | y       | full year                                               |
 * | hh      | hours of day with two characters                        |
 * | h       | hours of day                                            |
 * | mm      | minutes of hour with two characters                     |
 * | m       | minutes of hour                                         |
 * | ss      | seconds of minute with two characters                   |
 * | s       | seconds of minute                                       |
 * | l       | millisecond of second                                   |
 * 
 * @example
 * dateToStr(
 *    toDate('10/06/2019 21:13', 'dd/MM/yyyy hh:mm'),
 *    'dd/MM/yyyy hh:mm'
 * ) // 10/06/2019 21:13
 * 
 * dateToStr(
 *     toDate('10/6/2019 21:13', 'd/M/yyyy hh:mm'),
 *     'd/M/yyyy hh:mm'
 * ) // 10/6/2019 21:13
 * 
 * dateToStr(
 *     null,
 *     'dd/MM/yyyy hh:mm'
 * ) // null
 */
export function dateToStr(date: Date|string, pattern: string = 'yyyy/MM/dd'): string {
	if (date === null || date === undefined) return null
	if (pattern === null || pattern === undefined) return null

	if (typeof (date) === 'string' && isISODate(date)) { date = new Date(date) }
	else if (typeof (date) === 'string') return null

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

/**
 * Returns the minimum pattern  (strictly necessary) of a given formatted string representing a date
 * @param {string} strDate - date in string format
 * @param {string} pattern - 'strDate' parameter date format
 * @returns {string}
 * 
 * | Pattern | Description                                             |
 * | ------- | ------------------------------------------------------- |
 * | dd      | day of the month containing two characters              |
 * | d       | day of the month                                        |
 * | MM      | month of the year (minimum 1) containing two characters |
 * | M       | month of the year                                       |
 * | yyyy    | full year containing four characters                    |
 * | yy      | year containing the last two digits                     |
 * | y       | full year                                               |
 * | hh      | hours of day with two characters                        |
 * | h       | hours of day                                            |
 * | mm      | minutes of hour with two characters                     |
 * | m       | minutes of hour                                         |
 * | ss      | seconds of minute with two characters                   |
 * | s       | seconds of minute                                       |
 * | l       | millisecond of second                                   |
 * 
 * @example
 * let date = toDate('10/06/2019 21:13', 'dd/MM/yyyy hh:mm:ss.l')
 * let minPattern = getMinPattern('10/06/2019 21:13', 'dd/MM/yyyy hh:mm:ss.l') // dd/MM/yyyy hh:mm
 * date = plus(date, PERIODS.YEAR, 1)
 * dateToStr(date, minPattern) // 10/06/2020 21:13
 * 
 * date = toDate('10/06/2019 21:13:00.000', 'dd/MM/yyyy hh:mm')
 * minPattern = getMinPattern('10/06/2019 21:13:00.000', 'dd/MM/yyyy hh:mm') // dd/MM/yyyy hh:mm
 * date = plus(date, PERIODS.YEAR, 1)
 * dateToStr(date, minPattern) // 10/06/2020 21:13
 * 
 * getMinPattern(
 *     null,
 *     'dd/MM/yyyy hh:mm:ss.l'
 * ) // null
 */
export function getMinPattern(strDate: string, pattern: string): string {
	if (strDate === null || strDate === undefined) return null
	if (pattern === null || pattern === undefined) return null
	if (!strDate.trim()) return null

	let expPattern = /yyyy|y|MM|M|dd|d|hh|h|mm|m|ss|s|l/g
	let seps = pattern.split(expPattern)

	let sepsScape = seps.filter(s => s).map(scape)
	let expSepsScape = new RegExp(sepsScape.join('|'), 'g')
	let mask = pattern.split(expSepsScape).filter(p => p)
	let values = strDate.split(expSepsScape).filter(p => p)

	return values.reduce((minPattern: string, _, index: number) => {
		if (index >= mask.length) return minPattern
		let m = mask[index]
		let s = index < seps.length ? seps[index] : ''
		return `${minPattern}${s}${m}`
	}, '')
}

/**
 * Adds a value of a time period on a date
 * @param {Date|string} date - date (or string in ISO format) to be increased by a period of time
 * @param {string|number} period - textual or numeric representation (stored in 'PERIODS') of a period of time to be added to the date
 * @param {number} duration - unit of time to be added to the date
 * @returns {Date}
 * 
 * @example
 * plus(
 *     toDate('10/06/2019 21:13', 'dd/MM/yyyy hh:mm'),
 *     PERIODS.DAY,
 *     -1
 * ) // date with one day less
 *
 * plus(
 *    toDate('10/06/2019 21:13', 'dd/MM/yyyy hh:mm'),
 *    PERIODS.YEAR,
 *    1
 * ) // date with one year more
 */
export function plus(date: Date|string, period: string|number, duration: number): Date {
	if (date === null || date === undefined) return null
	if (period === null || period === undefined) return null
	if (duration === null || duration === undefined) return null

	if (typeof (date) === 'string' && isISODate(date)) { date = new Date(date) }
	else if (typeof (date) === 'string') return null

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

/**
 * Returns true if both dates are equal, ignoring certain **lower** values
 * @param {Date|string} date1 - first date (or string in ISO format) of comparison
 * @param {Date|string} date2 - second date (or string in ISO format) of comparison
 * @param {number} ignore - position from which the **lowest** values will be ignored (if not informed, nothing is ignored.)
 * @returns {boolean}
 * 
 * | ignore  | ignored values                                        |
 * | ------- | ----------------------------------------------------- |
 * | default | nothing ignored                                       |
 * | 7       | nothing ignored                                       |
 * | 6       | millisecond                                           |
 * | 5       | millisecond and second                                |
 * | 4       | millisecond, second and minute                        |
 * | 3       | millisecond, second, minute and hour                  |
 * | 2       | millisecond, second, minute, hour and day             |
 * | 1       | millisecond, second, minute, hour, day and month      |
 * | 0       | ignoring everything, that is, the dates are the same  |
 * 
 * @example
 * dateEquals(
 *     toDate('2019/06/10 10:30'),
 *     toDate('2019/06/10 10:30')
 * ) // true
 * 
 * dateEquals(
 *     // default pattern: 'yyyy/MM/dd hh:mm:ss.l'
 *     toDate('2019/06/10 10:30'),
 *     toDate('2019/06/10 02:13')
 * ) // false
 *
 * // ignoring millisecond, second, minute, hour and day
 * dateEquals(
 *     // default pattern: 'yyyy/MM/dd hh:mm:ss.l'
 *     toDate('2019/06/10 10:30'),
 *     toDate('2019/06/10 02:13'),
 *     2
 * ) // true
 * 
 * // ignoring millisecond, second, minute and hour
 * dateEquals(
 *     // default pattern: 'yyyy/MM/dd hh:mm:ss.l'
 *     toDate('2019/06/10 10:30'),
 *     toDate('2019/06/10 02:13'),
 *     3
 * ) // true
 * 
 * // ignoring millisecond, second and minute
 * dateEquals(
 *     // default pattern: 'yyyy/MM/dd hh:mm:ss.l'
 *     toDate('2019/06/10 10:30'),
 *     toDate('2019/06/10 02:13'),
 *     4
 * ) // false
 */
export function dateEquals(date1: Date|string, date2: Date|string, ignore: number = null): boolean {
	if (date1 === null || date1 === undefined) throw new Error('date1 is null or undefined')
	if (date2 === null || date2 === undefined) throw new Error('date2 is null or undefined')

	if (typeof (date1) === 'string' && isISODate(date1)) { date1 = new Date(date1) }
	else if (typeof (date1) === 'string') return null

	if (typeof (date2) === 'string' && isISODate(date2)) { date2 = new Date(date2) }
	else if (typeof (date2) === 'string') return null

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

	return values1.reduce((previous: boolean, now: number, index: number) => {
		if ((ignore === 0 || ignore) && ignore >= 0 && index >= ignore) { return previous }
		if (!previous) { return false }
		if (now !== values2[index]) { return false }
		return true
	}, true)
}

/**
 * Returns true if both dates are equal, ignoring certain **higher** values
 * @param {Date|string} date1 - first date (or string in ISO format) of comparison
 * @param {Date|string} date2 - second date (or string in ISO format) of comparison
 * @param {number} ignore  - position from which the **highest** values will be ignored (if not informed, nothing will be ignored).
 * @returns {boolean}
 * 
 * | ignore  | ignored values                                        |
 * | ------- | ----------------------------------------------------- |
 * | default | nothing ignored                                       |
 * | 7       | nothing ignored                                       |
 * | 6       | year                                                  |
 * | 5       | year and month                                        |
 * | 4       | year, month and day                                   |
 * | 3       | year, month, day and hour                             |
 * | 2       | year, month, day, hour and minute                     |
 * | 1       | year, month, day, hour, minute and second             |
 * | 0       | ignoring everything, that is, the dates are the same  |
 * 
 * @example
 * dateEqualsReverse(
 *     // default pattern: 'yyyy/MM/dd hh:mm:ss.l'
 *     toDate('2019/10/06 10:40'), 
 *     toDate('2019/10/06 10:40')
 * ) // true
 *
 * dateEqualsReverse(
 *     toDate('2019/10/06 10:40'),
 *     toDate('2019/12/06 10:40')
 * ) // false
 *
 * // ignoring year, month and day
 * dateEqualsReverse(
 *     // default pattern: 'yyyy/MM/dd hh:mm:ss.l'
 *     toDate('2019/10/06 10:40'),
 *     toDate('2019/12/06 10:40'),
 *     4
 * ) // true
 * 
 * // ignoring year and month
 * dateEqualsReverse(
 *     // default pattern: 'yyyy/MM/dd hh:mm:ss.l'
 *     toDate('2019/10/06 10:40'),
 *     toDate('2019/12/06 10:40'),
 *     5
 * ) // true
 *
 * // ignoring year
 * dateEqualsReverse(
 *     // default pattern: 'yyyy/MM/dd hh:mm:ss.l'
 *     toDate('2019/10/06 10:40'),
 *     toDate('2019/12/06 10:40'),
 *     6
 * ) // false
 */
export function dateEqualsReverse(date1: Date|string, date2: Date|string, ignore: number = null): boolean {
	if (date1 === null || date1 === undefined) throw new Error('date1 is null or undefined')
	if (date2 === null || date2 === undefined) throw new Error('date2 is null or undefined')

	if (typeof (date1) === 'string' && isISODate(date1)) { date1 = new Date(date1) }
	else if (typeof (date1) === 'string') return null

	if (typeof (date2) === 'string' && isISODate(date2)) { date2 = new Date(date2) }
	else if (typeof (date2) === 'string') return null

	let values1 = [
		date1.getFullYear(),
		date1.getMonth(),
		date1.getDate(),
		date1.getHours(),
		date1.getMinutes(),
		date1.getSeconds(),
		date1.getMilliseconds()
	]

	values1 = values1.reverse()

	let values2 = [
		date2.getFullYear(),
		date2.getMonth(),
		date2.getDate(),
		date2.getHours(),
		date2.getMinutes(),
		date2.getSeconds(),
		date2.getMilliseconds()
	]

	values2 = values2.reverse()

	return values1.reduce((previous: boolean, now: number, index: number) => {
		if ((ignore === 0 || ignore) && ignore >= 0 && index >= ignore) { return previous }
		if (!previous) { return false }
		if (now !== values2[index]) { return false }
		return true
	}, true)
}

/**
 * Gets date ignoring **lower** values
 * @param {Date|string} date - date (or string in ISO format) that will have higher values ignored
 * @param {number} ignore - position from which the **lowest** values will be ignored (if not informed, nothing is ignored.)
 * @returns {Date}
 * 
 * | ignore  | ignored values                                        |
 * | ------- | ----------------------------------------------------- |
 * | default | nothing ignored                                       |
 * | 7       | nothing ignored                                       |
 * | 6       | millisecond                                           |
 * | 5       | millisecond and second                                |
 * | 4       | millisecond, second and minute                        |
 * | 3       | millisecond, second, minute and hour                  |
 * | 2       | millisecond, second, minute, hour and day             |
 * | 1       | millisecond, second, minute, hour, day and month      |
 * | 0       | ignoring everything                                   |
 * 
 * @example
 * getDateIgnore(
 *     // default pattern: 'yyyy/MM/dd hh:mm:ss.l'
 *     toDate('2019/06/10 10:30'),
 *     3
 * ) // Date only with year, month and day
 * 
 * getDateIgnore(
 *     // default pattern: 'yyyy/MM/dd hh:mm:ss.l'
 *     toDate('2019/06/10 10:30'),
 *     4
 * ) // Date only with year, month, day and hour
 * 
 * getDateIgnore(
 *     // default pattern: 'yyyy/MM/dd hh:mm:ss.l'
 *     toDate('2019/06/10 10:30'),
 *     7
 * ) // gets exactly the same date
 */
export function getDateIgnore(date: Date|string, ignore: number = null): Date {
	if (date === null || date === undefined) return null

	if (typeof (date) === 'string' && isISODate(date)) { date = new Date(date) }
	else if (typeof (date) === 'string') return null

	let values = [
		date.getFullYear(),
		date.getMonth(),
		date.getDate(),
		date.getHours(),
		date.getMinutes(),
		date.getSeconds(),
		date.getMilliseconds()
	]

	let dateArray = values.reduce((previous: number[], now: number, index: number) => {
		if ((ignore === 0 || ignore) && ignore >= 0 && index >= ignore) { return [...previous, 0] }
		return [...previous, now]
	}, [])

	return new Date(
		dateArray[0] || 0,
		dateArray[1] || 0,
		dateArray[2] || 1,
		dateArray[3] || 0,
		dateArray[4] || 0,
		dateArray[5] || 0,
		dateArray[6] || 0,
	)
}

/**
 * Gets date ignoring **high** values
 * @param {Date|string} date - date (or string in ISO format) that will have higher values ignored
 * @param {number} ignore - position from which the **highest** values will be ignored (if not informed, nothing will be ignored).
 * @returns {Date}
 * 
 * | ignore  | ignored values                                        |
 * | ------- | ----------------------------------------------------- |
 * | default | nothing ignored                                       |
 * | 7       | nothing ignored                                       |
 * | 6       | year                                                  |
 * | 5       | year and month                                        |
 * | 4       | year, month and day                                   |
 * | 3       | year, month, day and hour                             |
 * | 2       | year, month, day, hour and minute                     |
 * | 1       | year, month, day, hour, minute and second             |
 * | 0       | ignoring everything, that is, the dates are the same  |
 * 
 * @example
 * getDateIgnoreReverse(
 *     // default pattern: 'yyyy/MM/dd hh:mm:ss.l'
 *     toDate('2019/06/10 10:30'),
 *     4
 * ) // Date only with hour, minute, second and millisecond
 * 
 * getDateIgnoreReverse(
 *     // default pattern: 'yyyy/MM/dd hh:mm:ss.l'
 *     toDate('2019/06/10 10:30'),
 *     5
 * ) // Date only with day, hour, minute, second and millisecond
 * 
 * getDateIgnoreReverse(
 *     // default pattern: 'yyyy/MM/dd hh:mm:ss.l'
 *     toDate('2019/06/10 10:30'),
 *     7
 * ) // gets exactly the same date
 */
export function getDateIgnoreReverse(date: Date|string, ignore: number = null): Date {
	if (date === null || date === undefined) return null

	if (typeof (date) === 'string' && isISODate(date)) { date = new Date(date) }
	else if (typeof (date) === 'string') return null
	
	let values = [
		date.getFullYear(),
		date.getMonth(),
		date.getDate(),
		date.getHours(),
		date.getMinutes(),
		date.getSeconds(),
		date.getMilliseconds()
	]

	values = values.reverse()

	let dateArray = values.reduce((previous: number[], now: number, index: number) => {
		if ((ignore === 0 || ignore) && ignore >= 0 && index >= ignore) { return [...previous, 0] }
		return [...previous, now]
	}, [])

	dateArray = dateArray.reverse()

	return new Date(
		dateArray[0] || 0,
		dateArray[1] || 0,
		dateArray[2] || 1,
		dateArray[3] || 0,
		dateArray[4] || 0,
		dateArray[5] || 0,
		dateArray[6] || 0,
	)
}

/**
 * Gets values from a time
 * 
 * **Attention!**
 *
 * The MONTH, TWO_MONTHS, SEMESTER, QUARTER, and YEAR variables can **not** be used in formatTime.
 * 
 * @param {number} time - milliseconds obtained by the getTime() function
 * @param {...number} args - types of values to be extracted and placed in an array
 * @returns {number[]}
 * 
 * @example
 * formatTime(
 *     200100,
 *     PERIODS.MINUTE, 
 *     PERIODS.SECOND
 * ) // [<amount of minutes in 200100 milliseconds>, <number of seconds remaining>]
 */
export function formatTime (time: number, ...args: number[]): number[] {
	if (time === null || time === undefined) return null

	let ret = []
	for(let arg of args) {
		ret.push(Math.trunc(time / arg))
		time = time % arg
	}
	return ret
}

/**
 * Returns true if the date is present within a recurring schedule.
 * @param {Date|string} date - first scheduling date (or string in ISO format)
 * @param {Date|string} target - check to see if you are on scheduling.
 * @param {string|number} period - textual or numeric representation (stored in 'PERIODS') of a time period of the schedule
 * @param {number} duration - unit to include new periodic dates in schedule
 * @returns {boolean}
 * 
 * @example
 * dateInApointment(
 *     toDate('2000/01/02'),
 *     toDate('2025/07/02'),
 *     PERIODS.SEMESTER,
 *     1
 * ) // returns true because the date 2025/07/02 is included in a timeline for each semester from the date of 2000/01/02
 *
 * dateInApointment(
 *    toDate('2000/01/02'),
 *    toDate('2025/07/02'),
 *    PERIODS.SEMESTER,
 *    2
 * ) // returns false because the date 2025/07/02 is not included in a timeline for each two semester from the date of 2000/01/02
 */
export function dateInApointment(date: Date|string, target: Date|string, period: string|number, duration: number): boolean {
	if (date === null || date === undefined) throw new Error('date is null or undefined')
	if (target === null || target === undefined) throw new Error('target is null or undefined')
	if (period === null || period === undefined) throw new Error('period is null or undefined')
	if (duration === null || duration === undefined) throw new Error('duration is null or undefined')

	if (typeof (date) === 'string' && isISODate(date)) { date = new Date(date) }
	else if (typeof (date) === 'string') return null

	if (typeof (target) === 'string' && isISODate(target)) { target = new Date(target) }
	else if (typeof (target) === 'string') return null

	let dateIt = date

	while (dateIt.getTime() <= target.getTime()) {
		if (dateEquals(dateIt, target))
			return true
		dateIt = plus(dateIt, period, duration)
	}

	return false
}

/**
 * Returns string with special regular expression characters with escape
 * @param {string} str - string to have its special RegExp characters with escape
 * @returns {string}
 * 
 * @example
 * scape('ab.*+?^${c}()|d[]\\ef') // ab\.\*\+\?\^\$\{c\}\(\)\|d\[\]\\ef
 */
export function scape(str: string): string {
	if (str === null || str === undefined) return null
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}