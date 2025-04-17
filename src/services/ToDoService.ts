import { AppState } from "../AppState"
import { ToDo } from "../models/ToDo"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class ToDoService {
  async fetchToDos() {
    const response = await api.get('api/todos')
    logger.log(response.data, "todos fetched")
    const toDos = response.data.map((t:ToDo) => new ToDo(t))
    logger.log(toDos, "active todos")
    AppState.toDos = toDos
    logger.log(AppState.toDos, 'appstate todos')
  }
  
}

export const todoService = new ToDoService()