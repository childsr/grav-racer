const text = graphics => str => {
  const chars = str.split('')
  // return toCanvas(
    return q.pipe(
      chars.map((char,i) =>
        q.x(i*4)(
          graphics.characters[char]
        )
      )
    )
  // )
}