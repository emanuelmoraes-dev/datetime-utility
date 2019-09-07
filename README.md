# datetime-utility

Simple tools for date manipulation in Javascript or TypeScript

## Install

```sh
npm install datetime-utility --save
```

## PERIODS

* MILLISECOND
* SECOND
* MINUTE
* HOUR
* DAY
* WEEK
* MONTH
* TWO_MONTHS
* QUARTER
* SEMESTER
* YEAR

## toDate(str : String, pattern : String)

Returns a date based on a string with a given pattern

### parameters

* str: String to convert to date

* pattern: String containing date mask (default value 'yyyy/MM/dd hh:mm:ss.l')

Pattern | Description
------- | ------------------------------------------
dd      | day of the month containing two characters
d       | day of the month
MM      | month of the year (minimum 1) containing two characters
M       | month of the year
yyyy    | full year containing four characters
y       | full year
hh      | hours of day with two characters
h       | hours of day
mm      | minutes of hour with two characters
m       | minutes of hour
ss      | seconds of minute with two characters
s       | seconds of minute
l       | millisecond of second


### examples

```js
toDate('10/06/2019 21:13', 'dd/MM/yyyy hh:mm') // returns Date
toDate('10/6/2019 21:13', 'd/M/yyyy hh:mm') // returns Date
toDate('10/6/2019 21:13', 'dd/MM/yyyy hh:mm') // returns null, month invalid
```

## dateToStr(date : Date|String, pattern : String)

Converts a date to a string in the format described in the pattern

### parameters

* date: date (or string in ISO format) to convert to string

* pattern: date format (default value: 'yyyy/MM/dd')

Pattern | Description
------- | ------------------------------------------
dd      | day of the month containing two characters
d       | day of the month
MM      | month of the year (minimum 1) containing two characters
M       | month of the year
yyyy    | full year containing four characters
yy      | year containing the last two digits
y       | full year
hh      | hours of day with two characters
h       | hours of day
mm      | minutes of hour with two characters
m       | minutes of hour
ss      | seconds of minute with two characters
s       | seconds of minute
l       | millisecond of second

### examples

```js
dateToStr(
    toDate('10/06/2019 21:13', 'dd/MM/yyyy hh:mm'),
    'dd/MM/yyyy hh:mm'
) // 10/06/2019 21:13

dateToStr(
    toDate('10/6/2019 21:13', 'd/M/yyyy hh:mm'),
    'd/M/yyyy hh:mm'
) // 10/6/2019 21:13

dateToStr(
    null,
    'dd/MM/yyyy hh:mm'
) // null
```

## getMinPattern(strDate: String, pattern: String)

Returns the minimum pattern  (strictly necessary) of a given formatted string representing a date

### parameters

* strDate: date in string format
* pattern: 'strDate' parameter date format

Pattern | Description
------- | ------------------------------------------
dd      | day of the month containing two characters
d       | day of the month
MM      | month of the year (minimum 1) containing two characters
M       | month of the year
yyyy    | full year containing four characters
yy      | year containing the last two digits
y       | full year
hh      | hours of day with two characters
h       | hours of day
mm      | minutes of hour with two characters
m       | minutes of hour
ss      | seconds of minute with two characters
s       | seconds of minute
l       | millisecond of second

### examples

```js
let date = toDate('10/06/2019 21:13', 'dd/MM/yyyy hh:mm:ss.l')
let minPattern = getMinPattern('10/06/2019 21:13', 'dd/MM/yyyy hh:mm:ss.l') // dd/MM/yyyy hh:mm
date = plus(date, PERIODS.YEAR, 1)
dateToStr(date, minPattern) // 10/06/2020 21:13

date = toDate('10/06/2019 21:13:00.000', 'dd/MM/yyyy hh:mm')
minPattern = getMinPattern('10/06/2019 21:13:00.000', 'dd/MM/yyyy hh:mm') // dd/MM/yyyy hh:mm
date = plus(date, PERIODS.YEAR, 1)
dateToStr(date, minPattern) // 10/06/2020 21:13

getMinPattern(
    null,
    'dd/MM/yyyy hh:mm:ss.l'
) // null
```

## plus(date: Date|String, period: String|Number, duration : Number)

Adds a value of a time period on a date

### parameters

* date: date (or string in ISO format) to be increased by a period of time

* period: textual or numeric representation (stored in 'PERIODS') of a period of time to be added to the date

* duration: unit of time to be added to the date

### examples

```js
plus(
    toDate('10/06/2019 21:13', 'dd/MM/yyyy hh:mm'),
    PERIODS.DAY,
    -1
) // date with one day less

plus(
    toDate('10/06/2019 21:13', 'dd/MM/yyyy hh:mm'),
    PERIODS.YEAR,
    1
) // date with one year more
```

## dateEquals(date1 : Date|String, date2 : Date|String, ignore : Number)

Returns true if both dates are equal, ignoring certain **lower** values

### parameters

* date1: first date (or string in ISO format) of comparison

* date2: second date (or string in ISO format) of comparison

* ignore: position from which the **lowest** values will be ignored (if not informed, nothing is ignored.)

ignore  | ignored values
------- | -----------------------------------------------------
default | nothing ignored
7       | nothing ignored
6       | millisecond
5       | millisecond and second
4       | millisecond, second and minute
3       | millisecond, second, minute and hour
2       | millisecond, second, minute, hour and day
1       | millisecond, second, minute, hour, day and month
0       | ignoring everything, that is, the dates are the same

### examples

```js
dateEquals(
    toDate('2019/06/10 10:30'),
    toDate('2019/06/10 10:30')
) // true

dateEquals(
    // default pattern: 'yyyy/MM/dd hh:mm:ss.l'
    toDate('2019/06/10 10:30'),
    toDate('2019/06/10 02:13')
) // false

// ignoring millisecond, second, minute, hour and day
dateEquals(
    // default pattern: 'yyyy/MM/dd hh:mm:ss.l'
    toDate('2019/06/10 10:30'),
    toDate('2019/06/10 02:13'),
    2
) // true

// ignoring millisecond, second, minute and hour
dateEquals(
    // default pattern: 'yyyy/MM/dd hh:mm:ss.l'
    toDate('2019/06/10 10:30'),
    toDate('2019/06/10 02:13'),
    3
) // true

// ignoring millisecond, second and minute
dateEquals(
    // default pattern: 'yyyy/MM/dd hh:mm:ss.l'
    toDate('2019/06/10 10:30'),
    toDate('2019/06/10 02:13'),
    4
) // false
```

## dateEqualsReverse(date1 : Date|String, date2 : Date|String, ignore : Number)

Returns true if both dates are equal, ignoring certain **higher** values

### parameters

* date1: first date (or string in ISO format) of comparison

* date2: second date (or string in ISO format) of comparison

* ignore: position from which the **highest** values will be ignored (if not informed, nothing will be ignored).

ignore  | ignored values
------- | -----------------------------------------------------
default | nothing ignored
7       | nothing ignored
6       | year
5       | year and month
4       | year, month and day
3       | year, month, day and hour
2       | year, month, day, hour and minute
1       | year, month, day, hour, minute and second
0       | ignoring everything, that is, the dates are the same

### examples

```js
dateEqualsReverse(
    // default pattern: 'yyyy/MM/dd hh:mm:ss.l'
    toDate('2019/10/06 10:40'), 
    toDate('2019/10/06 10:40')
) // true

dateEqualsReverse(
    toDate('2019/10/06 10:40'),
    toDate('2019/12/06 10:40')
) // false

// ignoring year, month and day
dateEqualsReverse(
    // default pattern: 'yyyy/MM/dd hh:mm:ss.l'
    toDate('2019/10/06 10:40'),
    toDate('2019/12/06 10:40'),
    4
) // true

// ignoring year and month
dateEqualsReverse(
    // default pattern: 'yyyy/MM/dd hh:mm:ss.l'
    toDate('2019/10/06 10:40'),
    toDate('2019/12/06 10:40'),
    5
) // true

// ignoring year
dateEqualsReverse(
    // default pattern: 'yyyy/MM/dd hh:mm:ss.l'
    toDate('2019/10/06 10:40'),
    toDate('2019/12/06 10:40'),
    6
) // false
```

## getDateIgnore(date : Date|String, ignore : Number)

Gets date ignoring **lower** values

### parameters

* date: date (or string in ISO format) that will have higher values ignored

* ignore: position from which the **lowest** values will be ignored (if not informed, nothing is ignored.)

ignore  | ignored values
------- | -----------------------------------------------------
default | nothing ignored
7       | nothing ignored
6       | millisecond
5       | millisecond and second
4       | millisecond, second and minute
3       | millisecond, second, minute and hour
2       | millisecond, second, minute, hour and day
1       | millisecond, second, minute, hour, day and month
0       | ignoring everything

### examples

```js
getDateIgnore(
    // default pattern: 'yyyy/MM/dd hh:mm:ss.l'
    toDate('2019/06/10 10:30'),
    3
) // Date only with year, month and day

getDateIgnore(
    // default pattern: 'yyyy/MM/dd hh:mm:ss.l'
    toDate('2019/06/10 10:30'),
    4
) // Date only with year, month, day and hour

getDateIgnore(
    // default pattern: 'yyyy/MM/dd hh:mm:ss.l'
    toDate('2019/06/10 10:30'),
    7
) // gets exactly the same date
```

## getDateIgnoreReverse(date : Date|String, ignore : Number)

Gets date ignoring **high** values

### parameters

* date: date (or string in ISO format) that will have higher values ignored

* ignore: position from which the **highest** values will be ignored (if not informed, nothing will be ignored).

ignore  | ignored values
------- | -----------------------------------------------------
default | nothing ignored
7       | nothing ignored
6       | year
5       | year and month
4       | year, month and day
3       | year, month, day and hour
2       | year, month, day, hour and minute
1       | year, month, day, hour, minute and second
0       | ignoring everything, that is, the dates are the same

### examples

```js
getDateIgnoreReverse(
    // default pattern: 'yyyy/MM/dd hh:mm:ss.l'
    toDate('2019/06/10 10:30'),
    4
) // Date only with hour, minute, second and millisecond

getDateIgnoreReverse(
    // default pattern: 'yyyy/MM/dd hh:mm:ss.l'
    toDate('2019/06/10 10:30'),
    5
) // Date only with day, hour, minute, second and millisecond

getDateIgnoreReverse(
    // default pattern: 'yyyy/MM/dd hh:mm:ss.l'
    toDate('2019/06/10 10:30'),
    7
) // gets exactly the same date
```

## formatTime(time : Number, ...args : Number)

Gets values from a time

### parameters

* time: milliseconds obtained by the getTime() function
* ...args: types of values to be extracted and placed in an array

### examples

```js
formatTime(
    200100,
    PERIODS.MINUTE, 
    PERIODS.SECOND
) // [<amount of minutes in 200100 milliseconds>, <number of seconds remaining>]
```

### Attention!

The MONTH, TWO_MONTHS, SEMESTER, QUARTER, and YEAR variables can **not** be used in formatTime.

## dateInApointment(date : Date | String, target : Date|String, period : String|Number, duration : Number)

Returns true if the date is present within a recurring schedule.

### parameters

* date: first scheduling date (or string in ISO format)

* target: check to see if you are on scheduling.

* period: textual or numeric representation (stored in 'PERIODS') of a time period of the schedule

* duration: unit to include new periodic dates in schedule

### examples

```js
dateInApointment(
    toDate('2000/01/02'),
    toDate('2025/07/02'),
    PERIODS.SEMESTER,
    1
) // returns true because the date 2025/07/02 is included in a timeline for each semester from the date of 2000/01/02

dateInApointment(
    toDate('2000/01/02'),
    toDate('2025/07/02'),
    PERIODS.SEMESTER,
    2
) // returns false because the date 2025/07/02 is not included in a timeline for each two semester from the date of 2000/01/02
```

## scape(str : String)

Returns string with special regular expression characters with escape

### parameters

* str: string to have its special RegExp characters with escape

### example

```js
scape('ab.*+?^${c}()|d[]\\ef') // ab\.\*\+\?\^\$\{c\}\(\)\|d\[\]\\ef
```