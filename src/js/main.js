const main = ([graphics, bodies = null]) => {
  window.graphics = graphics
  window.input = initInput()[0]
  if (bodies) {
    window.asteroidBody = bodies[0]
    window.shipBody = bodies[1]
    window.soundOn = true
    window.Canvas = canvas(graphics.sound, graphics.mute)
    const soundBox = rect(57,1,6,10)
    window.music.setMute()
    window.addEventListener('click', () => {
      if (soundBox(input.mouse_pos)) {
        window.soundOn = !window.soundOn
        window.music.setMute()
      }
    })
  }

  const main = run
    (main_menu (graphics))
    ({end: false, button: false})  

  // main.then(() => loadGame(graphics)(LEVEL))
  main.then(() => select_level(graphics))
  
}

const loadGame = graphics => level => {
  window.level = level
  loadJSON('levels/level' + level)
    .then(loadLevel)
    .then(state => {
      run (game (graphics))(state).then(gameEnd (graphics))
    })
}

const gameEnd = graphics => state => {
  state.end = false
  if (state.finished) {
    setUnlocked(level + 1)(true)
    if (state.time < getBestTime(level)) setBestTime(level)(state.time)
    run
      (finish (graphics))
      (state)
      .then(({next}) => {
        if (next === 'next') loadGame(graphics)(level + 1)
        if (next === 'main') main([graphics])
      })
  }
  else {
    window.sfx.engine(false)
    window.sfx.explosion()
    //run(crash (graphics)(state))(state).then(() => loadGame(graphics)(level))
    run(crash (graphics)(state))(state).then(({next}) => {
      if (next === 'retry') loadGame(graphics)(level)
      if (next === 'main') main([graphics])
    })
  }
}

const select_level = graphics => {
  run
    (level_select(graphics))
    ({end: false, level: 0})
    .then(({level}) => loadGame(graphics)(level))
}

console.log()