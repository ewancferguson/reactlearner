export class Image {
  imgUrls: ImageUrls
  
  constructor(data: Image) {
    this.imgUrls = data.imgUrls
  
  }
}



export class ImageUrls {
  raw: string
  full: string
  regular: string
  small: string
  thumb: string

  constructor(data: ImageUrls) {
    this.raw = data.raw
    this.full = data.full
    this.regular = data.regular
    this.small = data.small
    this.thumb = data.thumb
  }
}