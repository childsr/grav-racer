const digit = n => x => Math.floor(x/(10**n)) % 10
const time_str = t => {
  const digits = mapr(4)(i => digit(1-i)(t))
  const s = digits.slice(0,2).join('')
  const ms = digits.slice(2,4).join('')
  return [s,ms].join('.')
}

const boundsColor = [128, 26, 12]
const finishColor = [48, 255, 104, 0.35]

const gameGraphics_ = graphics => {
    // text draw calls
  const timeText = q.image(
    toCanvas(
      text(graphics)('time:')
    ))
  const bestText = q.image(
    toCanvas(
      text(graphics)('best:')
    ))
  const restartText = q.image(
    toCanvas(
      text(graphics)('restart')
    ))
  const finishText = q.xy(20,18)(
    q.xy(-9,-1)(
      q.fill(0,0,0,0.5)(
        q.sxy(41,38)(q.rect)
      )
    ),
    text(graphics)('finish')
  )
  // time draw calls
  const time = R.pipe(
    t => Math.floor(t*100) / 100,
    t => text(graphics)(time_str(t))
  )
  const norm_time = t => q.xy(42,58)(time(t))
  const lvl = n => q.xy(1,58)(
    q.image(
      toCanvas(
        q.pipe([
          text(graphics)('lvl'),
          q.x(13)(text(graphics)((n+1).toString()))
        ])
      )
    )
  )
  const end_time = (st,t) => q.xy(12,25)(
    q.a(0.75 + 0.25*Math.sin(8*t))(
      timeText,
      q.x(20)(time(st))
    ),
    q.y(7)(
      bestText,
      q.x(20)(time(
        getBestTime(level)
      ))
    )
  )

  // boundary draw calls
  const ground = width => q.fill(boundsColor)
    (q.xy(-width/2, -32)
      (q.sxy(width, 32)
        (q.rect)))
  const leftWall = (width, length) => q.fill(boundsColor)
    (q.xy(-width/2-32, -32)
      (q.sxy(32, length + 32)
        (q.rect)))
  const rightWall = (width, length) => (q.fill(boundsColor)
    (q.xy(width/2, -32)
      (q.sxy(32, length + 32)
        (q.rect)))
  )

  // starfield background draw call
  const stars = cam => q.xy((cam[0]%64),-(cam[1]%64))(
      q.y(-64)(graphics.stars),
      q.y(64)(graphics.stars),
      q.x(-64)(graphics.stars),
      q.x(64)(graphics.stars),
      q.xy(64,64)(graphics.stars),
      q.xy(-64,64)(graphics.stars),
      q.xy(64,-64)(graphics.stars),
      q.xy(-64,-64)(graphics.stars),
      graphics.stars,
  )

  // finish line draw call
  const finishLine = (width, length) => 
    (q.ld([2,2])
      (q.lw(2)
        (q.stroke(finishColor)
          (q.xy(-width/2 - 1, length-3)
            (q.sxy(width + 2, 2)
              (q.rect)))))
  )
  return {
    timeText,
    restartText,
    finishText,
    time,
    norm_time,
    end_time,
    ground,
    leftWall,
    rightWall,
    stars,
    finishLine,
    lvl,
  }
}
let gameGraphics

const game = graphics => {
  gameGraphics = gameGraphics_(graphics)
  // animations
  let flameAnimation = flame(0,[0,0],false)({particles:[]})

  const {
    norm_time,
    ground,
    leftWall,
    rightWall,
    stars,
    finishLine,
    lvl
  } = gameGraphics

  // state transformations
  const updateInput = state => {
    state.input.left = window.input.left
    state.input.right = window.input.right
    state.input.up = window.input.up
    return state
  }
  const updateFlameAnimation = t => state => {
    flameAnimation = flame
      (t, state.ship.physics_data.inertia.pos, state.input.up)
      (flameAnimation)
    return state
  }
  const updateSoundFx = state => {
    sfx.engine(state.input.up)
    return state
  }
  const updateFinished = state => {
    if (state.finished) state.end = true
    return state
  }

  // model
  const model = (t, dt) => state => {
    const p = liftp(updateInput)(state)
      .then(state => window.frame(t, dt)(state))
      .then(state => updateFlameAnimation(t)(state))
      .then(state => updateSoundFx(state))
      .then(state => updateFinished(state))
    return p
  }
  //render
  const render = (state,t) => {
    const shipPos = state.ship.physics_data.inertia.pos
    const pov = state.cam.map(x=>-x)

    return q.pipe([
      q.clear,
      stars(pov),
      q.xy(32,32)(
        q.sy(-1)(
          q.vxy(pov)(
            finishLine(state.level.width, state.level.length),
            flameAnimation.draw,
            q.vxy(shipPos)(q.sy(-1)(graphics.ship)),
            ground(state.level.width),
            leftWall(state.level.width, state.level.length),
            rightWall(state.level.width, state.level.length),
            q.pipe(state.level.asteroids.map(a =>
              q.vxy(a.physics_data.inertia.pos)
                (graphics.asteroids[`asteroid${a.id}`]))
            ),
          )
        )
      ),
      norm_time(state.time),
      lvl(window.level)
    ])
  }
  
  return (state, t, dt) => model(t, dt)(state).then(state => [render(state,t), state])
    
}