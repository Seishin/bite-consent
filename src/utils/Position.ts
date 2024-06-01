type Position = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
type CustomPosition = { top?: number | string; left?: number | string; right?: number | string; bottom?: number | string }

const isCustomPosition = (position: any): position is CustomPosition => {
  if (typeof position !== 'object' || position === null) {
    throw new Error(
      `Invalid position type! Please provide an object representing the position with properties: top, left, right, and bottom.`
    )
  }

  const validKeys = ['top', 'left', 'right', 'bottom']
  const keys = Object.keys(position)

  const invalidKeys = keys.filter((key) => !validKeys.includes(key))
  if (invalidKeys.length > 0) {
    throw new Error(
      `Invalid position properties! Please use only the following properties: top, left, right, bottom. Invalid properties found: 
      ${invalidKeys.join(', ')}.`
    )
  }

  return true
}

export default Position
export { CustomPosition, isCustomPosition }
