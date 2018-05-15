
/**
 * Button color enumerable
 * 
 * @type {Object}
 */
export const ButtonColors = {
  NONE:    'none',
  DEFAULT: 'default',
  PRIMARY: 'primary',
  SUCCESS: 'success',
  DANGER:  'danger',
  WARNING: 'warning',
  TEXT:    'text',
  TAGPRIMARY: 'tag-primary'
}

export const TagColors = {
  PRIMARY: 'primary',
  SUCCESS: 'success',
  DANGER:  'danger',
  WARNING: 'warning',
  IGNORE:  'ignore'
}

export const TextColors = {
  PRIMARY: 'primary',
  SUCCESS: 'success',
  DANGER:  'danger',
  WARNING: 'warning',
  IGNORE:  'ignore'
}

export const Colors = {
  ...ButtonColors,
  ...TagColors,
  ...TextColors
}

/**
 * Button size enumerable
 * 
 * @type {Object}
 */
export const ButtonSizes = {
  XSMALL: 'xs',
  SMALL: 'sm',
  LARGE: 'lg'
}

export const TagSizes = {
  LARGE: 'lg',
  SMALL: 'sm'
}

export const Sizes = {
  ...ButtonSizes,
  ...TagSizes
}

/**
 * Switch type enumerable
 * @type {Object}
 */
export const SwitchInputTypes = {
  CHECKBOX: 'checkbox',
  RADIO: 'radio'
}

export const InputTypes = {
  ...SwitchInputTypes
}