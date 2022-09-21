export const makeShadow = (shadow1: string, shadow2: string, inset = false): string => {
  const $inset = inset ? 'inset' : ''
  const $shadow = `
      0.5vmin 0.5vmin 1vmin ${shadow1} ${$inset},
      -0.5vmin -0.5vmin 1vmin ${shadow2} ${$inset};
    `
  return $shadow
}
