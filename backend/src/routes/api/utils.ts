import { Request } from 'express'
import { isObject, isEmpty, isString, isNumber } from 'lodash'
import { CATEGORIES } from '../../constants/categories'
import { ITEM_VALIDATION_RULES } from '../../constants'
import { ISacItem, ISacItemWithId } from '../../db/item'
import isValidId from '../../utils/isValidId'

export function getItemWithIdFromRequest(
  request: Request
): ISacItemWithId | undefined {
  const item = getItemFromRequest(request)

  if (!item) {
    return
  }

  const { id } = request.body

  if (!isValidId(id)) {
    return
  }

  return {
    id,
    ...item
  }
}

export function getItemFromRequest(request: Request): ISacItem | undefined {
  const { body } = request

  if (isEmpty(body) || !isObject(body)) {
    return
  }

  const { title, description, categoryId } = body as ISacItem

  if (!getIsValidTitle(title)) {
    return
  }

  if (!getIsValidDescription(description)) {
    return
  }

  if (!getIsValidCategoryId(categoryId)) {
    return
  }

  return {
    title,
    description,
    categoryId
  }
}

const CATEGORIES_IDS = CATEGORIES.map((category) => category.id)

function getIsValidTitle(title: unknown) {
  if (!isString(title)) {
    return false
  }

  if (
    title.length < ITEM_VALIDATION_RULES.title.length.min ||
    title.length > ITEM_VALIDATION_RULES.title.length.max
  ) {
    return false
  }

  return true
}

function getIsValidDescription(description: unknown) {
  if (!isString(description)) {
    return false
  }

  if (
    description.length < ITEM_VALIDATION_RULES.description.length.min ||
    description.length > ITEM_VALIDATION_RULES.description.length.max
  ) {
    return false
  }

  return true
}

function getIsValidCategoryId(categoryId: unknown) {
  if (!isNumber(categoryId)) {
    return false
  }

  if (!CATEGORIES_IDS.includes(categoryId)) {
    return false
  }

  return true
}
