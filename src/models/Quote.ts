export class Quote {
  author: string
  quote: string
  source: string
  constructor(data: Quote) {
    this.author = data.author
    this.quote = data.quote
    this.source = data.source
  }
}