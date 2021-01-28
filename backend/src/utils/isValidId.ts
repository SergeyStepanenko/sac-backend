export default function isValidId(id: string | number | null | undefined) {
  return Boolean(id || id === 0)
}
