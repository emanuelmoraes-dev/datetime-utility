"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * check if a string is an ISO-compliant date
 * @param str - string to check
 * @returns true if a string is an ISO-compliant date
 *
 * @example
 * console.log( isISODate( '2015-02-21T00:52:43.822Z' ) ); // true
 * console.log( isISODate( '2015-02-21T00:52:43.822' ) );  // false
 * console.log( isISODate( '2015-02-21T00:52:43Z' ) );     // true
 * console.log( isISODate( '2015-02-21T00:52:43' ) );      // false
 * console.log( isISODate( '2015-02-21T00:52Z' ) );        // true
 * console.log( isISODate( '2015-02-21T00:52' ) );         // false
 * console.log( isISODate( '2015-02-21T00Z' ) );           // false
 */
function isISODate(str) {
    if (typeof str !== 'string')
        return false;
    var isoDateRegExp = new RegExp(/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/);
    return isoDateRegExp.test(str);
}
exports.isISODate = isISODate;
exports.PERIODS = {
    MILLISECOND: 1,
    SECOND: 1000,
    MINUTE: 60 * 1000,
    HOUR: 60 * 60 * 1000,
    DAY: 24 * 60 * 60 * 1000,
    WEEK: 7 * 24 * 60 * 60 * 1000,
    MONTH: 'month',
    TWO_MONTHS: 'two_months',
    QUARTER: 'quarter',
    SEMESTER: 'semester',
    YEAR: 'year'
};
/**
 * Returns a date based on a string with a given pattern
 * @param {string} str - String to convert to date
 * @param {string=} pattern - String containing date mask (default value 'yyyy/MM/dd hh:mm:ss.S')
 * @returns {Date} date based on a string with a given pattern
 *
 * @example
 * toDate('10/06/2019 21:13', 'dd/MM/yyyy hh:mm') // returns Date
 * toDate('10/6/2019 21:13', 'd/M/yyyy hh:mm') // returns Date
 * toDate('10/6/2019 21:13:49.5', 'd/M/yyyy hh:mm:ss.S') // returns Date
 * toDate('10/6/2019 21:13:49.5', 'd/M/yyyy hh:mm:ss.SS') // returns null, invalid millisecond
 * toDate('10/6/2019 21:13:49.59', 'd/M/yyyy hh:mm:ss.SS') // returns Date
 * toDate('10/6/2019 21:13:49.593', 'd/M/yyyy hh:mm:ss.SS') // returns Date
 * toDate('10/6/2019 21:13:49.593', 'd/M/yyyy hh:mm:ss.SSS') // returns Date
 * toDate('10/6/2019 21:13:49.5', 'd/M/yyyy hh:mm:ss.SSS') // returns null, invalid millisecond
 * toDate('10/6/2019 21:13', 'dd/MM/yyyy hh:mm') // returns null, invalid month
 */
function toDate(str, pattern) {
    if (pattern === void 0) { pattern = 'yyyy/MM/dd hh:mm:ss.S'; }
    if (typeof str !== 'string')
        return null;
    if (typeof pattern !== 'string')
        return null;
    if (!str.trim())
        return null;
    if (!pattern.trim())
        return null;
    var expPattern = /yyyy|y|MM|M|dd|d|hh|h|mm|m|ss|s|SSS|SS|S/g;
    var seps = pattern.split(expPattern);
    var sepsScape = seps.filter(function (s) { return s; }).map(scape);
    var expSepsScape = new RegExp(sepsScape.join('|'), 'g');
    var mask = pattern.split(expSepsScape).filter(function (p) { return p; });
    var values = str.split(expSepsScape).filter(function (p) { return p; });
    var dateValues = {
        day: 1,
        month: 0,
        year: 0,
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
    };
    var valid = true;
    for (var i = 0; i < mask.length; i++) {
        var m = mask[i];
        if (i >= values.length)
            break;
        var value = values[i];
        var v = parseInt(value);
        if (Number.isNaN(v)) {
            valid = false;
            break;
        }
        switch (m) {
            case 'dd': {
                if (value.length !== 2)
                    return null;
                dateValues.day = v;
                break;
            }
            case 'd': {
                dateValues.day = v;
                break;
            }
            case 'MM': {
                if (value.length !== 2)
                    return null;
                dateValues.month = v;
                break;
            }
            case 'M': {
                dateValues.month = v;
                break;
            }
            case 'yyyy': {
                if (value.length !== 4)
                    return null;
                dateValues.year = v;
                break;
            }
            case 'y': {
                dateValues.year = v;
                break;
            }
            case 'hh': {
                if (value.length !== 2)
                    return null;
                dateValues.hour = v;
                break;
            }
            case 'h': {
                dateValues.hour = v;
                break;
            }
            case 'mm': {
                if (value.length !== 2)
                    return null;
                dateValues.minute = v;
                break;
            }
            case 'm': {
                dateValues.minute = v;
                break;
            }
            case 'ss': {
                if (value.length !== 2)
                    return null;
                dateValues.second = v;
                break;
            }
            case 's': {
                dateValues.second = v;
                break;
            }
            case 'SSS': {
                if (value.length !== 3)
                    return null;
                dateValues.millisecond = v;
                break;
            }
            case 'SS': {
                if (value.length < 2 || value.length > 3)
                    return null;
                dateValues.millisecond = v;
                break;
            }
            case 'S': {
                dateValues.millisecond = v;
                break;
            }
            default: throw new Error("Pattern " + pattern + " Inv\u00E1lid in '" + m + "'");
        }
    }
    // Cria um date
    return valid && new Date(dateValues.year, dateValues.month - 1, dateValues.day, dateValues.hour, dateValues.minute, dateValues.second, dateValues.millisecond) || null;
}
exports.toDate = toDate;
/**
 * Converts a date to a string in the format described in the pattern
 * @param {Date|string} date - Date (or string in ISO format) to convert to string
 * @param {string=} pattern - date format (default value: 'yyyy/MM/dd')
 * @returns {string} string in the format described in the pattern
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
 *     toDate('10/6/2019 21:13', 'd/M/yyyy hh:mm'),
 *     'd/M/yy hh:mm'
 * ) // 10/6/19 21:13
 *
 * dateToStr(
 *     toDate('10/6/2019 21:13:26.2', 'd/M/yyyy hh:mm:ss.S'),
 *     'd/M/yyyy hh:mm:ss.SSS'
 * ) // 10/6/2019 21:13:26.002
 *
 * dateToStr(
 *     toDate('10/6/2019 21:13:26.2', 'd/M/yyyy hh:mm:ss.S'),
 *     'd/M/yyyy hh:mm:ss.SS'
 * ) // 10/6/2019 21:13:26.02
 *
 * dateToStr(
 *     toDate('10/6/2019 21:13:26.2', 'd/M/yyyy hh:mm:ss.S'),
 *     'd/M/yyyy hh:mm:ss.S'
 * ) // 10/6/2019 21:13:26.2
 *
 * dateToStr(
 *     toDate('10/6/2019 21:13:26.273', 'd/M/yyyy hh:mm:ss.S'),
 *     'd/M/yyyy hh:mm:ss.SS'
 * ) // 10/6/2019 21:13:26.27
 *
 * dateToStr(
 *     null,
 *     'dd/MM/yyyy hh:mm'
 * ) // null
 */
function dateToStr(date, pattern) {
    if (pattern === void 0) { pattern = 'yyyy/MM/dd'; }
    if (!(date instanceof Date) && typeof date !== 'string')
        return null;
    if (typeof pattern !== 'string')
        return null;
    if (!pattern.trim())
        return null;
    if (typeof date === 'string' && isISODate(date)) {
        date = new Date(date);
    }
    else if (typeof date === 'string')
        return null;
    if (date instanceof Date) {
        var day = "" + date.getDate();
        var month = "" + (date.getMonth() + 1);
        var hour = "" + date.getHours();
        var minute = "" + date.getMinutes();
        var second = "" + date.getSeconds();
        var millisecond = "" + date.getMilliseconds();
        var year = "" + date.getFullYear();
        var values_1 = {
            yyyy: year,
            yy: year.substring(year.length - 2),
            y: year,
            MM: month.length === 1 ? "0" + month : month,
            M: month,
            dd: day.length === 1 ? "0" + day : day,
            d: day,
            hh: hour.length === 1 ? "0" + hour : hour,
            h: hour,
            mm: minute.length === 1 ? "0" + minute : minute,
            m: minute,
            ss: second.length === 1 ? "0" + second : second,
            s: second,
            SSS: millisecond.length === 2 ? "0" + millisecond : millisecond.length === 1 ? "00" + millisecond : millisecond,
            SS: millisecond.length === 3 ? "" + millisecond[0] + millisecond[1] : millisecond.length === 1 ? "0" + millisecond : millisecond,
            S: millisecond,
            '': ''
        };
        var expPattern = /yyyy|yy|y|MM|M|dd|d|hh|h|mm|m|ss|s|SSS|SS|S/g;
        var seps = pattern.split(expPattern);
        var sepsScape = seps.filter(function (s) { return s; }).map(scape);
        var mask_1 = pattern.split(new RegExp(sepsScape.join('|'), 'g')).filter(function (p) { return p; });
        return seps.reduce(function (previous, now, index) {
            if (previous === null)
                return null;
            var m = mask_1[index];
            if (!m)
                m = '';
            var value = values_1[m];
            if (value === null)
                return null;
            return "" + previous + now + value;
        }, '');
    }
    return date;
}
exports.dateToStr = dateToStr;
/**
 * Returns the minimum pattern  (strictly necessary) of a given formatted string representing a date
 * @param {string} strDate - date in string format
 * @param {string} pattern - 'strDate' parameter date format
 * @returns {string} minimum pattern  (strictly necessary) of a given formatted string representing a date
 *
 * @example
 * let date = toDate('10/06/2019 21:13', 'dd/MM/yyyy hh:mm:ss.S')
 * let minPattern = getMinPattern('10/06/2019 21:13', 'dd/MM/yyyy hh:mm:ss.S') // dd/MM/yyyy hh:mm
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
 *     'dd/MM/yyyy hh:mm:ss.S'
 * ) // null
 */
function getMinPattern(strDate, pattern) {
    if (typeof strDate !== 'string')
        return null;
    if (typeof pattern !== 'string')
        return null;
    if (!strDate.trim())
        return null;
    if (!pattern.trim())
        return null;
    var expPattern = /yyyy|y|MM|M|dd|d|hh|h|mm|m|ss|s|SSS|SS|S/g;
    var seps = pattern.split(expPattern);
    var sepsScape = seps.filter(function (s) { return s; }).map(scape);
    var expSepsScape = new RegExp(sepsScape.join('|'), 'g');
    var mask = pattern.split(expSepsScape).filter(function (p) { return p; });
    var values = strDate.split(expSepsScape).filter(function (p) { return p; });
    return values.reduce(function (minPattern, _, index) {
        if (index >= mask.length)
            return minPattern;
        var m = mask[index];
        var s = index < seps.length ? seps[index] : '';
        return "" + minPattern + s + m;
    }, '');
}
exports.getMinPattern = getMinPattern;
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
function plus(date, period, duration) {
    if (!(date instanceof Date) && typeof date !== 'string')
        return null;
    if (typeof period !== 'string' && typeof period !== 'number')
        return null;
    if (typeof duration !== 'number')
        return null;
    if (typeof date === 'string' && isISODate(date)) {
        date = new Date(date);
    }
    else if (typeof date === 'string')
        return null;
    var _a = [
        date.getDate(),
        date.getMonth(),
        date.getFullYear(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
    ], day = _a[0], month = _a[1], year = _a[2], hour = _a[3], minute = _a[4], second = _a[5], millisecond = _a[6];
    switch (period) {
        case exports.PERIODS.MILLISECOND: return new Date(year, month, day, hour, minute, second, millisecond + duration);
        case exports.PERIODS.SECOND: return new Date(year, month, day, hour, minute, second + duration, millisecond);
        case exports.PERIODS.MINUTE: return new Date(year, month, day, hour, minute + duration, second, millisecond);
        case exports.PERIODS.HOUR: return new Date(year, month, day, hour + duration, minute, second, millisecond);
        case exports.PERIODS.DAY: return new Date(year, month, day + duration, hour, minute, second, millisecond);
        case exports.PERIODS.WEEK: return new Date(year, month, day + duration * 7, hour, minute, second, millisecond);
        case exports.PERIODS.MONTH: return new Date(year, month + duration, day, hour, minute, second, millisecond);
        case exports.PERIODS.TWO_MONTHS: return new Date(year, month + duration * 2, day, hour, minute, second, millisecond);
        case exports.PERIODS.SEMESTER: return new Date(year, month + duration * 6, day, hour, minute, second, millisecond);
        case exports.PERIODS.QUARTER: return new Date(year, month + duration * 3, day, hour, minute, second, millisecond);
        case exports.PERIODS.YEAR: return new Date(year + duration, month, day, hour, minute, second, millisecond);
        default:
            throw new Error("Invalid period " + period);
    }
}
exports.plus = plus;
/**
 * Returns true if both dates are equal, ignoring certain **lower** values
 * @param {Date|string} date1 - first date (or string in ISO format) of comparison
 * @param {Date|string} date2 - second date (or string in ISO format) of comparison
 * @param {number} ignore - position from which the **lowest** values will be ignored (if not informed, nothing is ignored.)
 * @returns {boolean} true if both dates are equal, ignoring certain **lower** values
 *
 * @example
 * dateEquals(
 *     toDate('2019/06/10 10:30'),
 *     toDate('2019/06/10 10:30')
 * ) // true
 *
 * dateEquals(
 *     // default pattern: 'yyyy/MM/dd hh:mm:ss.S'
 *     toDate('2019/06/10 10:30'),
 *     toDate('2019/06/10 02:13')
 * ) // false
 *
 * // ignoring millisecond, second, minute, hour and day
 * dateEquals(
 *     // default pattern: 'yyyy/MM/dd hh:mm:ss.S'
 *     toDate('2019/06/10 10:30'),
 *     toDate('2019/06/10 02:13'),
 *     2
 * ) // true
 *
 * // ignoring millisecond, second, minute and hour
 * dateEquals(
 *     // default pattern: 'yyyy/MM/dd hh:mm:ss.S'
 *     toDate('2019/06/10 10:30'),
 *     toDate('2019/06/10 02:13'),
 *     3
 * ) // true
 *
 * // ignoring millisecond, second and minute
 * dateEquals(
 *     // default pattern: 'yyyy/MM/dd hh:mm:ss.S'
 *     toDate('2019/06/10 10:30'),
 *     toDate('2019/06/10 02:13'),
 *     4
 * ) // false
 */
function dateEquals(date1, date2, ignore) {
    if (ignore === void 0) { ignore = null; }
    if (!(date1 instanceof Date) && typeof date1 !== 'string')
        throw new Error('date1 not is Date or string');
    if (!(date2 instanceof Date) && typeof date2 !== 'string')
        throw new Error('date2 not is Date or string');
    if (typeof ignore !== 'number' && ignore !== null && ignore !== undefined)
        throw new Error('ignore not is number or null or undefined');
    if (typeof (date1) === 'string' && isISODate(date1)) {
        date1 = new Date(date1);
    }
    else if (typeof (date1) === 'string')
        throw new Error('date1 not is Date or string in ISO format');
    if (typeof (date2) === 'string' && isISODate(date2)) {
        date2 = new Date(date2);
    }
    else if (typeof (date2) === 'string')
        throw new Error('date2 not is Date or string in ISO format');
    var values1 = [
        date1.getFullYear(),
        date1.getMonth(),
        date1.getDate(),
        date1.getHours(),
        date1.getMinutes(),
        date1.getSeconds(),
        date1.getMilliseconds()
    ];
    var values2 = [
        date2.getFullYear(),
        date2.getMonth(),
        date2.getDate(),
        date2.getHours(),
        date2.getMinutes(),
        date2.getSeconds(),
        date2.getMilliseconds()
    ];
    return values1.reduce(function (previous, now, index) {
        if ((ignore === 0 || ignore) && ignore >= 0 && index >= ignore) {
            return previous;
        }
        if (!previous) {
            return false;
        }
        if (now !== values2[index]) {
            return false;
        }
        return true;
    }, true);
}
exports.dateEquals = dateEquals;
/**
 * Returns true if both dates are equal, ignoring certain **higher** values
 * @param {Date|string} date1 - first date (or string in ISO format) of comparison
 * @param {Date|string} date2 - second date (or string in ISO format) of comparison
 * @param {number} ignore  - position from which the **highest** values will be ignored (if not informed, nothing will be ignored).
 * @returns {boolean} true if both dates are equal, ignoring certain **higher** values
 *
 * @example
 * dateEqualsReverse(
 *     // default pattern: 'yyyy/MM/dd hh:mm:ss.S'
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
 *     // default pattern: 'yyyy/MM/dd hh:mm:ss.S'
 *     toDate('2019/10/06 10:40'),
 *     toDate('2019/12/06 10:40'),
 *     4
 * ) // true
 *
 * // ignoring year and month
 * dateEqualsReverse(
 *     // default pattern: 'yyyy/MM/dd hh:mm:ss.S'
 *     toDate('2019/10/06 10:40'),
 *     toDate('2019/12/06 10:40'),
 *     5
 * ) // true
 *
 * // ignoring year
 * dateEqualsReverse(
 *     // default pattern: 'yyyy/MM/dd hh:mm:ss.S'
 *     toDate('2019/10/06 10:40'),
 *     toDate('2019/12/06 10:40'),
 *     6
 * ) // false
 */
function dateEqualsReverse(date1, date2, ignore) {
    if (ignore === void 0) { ignore = null; }
    if (!(date1 instanceof Date) && typeof date1 !== 'string')
        throw new Error('date1 not is Date or string');
    if (!(date2 instanceof Date) && typeof date2 !== 'string')
        throw new Error('date2 not is Date or string');
    if (typeof ignore !== 'number' && ignore !== null && ignore !== undefined)
        throw new Error('ignore not is number or null or undefined');
    if (typeof (date1) === 'string' && isISODate(date1)) {
        date1 = new Date(date1);
    }
    else if (typeof (date1) === 'string')
        throw new Error('date1 not is Date or string in ISO format');
    if (typeof (date2) === 'string' && isISODate(date2)) {
        date2 = new Date(date2);
    }
    else if (typeof (date2) === 'string')
        throw new Error('date2 not is Date or string in ISO format');
    var values1 = [
        date1.getFullYear(),
        date1.getMonth(),
        date1.getDate(),
        date1.getHours(),
        date1.getMinutes(),
        date1.getSeconds(),
        date1.getMilliseconds()
    ];
    values1 = values1.reverse();
    var values2 = [
        date2.getFullYear(),
        date2.getMonth(),
        date2.getDate(),
        date2.getHours(),
        date2.getMinutes(),
        date2.getSeconds(),
        date2.getMilliseconds()
    ];
    values2 = values2.reverse();
    return values1.reduce(function (previous, now, index) {
        if ((ignore === 0 || ignore) && ignore >= 0 && index >= ignore) {
            return previous;
        }
        if (!previous) {
            return false;
        }
        if (now !== values2[index]) {
            return false;
        }
        return true;
    }, true);
}
exports.dateEqualsReverse = dateEqualsReverse;
/**
 * Gets date ignoring **lower** values
 * @param {Date|string} date - date (or string in ISO format) that will have higher values ignored
 * @param {number} ignore - position from which the **lowest** values will be ignored (if not informed, nothing is ignored.)
 * @returns {Date} date ignoring **lower** values
 *
 * @example
 * getDateIgnore(
 *     // default pattern: 'yyyy/MM/dd hh:mm:ss.S'
 *     toDate('2019/06/10 10:30'),
 *     3
 * ) // Date only with year, month and day
 *
 * getDateIgnore(
 *     // default pattern: 'yyyy/MM/dd hh:mm:ss.S'
 *     toDate('2019/06/10 10:30'),
 *     4
 * ) // Date only with year, month, day and hour
 *
 * getDateIgnore(
 *     // default pattern: 'yyyy/MM/dd hh:mm:ss.S'
 *     toDate('2019/06/10 10:30'),
 *     7
 * ) // gets exactly the same date
 */
function getDateIgnore(date, ignore) {
    if (ignore === void 0) { ignore = null; }
    if (!(date instanceof Date) && typeof date !== 'string')
        throw new Error('date not is Date or string');
    if (typeof ignore !== 'number' && ignore !== null && ignore !== undefined)
        throw new Error('ignore not is number or null or undefined');
    if (typeof (date) === 'string' && isISODate(date)) {
        date = new Date(date);
    }
    else if (typeof (date) === 'string')
        throw new Error('date not is Date or string in ISO format');
    var values = [
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
    ];
    var dateArray = values.reduce(function (previous, now, index) {
        if ((ignore === 0 || ignore) && ignore >= 0 && index >= ignore) {
            return __spreadArrays(previous, [0]);
        }
        return __spreadArrays(previous, [now]);
    }, []);
    return new Date(dateArray[0] || 0, dateArray[1] || 0, dateArray[2] || 1, dateArray[3] || 0, dateArray[4] || 0, dateArray[5] || 0, dateArray[6] || 0);
}
exports.getDateIgnore = getDateIgnore;
/**
 * Gets date ignoring **high** values
 * @param {Date|string} date - date (or string in ISO format) that will have higher values ignored
 * @param {number} ignore - position from which the **highest** values will be ignored (if not informed, nothing will be ignored).
 * @returns {Date} date ignoring **high** values
 *
 * @example
 * getDateIgnoreReverse(
 *     // default pattern: 'yyyy/MM/dd hh:mm:ss.S'
 *     toDate('2019/06/10 10:30'),
 *     4
 * ) // Date only with hour, minute, second and millisecond
 *
 * getDateIgnoreReverse(
 *     // default pattern: 'yyyy/MM/dd hh:mm:ss.S'
 *     toDate('2019/06/10 10:30'),
 *     5
 * ) // Date only with day, hour, minute, second and millisecond
 *
 * getDateIgnoreReverse(
 *     // default pattern: 'yyyy/MM/dd hh:mm:ss.S'
 *     toDate('2019/06/10 10:30'),
 *     7
 * ) // gets exactly the same date
 */
function getDateIgnoreReverse(date, ignore) {
    if (ignore === void 0) { ignore = null; }
    if (!(date instanceof Date) && typeof date !== 'string')
        throw new Error('date not is Date or string');
    if (typeof ignore !== 'number' && ignore !== null && ignore !== undefined)
        throw new Error('ignore not is number or null or undefined');
    if (typeof (date) === 'string' && isISODate(date)) {
        date = new Date(date);
    }
    else if (typeof (date) === 'string')
        throw new Error('date not is Date or string in ISO format');
    var values = [
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
    ];
    values = values.reverse();
    var dateArray = values.reduce(function (previous, now, index) {
        if ((ignore === 0 || ignore) && ignore >= 0 && index >= ignore) {
            return __spreadArrays(previous, [0]);
        }
        return __spreadArrays(previous, [now]);
    }, []);
    dateArray = dateArray.reverse();
    return new Date(dateArray[0] || 0, dateArray[1] || 0, dateArray[2] || 1, dateArray[3] || 0, dateArray[4] || 0, dateArray[5] || 0, dateArray[6] || 0);
}
exports.getDateIgnoreReverse = getDateIgnoreReverse;
/**
 * Gets values from a time
 *
 * **Attention!**
 *
 * The MONTH, TWO_MONTHS, SEMESTER, QUARTER, and YEAR variables can **not** be used in formatTime.
 *
 * @param {number} time - milliseconds obtained by the getTime() function
 * @param {...number} args - types of values to be extracted and placed in an array
 * @returns {number[]} values from a time
 *
 * @example
 * formatTime(
 *     200100,
 *     PERIODS.MINUTE,
 *     PERIODS.SECOND
 * ) // [<amount of minutes in 200100 milliseconds>, <number of seconds remaining>]
 */
function formatTime(time) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (typeof time !== 'number')
        throw new Error('time not is number');
    var invalidIndex = args.findIndex(function (a) { return typeof a !== 'number'; });
    if (invalidIndex >= 0)
        throw new Error("args[" + invalidIndex + "] not is number");
    var ret = [];
    for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
        var arg = args_1[_a];
        ret.push(Math.floor(time / arg));
        time = time % arg;
    }
    return ret;
}
exports.formatTime = formatTime;
/**
 * Returns true if the date is present within a recurring schedule.
 * @param {Date|string} date - first scheduling date (or string in ISO format)
 * @param {Date|string} target - check to see if you are on scheduling.
 * @param {string|number} period - textual or numeric representation (stored in 'PERIODS') of a time period of the schedule
 * @param {number} duration - unit to include new periodic dates in schedule
 * @param {string|number=} marginErrorPeriod - textual or numeric representation (stored in 'PERIODS') of a programming period to be used to define a "margin of error". (Default value: PERIODS.MILLISECOND)
 * @param {number=} marginErrorDuration - margin of error value. (Default value: 0)
 * @returns {boolean} true if the date is present within a recurring schedule.
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
 *
 * dateInApointment(
 *     toDate('2000/01/01'),
 *     toDate('2025/07/03'),
 *     PERIODS.SEMESTER,
 *     1,
 *     PERIODS.DAY,
 *     1
 * ) // returns false because the date 2025/07/03 is not included in a timeline for each semester from the date 2000/01/01 and the margin of error is only 1 day
 *
 * dateInApointment(
 *     toDate('2000/01/01'),
 *     toDate('2025/07/02'),
 *     PERIODS.SEMESTER,
 *     1,
 *     PERIODS.DAY,
 *     1
 * ) // returns true because although the date 2025/07/02 is not included in a timeline for each semester from the date 2000/01/01, the margin of error has been set to 1 day
 */
function dateInApointment(date, target, period, duration, marginErrorPeriod, marginErrorDuration) {
    if (marginErrorPeriod === void 0) { marginErrorPeriod = exports.PERIODS.MILLISECOND; }
    if (marginErrorDuration === void 0) { marginErrorDuration = 0; }
    if (!(date instanceof Date) && typeof date !== 'string')
        throw new Error('date not is Date or string');
    if (!(target instanceof Date) && typeof target !== 'string')
        throw new Error('target not is Date or string');
    if (typeof period !== 'string' && typeof period !== 'number')
        throw new Error('period not is string or number');
    if (typeof duration !== 'number')
        throw new Error('date not is number');
    if (typeof marginErrorPeriod !== 'string' && typeof marginErrorPeriod !== 'number')
        throw new Error('marginErrorPeriod not is string or number');
    if (typeof marginErrorDuration !== 'number')
        throw new Error('marginErrorDuration not is number');
    if (typeof date === 'string' && isISODate(date)) {
        date = new Date(date);
    }
    else if (typeof date === 'string')
        throw new Error('date not is Date or string in ISO format');
    if (typeof target === 'string' && isISODate(target)) {
        target = new Date(target);
    }
    else if (typeof target === 'string')
        throw new Error('target not is Date or string in ISO format');
    var dateIt = date;
    var timeTarget = target.getTime();
    while (dateIt.getTime() <= target.getTime()) {
        var dateEndMargin = plus(dateIt, marginErrorPeriod, marginErrorDuration);
        var timeBegin = dateIt.getTime();
        var timeEnd = dateEndMargin.getTime();
        if (timeTarget >= timeBegin && timeTarget <= timeEnd)
            return true;
        dateIt = plus(dateIt, period, duration);
    }
    return false;
}
exports.dateInApointment = dateInApointment;
/**
 * Returns string with special regular expression characters with escape
 * @param {string} str - string to have its special RegExp characters with escape
 * @returns {string} string with special regular expression characters with escape
 *
 * @example
 * scape('ab.*+?^${c}()|d[]\\ef') // ab\.\*\+\?\^\$\{c\}\(\)\|d\[\]\\ef
 */
function scape(str) {
    if (typeof str !== 'string')
        return null;
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
exports.scape = scape;
