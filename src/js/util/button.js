const button = (x, y, w, h) => draw => {
  const box = rect(x, y, w, h)
  let end = false, button = false
  const listener = () => {
    if (button) {
      end = true
    }
  }
  window.addEventListener('click', listener)
  return () => {
    button = box(input.mouse_pos)
    const a = button ? 1 : 0.5
    const drawf = q.a(a)(q.xy(x,y)(draw))
    return [drawf, end]
  }
}
