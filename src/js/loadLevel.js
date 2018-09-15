const initAsteroid = ({id, pos, vel}) => ({
  id,
  physics_data: {
    inertia: {
      pos: pos.map(Math.round), vel: vel.map(Math.round)
    },
    body: asteroidBody
  }
})

const loadLevel = levelData => {
  const level = Object.assign(levelData, {
    asteroids: levelData.asteroids.map(initAsteroid)
  })
  return {
    ship: shipBody,
    level,
    time: 0,
    time0: 0,
    end: false,
    input,
    cam: [0,15],
    started: false,
    finished: false,
  }
}