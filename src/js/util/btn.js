const btn = (x, y, w, h) => draw => {
  const box = rect(x, y, w, h)
  let click = false
  const listener = () => {
    if (box(input.mouse_pos)) {
      click = true
    }
  }
  window.addEventListener('click', listener)
  return () => {
    const a = box(input.mouse_pos) ? 1 : 0.5
    const drawf = q.a(a)(q.xy(x,y)(draw))
    const clickr = click
    click = false
    return [drawf, clickr]
  }
}