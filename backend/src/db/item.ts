import { Schema, model, Document } from 'mongoose'
import { preSaveAddBaseTime } from './base'
import { defaultSchemaOptions } from './utils'

export interface ISacItem {
  name: string
  description: string
}

export interface IItemModel extends ISacItem, Document {}

const modelSchema = new Schema<ISacItem>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true }
  },
  defaultSchemaOptions
)

modelSchema.pre('save', preSaveAddBaseTime)

export const ItemModel = model<IItemModel>('Item', modelSchema)

export async function getItems(limit = 100) {
  return await ItemModel.find().limit(limit).exec()
}

export function addItem(input: ISacItem) {
  return ItemModel.create(input)
}

export function removeItem({ id }) {
  return ItemModel.findByIdAndRemove(id)
}
