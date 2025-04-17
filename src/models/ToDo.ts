export class ToDo {
  completed: boolean
  createdAt: string
  id: string
  description: string
  updatedAt: string
  creatorId: string
  constructor(data : ToDo) {
    this.completed = data.completed
    this.createdAt = data.createdAt
    this.id = data.id
    this.description = data.description
    this.updatedAt = data.updatedAt
    this.creatorId = data.creatorId
  }
}