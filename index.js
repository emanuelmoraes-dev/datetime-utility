const isISODate = require('is-iso-date')

const PERIODS = {
  MILISSEGUNDO: 'milissegundo',
  SECOND: 'segundo',
  MINUTE: 'minuto',
  HOUR: 'hora',
  DAY: 'dia',
  WEEK: 'semana',
  MONTH: 'mes',
  TWO_MONTHS: 'bimestre',
  SEMESTER: 'semestre',
  QUARTER: 'trimestre',
  YEAR: 'ano'
}

function scape (str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function toDate (str, pattern='dd/MM/yyyy hh:mm:ss:ll') {
  str = str.trim()

  let expPattern = /yyyy|y|MM|M|dd|d|hh|h|mm|m|ss|s|l/g
  let seps = pattern.split(expPattern)

  let sepsScape = seps.filter(s => s).map(scape)
  let expSepsScape = new RegExp(sepsScape.join('|'), 'g')
  let mask = pattern.split(expSepsScape).filter(p => p)
  let values = str.split(expSepsScape).filter(p => p)

  let dateValues = {
    day: 0,
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
    dateValues.month-1,
    dateValues.day,
    dateValues.hour,
    dateValues.minute,
    dateValues.second,
    dateValues.millisecond
  )
}

function dateToStr (valor, pattern = 'dd/MM/yyyy') {
  pattern = pattern.trim()
  if (typeof (valor) === 'string' && isISODate(valor)) { valor = new Date(valor) }

  if (valor instanceof Date) {
    let dia = `${valor.getDate()}`
    let mes = `${valor.getMonth() + 1}`
    let hora = `${valor.getHours()}`
    let minuto = `${valor.getMinutes()}`
    let segundo = `${valor.getSeconds()}`
    let milissegundo = `${valor.getMilliseconds()}`
    let ano = `${valor.getFullYear()}`

    let values = {
      yyyy: ano,
      yy: ano.substring(2),
      y: ano,
      MM: mes.length === 1 ? `0${mes}` : mes,
      M: mes,
      dd: dia.length === 1 ? `0${dia}` : dia,
      d: dia,
      hh: hora.length === 1 ? `0${hora}` : hora,
      h: hora,
      mm: minuto.length === 1 ? `0${minuto}` : minuto,
      m: minuto,
      ss: segundo.length === 1 ? `0${segundo}` : segundo,
      s: segundo,
      l: milissegundo,
      '': ''
    }

    let expPattern = /yyyy|yy|y|MM|M|dd|d|hh|h|mm|m|ss|s|l/g
    let seps = pattern.split(expPattern)

    let sepsScape = seps.filter(s => s).map(scape)
    let mask = pattern.split(new RegExp(sepsScape.join('|'), 'g')).filter(p => p)

    return seps.reduce((anterior, atual, index) => {
      let m = mask[index]
      if (!m) m = ''
      return `${anterior}${atual}${values[m]}`
    }, '')
  }

  return valor
}

function plus (date, period, duration) {
  let [dia, mes, ano, hora, minuto, segundo, milissegundo] = [
    date.getDate(),
    date.getMonth(),
    date.getFullYear(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds()
  ]

  switch (period) {
    case PERIODS.MILISSEGUNDO: return new Date(ano, mes, dia, hora, minuto, segundo, milissegundo + duration)
    case PERIODS.SECOND: return new Date(ano, mes, dia, hora, minuto, segundo + duration, milissegundo)
    case PERIODS.MINUTE: return new Date(ano, mes, dia, hora, minuto + duration, segundo, milissegundo)
    case PERIODS.HOUR: return new Date(ano, mes, dia, hora + duration, minuto, segundo, milissegundo)
    case PERIODS.DAY: return new Date(ano, mes, dia + duration, hora, minuto, segundo, milissegundo)
    case PERIODS.WEEK: return new Date(ano, mes, dia + duration * 7, hora, minuto, segundo, milissegundo)
    case PERIODS.MONTH: return new Date(ano, mes + duration, dia, hora, minuto, segundo, milissegundo)
    case PERIODS.TWO_MONTHS: return new Date(ano, mes + duration * 2, dia, hora, minuto, segundo, milissegundo)
    case PERIODS.SEMESTER: return new Date(ano, mes + duration * 6, dia, hora, minuto, segundo, milissegundo)
    case PERIODS.QUARTER: return new Date(ano, mes + duration * 3, dia, hora, minuto, segundo, milissegundo)
    case PERIODS.YEAR: return new Date(ano + duration, mes, dia, hora, minuto, segundo, milissegundo)
    default:
      throw new Error(`Período ${period} inválido`)
  }
}

function dateEquals (date1, date2, ignore) {
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

  return values1.reduce((anterior, atual, index) => {
    if ((ignore === 0 || ignore) && ignore >= 0 && index >= ignore) { return anterior }
    if (!anterior) { return false }
    if (atual !== values2[index]) { return false }
    return true
  }, true)
}

function getDateIgnore (date, ignore) {
  let values = [
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds()
  ]

  let dateArray = values.reduce((anterior, atual, index) => {
    if ((ignore === 0 || ignore) && ignore >= 0 && index >= ignore) { return [...anterior, 0] }
    return [...anterior, atual]
  }, [])

  return new Date(...dateArray)
}

module.exports = {
    PERIODS,
    scape,
	toDate,
	dateToStr,
	plus,
	dateEquals,
	getDateIgnore
}
