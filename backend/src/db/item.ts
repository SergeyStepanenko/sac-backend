import { Schema, model, Document } from 'mongoose'
import { preSaveAddBaseTime } from './base'

export interface ISacItem {
  title: string
  description: string
}

export interface IItemModel extends ISacItem, Document {}

const modelSchema = new Schema<ISacItem>({
  title: { type: String, required: true },
  description: { type: String, required: true }
})

modelSchema.pre('save', preSaveAddBaseTime)

export const ItemModel = model<IItemModel>('Item', modelSchema)

export async function get(limit = 100) {
  return await ItemModel.find().limit(limit).exec()
}

export function add(item: ISacItem) {
  return ItemModel.create(item)
}

export function remove({ id }) {
  return ItemModel.findByIdAndRemove(id)
}
