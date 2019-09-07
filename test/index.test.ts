import { toDate, dateToStr, plus, PERIODS, dateEquals, dateEqualsReverse, getDateIgnore, getDateIgnoreReverse, formatTime, dateInApointment, scape, getMinPattern } from '../src'

test("toDate('')", async () => {
    expect(
        toDate('')
    ).toBe(
        null
    )
})

test("toDate('2019', null)", async () => {
    expect(
        toDate('2019', null)
    ).toBe(
        null
    )
})

test("toDate('10/06/2019 21:13', 'dd/MM/yyyy hh:mm')", async () => {
    expect(
        toDate('10/06/2019 21:13', 'dd/MM/yyyy hh:mm').toISOString()
    ).toBe(
        new Date(2019, 5, 10, 21, 13).toISOString()
    )
})

test("toDate('10/6/2019 21:13', 'd/M/yyyy hh:mm')", async () => {
    expect(
        toDate('10/6/2019 21:13', 'd/M/yyyy hh:mm').toISOString()
    ).toBe(
        new Date(2019, 5, 10, 21, 13).toISOString()
    )
})

test("toDate('10/6/2019 21:13', 'dd/MM/yyyy hh:mm')", async () => {
    expect(
        toDate('10/6/2019 21:13', 'dd/MM/yyyy hh:mm')
    ).toBe(
        null
    )
})

test("dateToStr(toDate('10/06/2019 21:13', 'dd/MM/yyyy hh:mm'), 'dd/MM/yyyy hh:mm')", async () => {
    expect(
        dateToStr(
            toDate('10/06/2019 21:13', 'dd/MM/yyyy hh:mm'),
            'dd/MM/yyyy hh:mm'
        )
    ).toBe(
        '10/06/2019 21:13'
    )
})

test("dateToStr(toDate('10/6/2019 21:13', 'd/M/yyyy hh:mm'), 'd/M/yyyy hh:mm')", async () => {
    expect(
        dateToStr(
            toDate('10/6/2019 21:13', 'd/M/yyyy hh:mm'),
            'd/M/yyyy hh:mm'
        )
    ).toBe(
        '10/6/2019 21:13'
    )
})

test("dateToStr(null, 'dd/MM/yyyy hh:mm')", async () => {
    expect(
        dateToStr(
            null,
            'dd/MM/yyyy hh:mm'
        )
    ).toBe(
        null
    )
})

test("getMinPattern('10/06/2019 21:13', 'dd/MM/yyyy hh:mm:ss.l')", async () => {
    let date = toDate('10/06/2019 21:13', 'dd/MM/yyyy hh:mm:ss.l')

    let minPattern = getMinPattern('10/06/2019 21:13', 'dd/MM/yyyy hh:mm:ss.l')
    expect(minPattern).toBe('dd/MM/yyyy hh:mm')

    date = plus(date, PERIODS.YEAR, 1)
    
    expect(
        dateToStr(date, minPattern)
    ).toBe(
        '10/06/2020 21:13'
    )
})

test("getMinPattern(null, 'dd/MM/yyyy hh:mm:ss.l')", async () => {
    expect(
        getMinPattern(
            null,
            'dd/MM/yyyy hh:mm:ss.l'
        )
    ).toBe(
        null
    )
})

test("plus(toDate('10/06/2019 21:13', 'dd/MM/yyyy hh:mm'), PERIODS.DAY, -1)", async () => {
    expect(
        plus(
            toDate('10/06/2019 21:13', 'dd/MM/yyyy hh:mm'),
            PERIODS.DAY,
            -1
        ).toISOString()
    ).toBe(
        new Date(2019, 5, 9, 21, 13).toISOString()
    )
})

test("plus(toDate('10/06/2019 21:13', 'dd/MM/yyyy hh:mm'), PERIODS.YEAR, 1)", async () => {
    expect(
        plus(
            toDate('10/06/2019 21:13', 'dd/MM/yyyy hh:mm'),
            PERIODS.YEAR,
            1
        ).toISOString()
    ).toBe(
        new Date(2020, 5, 10, 21, 13).toISOString()
    )
})

test("dateEquals(toDate('2019/06/10 10:30'), toDate('2019/06/10 10:30'))", async () => {
    expect(
        dateEquals(
            toDate('2019/06/10 10:30'),
            toDate('2019/06/10 10:30')
        )
    ).toBe(true)
})

test("dateEquals(toDate('2019/06/10 10:30'), toDate('2019/06/10 02:13'))", async () => {
    expect(
        dateEquals(
            toDate('2019/06/10 10:30'),
            toDate('2019/06/10 02:13')
        )
    ).toBe(
        false
    )
})

test("dateEquals(toDate('2019/06/10 10:30'), toDate('2019/06/10 02:13'), 2)", async () => {
    expect(
        dateEquals(
            toDate('2019/06/10 10:30'),
            toDate('2019/06/10 02:13'),
            2
        )
    ).toBe(
        true
    )
})

test("dateEquals(toDate('2019/06/10 10:30'), toDate('2019/06/10 02:13'), 3)", async () => {
    expect(
        dateEquals(
            toDate('2019/06/10 10:30'),
            toDate('2019/06/10 02:13'),
            3
        )
    ).toBe(
        true
    )
})

test("dateEquals(toDate('2019/06/10 10:30'), toDate('2019/06/10 02:13'), 4)", async () => {
    expect(
        dateEquals(
            toDate('2019/06/10 10:30'),
            toDate('2019/06/10 02:13'),
            4
        )
    ).toBe(
        false
    )
})

test("dateEqualsReverse(toDate('2019/10/06 10:40'),  toDate('2019/10/06 10:40'))", async () => {
    expect(
        dateEqualsReverse(
            // default pattern: 'yyyy/MM/dd hh:mm:ss.l'
            toDate('2019/10/06 10:40'), 
            toDate('2019/10/06 10:40')
        )
    ).toBe(
        true
    )
})

test("dateEqualsReverse(toDate('2019/10/06 10:40'),  toDate('2019/12/06 10:40'))", async () => {
    expect(
        dateEqualsReverse(
            // default pattern: 'yyyy/MM/dd hh:mm:ss.l'
            toDate('2019/10/06 10:40'), 
            toDate('2019/12/06 10:40')
        )
    ).toBe(
        false
    )
})

test("dateEqualsReverse(toDate('2019/10/06 10:40'),  toDate('2019/12/06 10:40'), 4)", async () => {
    expect(
        dateEqualsReverse(
            // default pattern: 'yyyy/MM/dd hh:mm:ss.l'
            toDate('2019/10/06 10:40'), 
            toDate('2019/12/06 10:40'),
            4
        )
    ).toBe(
        true
    )
})

test("dateEqualsReverse(toDate('2019/10/06 10:40'),  toDate('2019/12/06 10:40'), 5)", async () => {
    expect(
        dateEqualsReverse(
            // default pattern: 'yyyy/MM/dd hh:mm:ss.l'
            toDate('2019/10/06 10:40'), 
            toDate('2019/12/06 10:40'),
            5
        )
    ).toBe(
        true
    )
})

test("dateEqualsReverse(toDate('2019/10/06 10:40'),  toDate('2019/12/06 10:40'), 6)", async () => {
    expect(
        dateEqualsReverse(
            // default pattern: 'yyyy/MM/dd hh:mm:ss.l'
            toDate('2019/10/06 10:40'), 
            toDate('2019/12/06 10:40'),
            6
        )
    ).toBe(
        false
    )
})

test("getDateIgnore(toDate('2019/06/10 10:30'), 3)", async () => {
    expect(
        getDateIgnore(
            // default pattern: 'yyyy/MM/dd hh:mm:ss.l'
            toDate('2019/06/10 10:30'),
            3
        ).toISOString()
    ).toBe(
        new Date(2019, 5, 10).toISOString()
    )
})

test("getDateIgnore(toDate('2019/06/10 10:30'), 3)", async () => {
    expect(
        getDateIgnore(
            // default pattern: 'yyyy/MM/dd hh:mm:ss.l'
            toDate('2019/06/10 10:30'),
            4
        ).toISOString()
    ).toBe(
        new Date(2019, 5, 10, 10).toISOString()
    )
})

test("getDateIgnore(toDate('2019/06/10 10:30'), 3)", async () => {
    expect(
        getDateIgnore(
            // default pattern: 'yyyy/MM/dd hh:mm:ss.l'
            toDate('2019/06/10 10:30'),
            7
        ).toISOString()
    ).toBe(
        new Date(2019, 5, 10, 10, 30).toISOString()
    )
})

test("getDateIgnoreReverse(toDate('2019/06/10 10:30'), 4)", async () => {
    expect(
        getDateIgnoreReverse(
            // default pattern: 'yyyy/MM/dd hh:mm:ss.l'
            toDate('2019/06/10 10:30'),
            4
        ).toISOString()
    ).toBe(
        new Date(0, 0, 1, 10, 30, 0, 0).toISOString()
    )
})

test("getDateIgnoreReverse(toDate('2019/06/10 10:30'), 5)", async () => {
    expect(
        getDateIgnoreReverse(
            // default pattern: 'yyyy/MM/dd hh:mm:ss.l'
            toDate('2019/06/10 10:30'),
            5
        ).toISOString()
    ).toBe(
        new Date(0, 0, 10, 10, 30, 0, 0).toISOString()
    )
})

test("getDateIgnoreReverse(toDate('2019/06/10 10:30'), 7)", async () => {
    expect(
        getDateIgnoreReverse(
            // default pattern: 'yyyy/MM/dd hh:mm:ss.l'
            toDate('2019/06/10 10:30'),
            7
        ).toISOString()
    ).toBe(
        new Date(2019, 5, 10, 10, 30, 0, 0).toISOString()
    )
})

test("formatTime(200000, PERIODS.MINUTE, PERIODS.SECOND)", async () => {
    expect(
        formatTime(
            200100,
            PERIODS.MINUTE, 
            PERIODS.SECOND
        )
    ).toEqual(
        [3, 20]
    )
})

test("dateInApointment(toDate('2000/01/02'), toDate('2025/07/02'), PERIODS.SEMESTER, 1)", async () => {
    expect(
        dateInApointment(
            toDate('2000/01/02'),
            toDate('2025/07/02'),
            PERIODS.SEMESTER,
            1
        )
    ).toBe(
        true
    )
})

test("dateInApointment(toDate('2000/01/02'), toDate('2025/07/02'), PERIODS.SEMESTER, 1)", async () => {
    expect(
        dateInApointment(
            toDate('2000/01/02'),
            toDate('2025/07/02'),
            PERIODS.SEMESTER,
            2
        )
    ).toBe(
        false
    )
})

test("scape('ab.*+?^${c}()|d[]\\\\ef')", async () => {
    expect(
        scape('ab.*+?^${c}()|d[]\\ef')
    ).toBe(
        'ab\\.\\*\\+\\?\\^\\$\\{c\\}\\(\\)\\|d\\[\\]\\\\ef'
    )
})