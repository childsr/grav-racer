const main_menu = graphics => {
  const start = q.image(
    toCanvas(
      text(graphics)('start')
    )
  )
  const btn = button(22,34,19,5)(start)
  return liftp(() => {
    const [b,end] = btn()
    return [
      q.pipe([graphics.stars, b]),
      {end}
    ]
  })
}