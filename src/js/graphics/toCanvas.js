const toCanvas = draw => {
  const canvas = document.createElement('canvas')
  Object.assign(canvas,{
    width: 64,
    height: 64,
  })
  const ctx = canvas.getContext('2d')
  draw(ctx)
  return canvas
}