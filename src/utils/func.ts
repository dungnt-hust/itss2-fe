
import { formatUnits, parseUnits } from "ethers/lib/utils"
import moment from "moment"
import { SyntheticEvent } from "react"

export const openLink = (link: string) => {
  link && window.open(link, "_blank")
}

export const getLinkReferral = (code: any) => {
  return `${window?.location?.origin}/?referral=${code}`
}

export const formatTime = (value: any) => {
  if (!value) {
    return ""
  }
  let result = ""

  try {
    result = moment(value).format("HH:mm:ss")
  } catch (error) {}

  return result
}

export const formatAmountAnalytics = (value: any) => {
  try {
    if (value == null || value == undefined) {
      return ""
    } else if (+value === 0) {
      return 0
    }

    let valueStr = value + ""
    let result, matchValue

    if (value >= 1) {
      matchValue = valueStr.match(/^([0-9]*)\./)
      let numberBeforeDot = matchValue ? matchValue[0].length - 1 : 0

      if (numberBeforeDot < 6) {
        numberBeforeDot = 7
      }

      result = valueStr.substring(0, numberBeforeDot)
    } else {
      matchValue = valueStr.match(/(\.0*)/)
      let numberOfZeros = matchValue ? matchValue[0].length - 1 : 0
      result = valueStr.substring(0, numberOfZeros + 8)
    }

    return result
  } catch (error) {
    console.log("formatAmount", value)

    return value
  }
}

export const pushWithRef = (router: any, ref: any, pathname: any, params?: any) => {
  let query = {}

  if (ref) {
    query = {
      ref: ref || undefined,
    }
  }

  router.push({
    pathname,
    query: {
      ...query,
      ...params,
    },
  })
}

export const randomIntFromTo = (min: any, max: any, exclude?: any) => {
  // min and max included
  let ranNum = Math.floor(Math.random() * (max - min + 1) + min)

  if (ranNum === exclude && exclude) {
    ranNum = randomIntFromTo(min, max, exclude)
  }

  return ranNum
}

export const parseU256WithDecimals = (value: any, decimals: any) => {
  try {
    const result = formatUnits(value, decimals)

    return +result
  } catch (error) {
    return ""
  }
}




export function preventBubbling(callback?: ((...args: never[]) => unknown) | null, noPreventDefault?: boolean) {
  return (e: SyntheticEvent): void => {
    e.stopPropagation()

    if (!noPreventDefault) e.preventDefault()
    if (callback) callback()
  }
}


export const convertWalletAddress = (address: string) => {
  if (!address) return ""

  const targetLengthAddress = 66

  const prefixAddress = "0x"

  const addressSplited = address.split(prefixAddress)

  const suffixAddress = addressSplited[1]

  const zeroAddressStr = Array(targetLengthAddress - address.length)
    .fill(0)
    .reduce((prev, cur) => prev + "0", "")

  const result = `${prefixAddress}${zeroAddressStr}${suffixAddress}`

  return result
}

export const checkFirstLetterSpecial = (_string: string) => {
  const spCharsRegExp = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
  return spCharsRegExp.test(_string)
}

export const formatDateTimeToUTC = (value: any) => {
  if (value === null || value === undefined) {
    return ""
  }
  const locale = "en"

  return new Date(value).toLocaleString(locale, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  })
  // return new Date(value).toUTCString().slice(0, 16)
}
