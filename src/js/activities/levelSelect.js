const level_select = graphics => {
  const leftxy = [26, 32]
  const rightxy = [34, 32]
  const select =
    q.xy(10, 22)(
      q.image(
        toCanvas(
          q.pipe([
            text(graphics)('select'),
            q.xy(26, 0)(text(graphics)('level'))
          ])
        )
      )    
    )
  const left = btn(...leftxy, 3, 5)(
    q.image(
      toCanvas(
        text(graphics)('<')
      )
    )
  )
  const right = btn(...rightxy, 3, 5)(
    q.image(
      toCanvas(
        text(graphics)('>')
      )
    )
  )
  const play = btn(24, 42, 15, 5)(
    q.image(
      toCanvas(
        text(graphics)('play')
      )
    )
  )
  const nlevel = n => text(graphics)((n+1).toString())

  return liftp(({level}) => {
    const [lt, dec] = left()
    const [rt, inc] = right()
    const [pl,  go] = play()
    let maxLevel = getUnlocked().findIndex(R.compose(R.not, R.identity)) - 1
    if (maxLevel < 0) maxLevel = 6
    const newLevel = R.clamp(0, maxLevel, level + (dec ? -1 : (inc ? 1 : 0)))
    return [
      q.pipe([graphics.stars, select, lt, rt, pl, q.xy(30,32)(nlevel(newLevel))]),
      {
        end: go,
        level: newLevel
      }
    ]
  })
}