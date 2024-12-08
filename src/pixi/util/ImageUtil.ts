class ImageUtil {
  canvas: HTMLCanvasElement

  initCanvas() {
    if (this.canvas) return
    this.canvas = document.createElement('canvas')
    this.canvas.id = 'image-util-canvas'
  }

  fileToDataUri(file: File) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = () => resolve('')
      reader.readAsDataURL(file)
    })
  }

  async url2ImageData(url: string) {
    this.initCanvas()
    const canvas = this.canvas
    const ctx = canvas.getContext('2d')
    const img = await this.loadImage(url)
    if (!img) return null
    canvas.width = img.width
    canvas.height = img.height
    ctx.drawImage(img, 0, 0)
    const imageData = ctx.getImageData(0, 0, img.width, img.height)
    return imageData
  }

  async loadImage(url: string) {
    return new Promise<HTMLImageElement>(resolve => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = () => resolve(null)
      img.src = url
    })
  }
}

export const imageUtil = new ImageUtil()
