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
export declare function isISODate(str: string): boolean;
export declare const PERIODS: {
    MILLISECOND: number;
    SECOND: number;
    MINUTE: number;
    HOUR: number;
    DAY: number;
    WEEK: number;
    MONTH: string;
    TWO_MONTHS: string;
    QUARTER: string;
    SEMESTER: string;
    YEAR: string;
};
/**
 * Returns a date based on a string with a given pattern
 * @param {string} str - String to convert to date
 * @param {string=} pattern - String containing date mask (default value 'yyyy/MM/dd hh:mm:ss.S')
 * @param {boolean=} strict - if true, if the amount of characters for a value in "pattern" is not respected, the function returns null. Default value: true
 * @returns {Date} date based on a string with a given pattern
 *
 * @example
 * toDate('10/06/2019 21:13', 'dd/MM/yyyy hh:mm') // returns Date
 * toDate('10/6/2019 21:13', 'd/M/yyyy hh:mm') // returns Date
 * toDate('10/6/2019 21:13:49.5', 'd/M/yyyy hh:mm:ss.S') // returns Date
 * toDate('10/6/2019 21:13:49.5', 'd/M/yyyy hh:mm:ss.SS') // returns null, invalid millisecond
 * toDate('10/6/2019 21:13:49.5', 'd/M/yyyy hh:mm:ss.SS', false) // returns Date
 * toDate('10/6/2019 21:13:49.59', 'd/M/yyyy hh:mm:ss.SS') // returns Date
 * toDate('10/6/2019 21:13:49.593', 'd/M/yyyy hh:mm:ss.SS') // returns Date
 * toDate('10/6/2019 21:13:49.593', 'd/M/yyyy hh:mm:ss.SSS') // returns Date
 * toDate('10/6/2019 21:13:49.5', 'd/M/yyyy hh:mm:ss.SSS') // returns null, invalid millisecond
 * toDate('10/6/2019 21:13:49.5', 'd/M/yyyy hh:mm:ss.SSS', false) // returns Date
 * toDate('10/6/2019 21:13', 'dd/MM/yyyy hh:mm') // returns null, invalid month
 * toDate('10/6/2019 21:13', 'dd/MM/yyyy hh:mm', false) // returns Date
 */
export declare function toDate(str: string, pattern?: string, strict?: boolean): Date;
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
export declare function dateToStr(date: Date | string, pattern?: string): string;
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
export declare function getMinPattern(strDate: string, pattern: string): string;
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
export declare function plus(date: Date | string, period: string | number, duration: number): Date;
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
export declare function dateEquals(date1: Date | string, date2: Date | string, ignore?: number): boolean;
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
export declare function dateEqualsReverse(date1: Date | string, date2: Date | string, ignore?: number): boolean;
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
export declare function getDateIgnore(date: Date | string, ignore?: number): Date;
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
export declare function getDateIgnoreReverse(date: Date | string, ignore?: number): Date;
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
export declare function formatTime(time: number, ...args: number[]): number[];
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
export declare function dateInApointment(date: Date | string, target: Date | string, period: string | number, duration: number, marginErrorPeriod?: string | number, marginErrorDuration?: number): boolean;
/**
 * Returns string with special regular expression characters with escape
 * @param {string} str - string to have its special RegExp characters with escape
 * @returns {string} string with special regular expression characters with escape
 *
 * @example
 * scape('ab.*+?^${c}()|d[]\\ef') // ab\.\*\+\?\^\$\{c\}\(\)\|d\[\]\\ef
 */
export declare function scape(str: string): string;
