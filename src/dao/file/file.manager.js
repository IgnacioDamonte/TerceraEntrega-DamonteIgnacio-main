import fs from "fs"


export default class FileManager {
  constructor(filename = "./src/databases/db.json") {
    this.filename = filename
  }

  get = async () => fs.promises.readFile(this.filename, "utf-8").then(res => JSON.parse(res)).catch(e => [])
  getById = async (id) => {
    const data = await this.get()
    return data.find(d => d.id === parseInt(id))
  }

  add = async (data) => {
    const previousData = await this.get()
    data.id = previousData.length + 1

    previousData.push(data)

    await fs.promises.writeFile(this.filename, JSON.stringify(previousData))
    return data
  }

  update = async (id, data) => {
    data.id = parseInt(id)
    const previousData = await this.get()
    const index = previousData.findIndex((d) => d.id === parseInt(id))
    previousData[index] = data

    await fs.promises.writeFile(this.filename, JSON.stringify(previousData))
    return data
  }

  delete = async (id) => {
    const previousData = await this.get()
    const deleteDataIndex = previousData.findIndex((d) => d.id === parseInt(id))
    const result = previousData.splice(deleteDataIndex, 1)

    await fs.promises.writeFile(this.filename, JSON.stringify(previousData))
    return result
  }
}