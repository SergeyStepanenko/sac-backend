import { Schema, model, Document, DocumentQuery } from 'mongoose'
import { ITEM_VALIDATION_RULES } from '../constants'

export interface ISacItem {
  title: string
  description: string
  categoryId: number
}

export interface ISacItemWithId extends ISacItem {
  id: string
}

export interface IItemModel extends ISacItem, Document {}

const modelSchema = new Schema<ISacItem>(
  {
    title: {
      type: String,
      required: true,
      minlength: ITEM_VALIDATION_RULES.title.length.min,
      maxlength: ITEM_VALIDATION_RULES.title.length.max
    },
    description: {
      type: String,
      required: true,
      minlength: ITEM_VALIDATION_RULES.description.length.min,
      maxlength: ITEM_VALIDATION_RULES.description.length.max
    },
    categoryId: { type: Number, required: true }
  },
  { timestamps: true }
)

// Replaces '_id' with 'id' and removes '_v'
modelSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(doc, ret) {
    delete ret._id
  }
})

export const ItemModel = model<IItemModel>('Item', modelSchema)

interface IGetParams {
  title?: string
  limit?: number
}

export async function get(params?: IGetParams): Promise<ISacItem[]> {
  const { title, limit = 100 } = params || {}

  if (title) {
    return await ItemModel.find({ title: { $regex: title, $options: 'i' } })
      .limit(limit)
      .exec()
  }

  return await ItemModel.find().limit(limit).exec()
}

export function add(item: ISacItem): Promise<ISacItem> {
  return ItemModel.create(item)
}

export function findAndUpdate(
  item: ISacItemWithId
): DocumentQuery<IItemModel, IItemModel> {
  const { id: itemId, title, description } = item

  return ItemModel.findOneAndUpdate(
    { _id: itemId },
    { title, description },
    { runValidators: true, new: true }
  )
}

export function remove(itemId: string): DocumentQuery<IItemModel, IItemModel> {
  return ItemModel.findByIdAndRemove(itemId)
}
