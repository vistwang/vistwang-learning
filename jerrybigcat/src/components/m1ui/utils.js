import classnames from 'classnames'

/**
 * Create a class names from the given argumens.
 *             
 * @param  {*} args 任意参数
 * @return {string}  css类字符串
 */
export function classNames(...args) {
  return classnames(...args)
}

/**
 * Removes properties from the given object
 * This method is used for removing valid attributes from component props prior to rendering.
 * 
 * @param  {Object} object 
 * @param  {Array} remove
 * @return {Object}        
 */
export function removeProps(object, remove) {
  const result = {}

  for(const property in object) {
    if(object.hasOwnProperty(property) && remove.indexOf(property) === -1) {
      result[property] = object[property]
    }
  }

  return result
}

export function objectKeys(object) {
	return Object.Keys(object)
}

export function objectValues(object) {
	const values = []
	for(const property in object) {
		values.push(object[property])
	}
	return values
}