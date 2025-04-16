import { Image } from "../models/Image"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class ImageService {
  async fetchImage(){
    const response = await api.get('api/images')
    logger.log(response.data, "images fetched")
    const activeImage = new Image(response.data)
    logger.log(activeImage, "active image")
    return activeImage
  }
  
}


export const imageService = new ImageService()