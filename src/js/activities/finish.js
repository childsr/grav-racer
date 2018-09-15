const finish = graphics => {

  const {
    finishText,
    end_time,
    ground,
    leftWall,
    rightWall,
    stars,
    finishLine,
  } = gameGraphics

  const next = btn(14, 42, 36, 5)(
    q.image(
      toCanvas(q.pipe([
        text(graphics)('next'),
        q.x(17)(text(graphics)('level'))
      ]))
    )
  )
  const main = btn(16, 49, 36, 5)(
    q.image(
      toCanvas(q.pipe([
        text(graphics)('main'),
        q.x(17)(text(graphics)('menu'))
      ]))
    )
  )

  // state transformations
  const updateSoundFx = state => {
    sfx.engine(false)
    return state
  }
  const fn = {
    shipPos: state => state.ship.physics_data.inertia.pos,
    pov: state => state.cam.map(R.negate)
  }

  // model
  const model = (t, dt) => state => window.frame(t, dt)(state)
      .then(state => updateSoundFx(state))

  // render
  const render = (shipPos, pov) => (state, t) => (
    q.pipe([
      q.clear,
      stars(pov),
      q.xy(32,32)(
        q.sy(-1)(
          q.vxy(pov)(
            finishLine(state.level.width, state.level.length),
            q.vxy(shipPos)(q.sy(-1)(graphics.ship)),
            ground(state.level.width),
            leftWall(state.level.width, state.level.length),
            rightWall(state.level.width, state.level.length),
            q.pipe(
              state.level.asteroids
                .map(a =>
                  q.vxy(a.physics_data.inertia.pos)
                    (graphics.asteroids[`asteroid${a.id}`]))
            ),
          )
        )
      ),
      finishText,
      end_time(state.time,t),
    ])
  )
  
  return (state, t, dt) => model(t, dt)(state).then(
    state => {
      const [nextBtn, endn] = next()
      const [mainBtn, endm] = main()
      state.end = (endn || endm)
      if (endn) state.next = 'next'
      if (endm) state.next = 'main'
      const draw = q.pipe([
        render
          (fn.shipPos(state), fn.pov(state))
          (state, t),
        nextBtn,
        mainBtn,
      ])
      return [draw, state]
    })
}