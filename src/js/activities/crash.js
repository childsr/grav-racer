const crash = graphics => state0 => {

  const [x0, y0] = [16, 16]
  const y1 = y0 + 9

  const {
    timeText,
    restartText,
    finishText,
    end_time,
    ground,
    leftWall,
    rightWall,
    stars,
    finishLine,
  } = gameGraphics

  const game_over = q.image(
    toCanvas(q.pipe([
      q.xy(x0,y0)(
        text(graphics)('game')
      ),
      q.xy(x0+17,y0)(
        text(graphics)('over')
      ),
    ]))
  )

  const exp = explosion()

  const retry = q.image(
    toCanvas(
      text(graphics)('retry')
    )
  )
  const retryBtn = button(x0+6,y1,19,5)(retry)
  const main = q.image(
    toCanvas(q.pipe([
      text(graphics)('main'),
      q.x(17)(
        text(graphics)('menu')
      ),
    ]))
  )
  const mainBtn = button(x0,y1+7,31,5)(main)
  
  // model
  const model = state => {
    const [_, endr] = retryBtn()
    const [__, endm] = mainBtn()
    const next = (()=>{
      if (endr) return 'retry'
      if (endm) return 'main'
    })()
    return {next, end: endr || endm}
  }

  //render
  const pov = state0.cam.map(x=>-x)
  const shipPos = state.ship.physics_data.inertia.pos
  const render = t => q.pipe([
    q.clear,
    stars(pov),
    q.xy(32,32)(
      q.sy(-1)(
        q.vxy(pov)(
          finishLine(state0.level.width, state0.level.length),
          q.vxy(shipPos)(exp(t)),
          ground(state0.level.width),
          leftWall(state0.level.width, state0.level.length),
          rightWall(state0.level.width, state0.level.length),
          q.pipe(state0.level.asteroids.map(a =>
            q.vxy(a.physics_data.inertia.pos)
              (graphics.asteroids[`asteroid${a.id}`]))
          ),
        )
      )
    ),
    game_over,
    retryBtn()[0],
    mainBtn()[0],
  ])
  
  return (state, t) => liftp(model)().then(state => [render(t), state])
}