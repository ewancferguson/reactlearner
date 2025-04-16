export class Weather {
  celsius: number
  fahrenheit: number
  date: Date
  constructor(data: any) {
    this.celsius = Math.floor(data.main.temp - 273.15)
    this.fahrenheit = Math.floor((data.main.temp - 273.15) * 9/5 + 32)
    this.date = data.date == undefined ? new Date() : new Date(data.date)
  }
}