import { AppState } from "../AppState"
import { Quote } from "../models/Quote"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class QuoteService {
  async getQuote() {
    const response = await api.get('api/quotes')
    logger.log(response.data)
    const activeQuote = new Quote(response.data)
    AppState.quote = activeQuote
    logger.log(AppState.quote, 'appstate')
    return activeQuote
  }
  
}


export const quoteService = new QuoteService()