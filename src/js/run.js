
/*
  run: Game -> State -> Promise<State>
    where Game: (State, t: Sec, dt: Sec) -> Promise<[DrawCall, State]>
    where State: { end: boolean, ... }
  
  When the State returned by the Game function has 'end' equal to true
  the animation loop will stop and the Promise will be resolve with the
  current State.
*/

/**
 * A game state object. Its only requirement is that is have a property
 * called 'end' that holds a boolean.
 * @typedef {Object} State
 * @property {boolean} end
 * @property {...any} rest
 */

/**
 * Game update function. Returns an array containing the DrawCall and the
 * updated State.
 * @typedef {function} Game
 * @param {State} state
 * @param {number} t
 * @param {number} dt
 * @returns {Promise.<DrawCall, State>}
 */

/**
 * @function run
 * @param {Function} game - Game update function
 * @param {State} state0 - Intial state
 * @returns {Promise.<State>}
 */
const run = game => state0 => {
  return new Promise(resolve => {
    const t0 = performance.now()
    let prev = 0
    const anim = state => raw => {
      const ms = raw - t0
      const dt = ms - prev
      prev = ms
      game(state, ms/1000, dt/1000)
        .then(([draw, state]) => {
          window.state = state
          if (!state.end) requestAnimationFrame(anim(state))
          else resolve(state)
          Canvas.render(draw)
        })

        // .catch(()=>{})
    }
    requestAnimationFrame(anim(state0))
  })
}