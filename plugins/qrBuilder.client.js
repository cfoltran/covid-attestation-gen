import QRCode from 'qrcode'

// eslint-disable-next-line no-empty-pattern
export default ({}, inject) => {
  const generateQR = (text) => {
    const opts = {
      errorCorrectionLevel: 'M',
      type: 'image/png',
      quality: 0.92,
      margin: 1
    }
    return QRCode.toDataURL(text, opts)
  }
  inject('qrBuilder', { generateQR })
}
