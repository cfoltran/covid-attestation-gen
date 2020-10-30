/* eslint-disable prefer-const */
export const requiredLocales = (value, context, returnArray = false) => {
  let invalid = []
  context.locales.forEach((locale) => {
    const localeValue = value[locale]
    if (typeof localeValue === 'undefined' || localeValue === '') {
      invalid.push(locale)
    }
  })

  return returnArray ? invalid : invalid.length === 0
}
