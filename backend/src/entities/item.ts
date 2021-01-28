export interface IWrite<T> {
  create(item: T): Promise<T>
  update(id: string, item: T): Promise<T>
  delete(id: string): Promise<T>
}

export interface IRead<T> {
  find(item: T): Promise<T[]>
  findOne(id: string): Promise<T>
}

export class Item {}

export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
  create(item: T): Promise<T> {
    throw new Error('Method not implemented.')
  }
  update(id: string, item: T): Promise<T> {
    throw new Error('Method not implemented.')
  }
  delete(id: string): Promise<T> {
    throw new Error('Method not implemented.')
  }
  find(item: T): Promise<T[]> {
    throw new Error('Method not implemented.')
  }
  findOne(id: string): Promise<T> {
    throw new Error('Method not implemented.')
  }
}
