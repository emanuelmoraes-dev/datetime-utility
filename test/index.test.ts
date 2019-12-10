import { toDate, dateToStr, plus, PERIODS, dateEquals, dateEqualsReverse, getDateIgnore, getDateIgnoreReverse, formatTime, dateInApointment, scape, getMinPattern, isISODate } from '../src'

describe("isISODate", () => {
    test("isISODate(1571178462085)", async () => {
        expect(
            isISODate(1571178462085 as any as string)
        ).toBe(
            false
        )
    })

    test("isISODate('2015-02-21T00:52:43.822Z')", async () => {
        expect(
            isISODate('2015-02-21T00:52:43.822Z')
        ).toBe(
            true
        )
    })

    test("isISODate('2015-02-21T00:52:43.822')", async () => {
        expect(
            isISODate('2015-02-21T00:52:43.822')
        ).toBe(
            false
        )
    })

    test("isISODate('2015-02-21T00:52:43Z')", async () => {
        expect(
            isISODate('2015-02-21T00:52:43Z')
        ).toBe(
            true
        )
    })

    test("isISODate('2015-02-21T00:52:43')", async () => {
        expect(
            isISODate('2015-02-21T00:52:43')
        ).toBe(
            false
        )
    })

    test("isISODate('2015-02-21T00:52Z')", async () => {
        expect(
            isISODate('2015-02-21T00:52Z')
        ).toBe(
            true
        )
    })

    test("isISODate('2015-02-21T00:52')", async () => {
        expect(
            isISODate('2015-02-21T00:52')
        ).toBe(
            false
        )
    })

    test("isISODate('2015-02-21T00Z')", async () => {
        expect(
            isISODate('2015-02-21T00Z')
        ).toBe(
            false
        )
    })
})

describe("toDate", () => {
    test("toDate('')", async () => {
        expect(
            toDate('')
        ).toBe(
            null
        )
    })

    test("toDate(1571178462085)", async () => {
        expect(
            toDate(1571178462085 as any as string)
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

    test("toDate('10/6/2019 21:13', 'dd/MM/yyyy hh:mm', false)", async () => {
        expect(
            toDate('10/6/2019 21:13', 'dd/MM/yyyy hh:mm', false).toISOString()
        ).toBe(
            new Date(2019, 5, 10, 21, 13).toISOString()
        )
    })

    test("toDate('10/6/2019 21:13:49.5', 'd/M/yyyy hh:mm:ss.S')", async () => {
        expect(
            toDate('10/6/2019 21:13:49.5', 'd/M/yyyy hh:mm:ss.S').toISOString()
        ).toBe(
            new Date(2019, 5, 10, 21, 13, 49, 5).toISOString()
        )
    })

    test("toDate('10/6/2019 21:13:49.5', 'd/M/yyyy hh:mm:ss.SS')", async () => {
        expect(
            toDate('10/6/2019 21:13:49.5', 'd/M/yyyy hh:mm:ss.SS')
        ).toBe(
            null
        )
    })

    test("toDate('10/6/2019 21:13:49.5', 'd/M/yyyy hh:mm:ss.SS', false)", async () => {
        expect(
            toDate('10/6/2019 21:13:49.5', 'd/M/yyyy hh:mm:ss.SS', false).toISOString()
        ).toBe(
            new Date(2019, 5, 10, 21, 13, 49, 5).toISOString()
        )
    })

    test("toDate('10/6/2019 21:13:49.59', 'd/M/yyyy hh:mm:ss.SS')", async () => {
        expect(
            toDate('10/6/2019 21:13:49.59', 'd/M/yyyy hh:mm:ss.SS').toISOString()
        ).toBe(
            new Date(2019, 5, 10, 21, 13, 49, 59).toISOString()
        )
    })

    test("toDate('10/6/2019 21:13:49.593', 'd/M/yyyy hh:mm:ss.SS')", async () => {
        expect(
            toDate('10/6/2019 21:13:49.593', 'd/M/yyyy hh:mm:ss.SS').toISOString()
        ).toBe(
            new Date(2019, 5, 10, 21, 13, 49, 593).toISOString()
        )
    })

    test("toDate('10/6/2019 21:13:49.593', 'd/M/yyyy hh:mm:ss.SSS')", async () => {
        expect(
            toDate('10/6/2019 21:13:49.593', 'd/M/yyyy hh:mm:ss.SSS').toISOString()
        ).toBe(
            new Date(2019, 5, 10, 21, 13, 49, 593).toISOString()
        )
    })

    test("toDate('10/6/2019 21:13:49.5', 'd/M/yyyy hh:mm:ss.SSS')", async () => {
        expect(
            toDate('10/6/2019 21:13:49.5', 'd/M/yyyy hh:mm:ss.SSS')
        ).toBe(
            null
        )
    })

    test("toDate('10/6/2019 21:13:49.5', 'd/M/yyyy hh:mm:ss.SSS', false)", async () => {
        expect(
            toDate('10/6/2019 21:13:49.5', 'd/M/yyyy hh:mm:ss.SSS', false).toISOString()
        ).toBe(
            new Date(2019, 5, 10, 21, 13, 49, 5).toISOString()
        )
    })
})

describe("dateToStr", () => {
    test("dateToStr(toDate('10/06/2019 21:13', 'dd/MM/yyyy hh:mm'), 'dd/MM/yyyy hh:mm')", async () => {
        expect(
            dateToStr(
                toDate('10/06/2019 21:13', 'dd/MM/yyyy hh:mm').toISOString(),
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

    test("dateToStr(toDate('10/6/2019 21:13', 'd/M/yyyy hh:mm'), 'd/M/yy hh:mm')", async () => {
        expect(
            dateToStr(
                toDate('10/6/2019 21:13', 'd/M/yyyy hh:mm').toISOString(),
                'd/M/yy hh:mm'
            )
        ).toBe(
            '10/6/19 21:13'
        )
    })

    test("dateToStr(toDate('10/6/2019 21:13:26.2', 'd/M/yyyy hh:mm:ss.S'), 'd/M/yyyy hh:mm:ss.SSS')", async () => {
        expect(
            dateToStr(
                toDate('10/6/2019 21:13:26.2', 'd/M/yyyy hh:mm:ss.S'),
                'd/M/yyyy hh:mm:ss.SSS'
            )
        ).toBe(
            '10/6/2019 21:13:26.002'
        )
    })

    test("dateToStr(toDate('10/6/2019 21:13:26.2', 'd/M/yyyy hh:mm:ss.S'), 'd/M/yyyy hh:mm:ss.SS')", async () => {
        expect(
            dateToStr(
                toDate('10/6/2019 21:13:26.2', 'd/M/yyyy hh:mm:ss.S').toISOString(),
                'd/M/yyyy hh:mm:ss.SS'
            )
        ).toBe(
            '10/6/2019 21:13:26.02'
        )
    })

    test("dateToStr(toDate('10/6/2019 21:13:26.2', 'd/M/yyyy hh:mm:ss.S'), 'd/M/yyyy hh:mm:ss.S')", async () => {
        expect(
            dateToStr(
                toDate('10/6/2019 21:13:26.2', 'd/M/yyyy hh:mm:ss.S'),
                'd/M/yyyy hh:mm:ss.S'
            )
        ).toBe(
            '10/6/2019 21:13:26.2'
        )
    })

    test("dateToStr(toDate('10/6/2019 21:13:26.273', 'd/M/yyyy hh:mm:ss.S'), 'd/M/yyyy hh:mm:ss.SS')", async () => {
        expect(
            dateToStr(
                toDate('10/6/2019 21:13:26.273', 'd/M/yyyy hh:mm:ss.S').toISOString(),
                'd/M/yyyy hh:mm:ss.SS'
            )
        ).toBe(
            '10/6/2019 21:13:26.27'
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

    test("dateToStr(1571178462085, 'dd/MM/yyyy hh:mm')", async () => {
        expect(
            dateToStr(
                1571178462085 as any as string,
                'dd/MM/yyyy hh:mm'
            )
        ).toBe(
            null
        )
    })

    test("dateToStr('1571178462085', 'dd/MM/yyyy hh:mm')", async () => {
        expect(
            dateToStr(
                '1571178462085',
                'dd/MM/yyyy hh:mm'
            )
        ).toBe(
            null
        )
    })
})

describe("getMinPattern", () => {
    test("getMinPattern('10/06/2019 21:13', 'dd/MM/yyyy hh:mm:ss.S')", async () => {
        let date = toDate('10/06/2019 21:13', 'dd/MM/yyyy hh:mm:ss.S')
    
        let minPattern = getMinPattern('10/06/2019 21:13', 'dd/MM/yyyy hh:mm:ss.S')
        expect(minPattern).toBe('dd/MM/yyyy hh:mm')
    
        date = plus(date, PERIODS.YEAR, 1)
        
        expect(
            dateToStr(date, minPattern)
        ).toBe(
            '10/06/2020 21:13'
        )
    })
    
    test("getMinPattern(null, 'dd/MM/yyyy hh:mm:ss.S')", async () => {
        expect(
            getMinPattern(
                null,
                'dd/MM/yyyy hh:mm:ss.S'
            )
        ).toBe(
            null
        )
    })
    
    test("getMinPattern('10/06/2019 21:13:00.000', 'dd/MM/yyyy hh:mm')", async () => {
        let date = toDate('10/06/2019 21:13:00.000', 'dd/MM/yyyy hh:mm')
    
        let minPattern = getMinPattern('10/06/2019 21:13:00.000', 'dd/MM/yyyy hh:mm')
        expect(minPattern).toBe('dd/MM/yyyy hh:mm')
    
        date = plus(date, PERIODS.YEAR, 1)
        
        expect(
            dateToStr(date, minPattern)
        ).toBe(
            '10/06/2020 21:13'
        )
    })
})

describe("plus", () => {
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
})

describe("dateEquals", () => {
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
})

describe("dateEqualsReverse", () => {
    test("dateEqualsReverse(toDate('2019/10/06 10:40'),  toDate('2019/10/06 10:40'))", async () => {
        expect(
            dateEqualsReverse(
                // default pattern: 'yyyy/MM/dd hh:mm:ss.S'
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
                // default pattern: 'yyyy/MM/dd hh:mm:ss.S'
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
                // default pattern: 'yyyy/MM/dd hh:mm:ss.S'
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
                // default pattern: 'yyyy/MM/dd hh:mm:ss.S'
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
                // default pattern: 'yyyy/MM/dd hh:mm:ss.S'
                toDate('2019/10/06 10:40'), 
                toDate('2019/12/06 10:40'),
                6
            )
        ).toBe(
            false
        )
    })
})

describe("getDateIgnore", () => {
    test("getDateIgnore(toDate('2019/06/10 10:30'), 3)", async () => {
        expect(
            getDateIgnore(
                // default pattern: 'yyyy/MM/dd hh:mm:ss.S'
                toDate('2019/06/10 10:30'),
                3
            ).toISOString()
        ).toBe(
            new Date(2019, 5, 10).toISOString()
        )
    })
    
    test("getDateIgnore(toDate('2019/06/10 10:30'), 4)", async () => {
        expect(
            getDateIgnore(
                // default pattern: 'yyyy/MM/dd hh:mm:ss.S'
                toDate('2019/06/10 10:30'),
                4
            ).toISOString()
        ).toBe(
            new Date(2019, 5, 10, 10).toISOString()
        )
    })
    
    test("getDateIgnore(toDate('2019/06/10 10:30'), 7)", async () => {
        expect(
            getDateIgnore(
                // default pattern: 'yyyy/MM/dd hh:mm:ss.S'
                toDate('2019/06/10 10:30'),
                7
            ).toISOString()
        ).toBe(
            new Date(2019, 5, 10, 10, 30).toISOString()
        )
    })
})

describe("getDateIgnoreReverse", () => {
    test("getDateIgnoreReverse(toDate('2019/06/10 10:30'), 4)", async () => {
        expect(
            getDateIgnoreReverse(
                // default pattern: 'yyyy/MM/dd hh:mm:ss.S'
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
                // default pattern: 'yyyy/MM/dd hh:mm:ss.S'
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
                // default pattern: 'yyyy/MM/dd hh:mm:ss.S'
                toDate('2019/06/10 10:30'),
                7
            ).toISOString()
        ).toBe(
            new Date(2019, 5, 10, 10, 30, 0, 0).toISOString()
        )
    })
})

describe("formatTime", () => {
    test("formatTime(200100, PERIODS.MINUTE, PERIODS.SECOND)", async () => {
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
})

describe("dateInApointment", () => {
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
    
    test("dateInApointment(toDate('2000/01/02'), toDate('2025/07/02'), PERIODS.SEMESTER, 2)", async () => {
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

    test("dateInApointment(toDate('2000/01/01'), toDate('2025/07/03'), PERIODS.SEMESTER, 1, PERIODS.DAY, 1)", async () => {
        expect(
            dateInApointment(
                toDate('2000/01/01'),
                toDate('2025/07/03'),
                PERIODS.SEMESTER,
                1,
                PERIODS.DAY,
                1
            )
        ).toBe(
            false
        )
    })

    test("dateInApointment(toDate('2000/01/01'), toDate('2025/07/02'), PERIODS.SEMESTER, 1, PERIODS.DAY, 1)", async () => {
        expect(
            dateInApointment(
                toDate('2000/01/01'),
                toDate('2025/07/02'),
                PERIODS.SEMESTER,
                1,
                PERIODS.DAY,
                1
            )
        ).toBe(
            true
        )
    })
})

describe("scape", () => {
    test("scape('ab.*+?^${c}()|d[]\\\\ef')", async () => {
        expect(
            scape('ab.*+?^${c}()|d[]\\ef/')
        ).toBe(
            'ab\\.\\*\\+\\?\\^\\$\\{c\\}\\(\\)\\|d\\[\\]\\\\ef\\/'
        )
    })
})