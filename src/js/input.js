const initInput = () => {
  const input = {
    left: false,
    right: false,
    up: false,
    mouse_pos: [0, 0]
  }
  window.onkeydown = e => {
    let prop = false
    if (e.code === 'ArrowLeft') input.left = true
    else if (e.code === 'ArrowRight') input.right = true
    else if (e.code === 'ArrowUp') input.up = true
    else if (e.code === 'ArrowDown') {}
    else {
      prop = true
    }
    if (!prop) e.preventDefault()
  }
  window.onkeyup = e => {
    let prop = false
    if (e.code === 'ArrowLeft') input.left = false
    else if (e.code === 'ArrowRight') input.right = false
    else if (e.code === 'ArrowUp') input.up = false
    else {
      prop = true
    }
    if (!prop) e.preventDefault()
  }
  window.onblur = () => {
    input.left = false
    input.right = false
    input.up = false
  }
  window.onmousemove = e => {
    const pos = [e.clientX, e.clientY]
      .pipe(addv(negv(offset)))
      .map(rdiv(pxSize))
      .map(Math.floor)
    input.mouse_pos[0] = pos[0]
    input.mouse_pos[1] = pos[1]
  }  
  const stop = () => {
    window.onkeydown = null
    window.onkeyup = null
    window.onblur = null
  }

  return [input, stop]
}
