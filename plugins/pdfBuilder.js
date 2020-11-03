import { PDFDocument, StandardFonts } from 'pdf-lib'

const ys = {
  travail: 578,
  achats: 533,
  sante: 477,
  famille: 435,
  handicap: 396,
  sport_animaux: 358,
  convocation: 295,
  missions: 255,
  enfants: 211
}

export default ({ app }, inject) => {
  const generate = async (profile, signature) => {
    const creationInstant = new Date()
    const creationDate = creationInstant.toLocaleDateString('fr-FR')
    const creationHour = creationInstant
      .toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      .replace(':', 'h')

    const {
      lastname,
      firstname,
      birthdate,
      birthplace,
      address,
      zipcode,
      city,
      reason
    } = profile

    const d = new Date()
    const ye = new Intl.DateTimeFormat('fr', { year: '2-digit' }).format(d)
    const mo = new Intl.DateTimeFormat('fr', { month: '2-digit' }).format(d)
    const da = new Intl.DateTimeFormat('fr', { day: '2-digit' }).format(d)
    const h = new Intl.DateTimeFormat('fr', { hour: '2-digit' }).format(d).replace(' h', ':')
    const m = new Intl.DateTimeFormat('fr', { minute: '2-digit' }).format(d)
    const date = `${da}/${mo}/${ye}`
    const hour = `${h}${m}`
    const data = [
      `Cree le: ${creationDate} a ${creationHour}`,
      `Nom: ${lastname}`,
      `Prenom: ${firstname}`,
      `Naissance: ${birthdate} a ${birthplace}`,
      `Adresse: ${address}`,
      `Sortie: ${date} a ${hour}`,
      `Motifs: ${reason}`
    ].join(';\n ')
    const existingPdfBytes = await fetch('certificate.pdf').then(res =>
      res.arrayBuffer()
    )
    const pdfDoc = await PDFDocument.load(existingPdfBytes)

    // set pdf metadata
    pdfDoc.setTitle('COVID-19 - Déclaration de déplacement')
    pdfDoc.setSubject('Attestation de déplacement dérogatoire')
    pdfDoc.setKeywords([
      'covid19',
      'covid-19',
      'attestation',
      'déclaration',
      'déplacement',
      'officielle',
      'gouvernement'
    ])
    pdfDoc.setProducer('DNUM/SDIT')
    pdfDoc.setCreator('')
    pdfDoc.setAuthor("Ministère de l'intérieur")
    const page1 = pdfDoc.getPages()[0]
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const drawText = (text, x, y, size = 11) => {
      page1.drawText(text, { x, y, size, font })
    }
    drawText(`${firstname} ${lastname}`, 119, 696)
    drawText(birthdate, 119, 674)
    drawText(birthplace, 297, 674)
    drawText(`${address} ${zipcode} ${city}`, 133, 652)

    // reason
    drawText('x', 78, ys[reason], 18)
    let locationSize = getIdealFontSize(font, city, 83, 7, 11)
    if (!locationSize) {
      locationSize = 7
    }
    drawText(city, 105, 177, locationSize)
    drawText(date, 91, 153, 11)
    drawText(hour, 264, 153, 11)

    // creation date
    drawText('Date de création:', 479, 130, 6)
    drawText(`${creationDate} à ${creationHour}`, 470, 124, 6)

    // add signature
    if (signature) {
      const pngImage = await pdfDoc.embedPng(signature)
      const pngDims = pngImage.scale(0.15)
      page1.drawImage(pngImage, {
        x: 140,
        y: 105,
        width: pngDims.width,
        height: pngDims.height
      })
    }
    const generatedQR = await app.$qrBuilder.generateQR(data)
    const qrImage = await pdfDoc.embedPng(generatedQR)
    page1.drawImage(qrImage, {
      x: page1.getWidth() - 156,
      y: 100,
      width: 92,
      height: 92
    })
    pdfDoc.addPage()
    const page2 = pdfDoc.getPages()[1]
    page2.drawImage(qrImage, {
      x: 50,
      y: page2.getHeight() - 350,
      width: 300,
      height: 300
    })
    const pdfBytes = await pdfDoc.save()
    return new Blob([pdfBytes], { type: 'application/pdf' })
  }

  const getIdealFontSize = (font, text, maxWidth, minSize, defaultSize) => {
    let currentSize = defaultSize
    let textWidth = font.widthOfTextAtSize(text, defaultSize)
    while (textWidth > maxWidth && currentSize > minSize) {
      textWidth = font.widthOfTextAtSize(text, --currentSize)
    }
    return textWidth > maxWidth ? null : currentSize
  }

  inject('pdfBuilder', { generate })
}
