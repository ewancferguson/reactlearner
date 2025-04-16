import { Weather } from "../models/Weather"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class WeatherService {
   async fetchWeather() {
    const response = await api.get('api/weather')
    logger.log(response.data, "weather fetched")
    const activeWeather = new Weather(response.data)
    logger.log(activeWeather, "active weather")
    return activeWeather
  }
  




}


export const weatherService = new WeatherService()