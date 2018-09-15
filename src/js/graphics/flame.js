Object.assign(window, (()=>{

  const maxT = 0.4
  const yvels = [-20,-10]
  const xvel = 15
  const radius = 2

  const ease = t => t / maxT
  const alpha = t => 1 - ease(t)
  const rt = (r0, v) => t => [r0[0] + v[0]*t, r0[1] + v[1]*t]
  const particle = (r0, v, t0) => {
    const r = rt(r0,v)
    return {
      draw: t =>
        q.fill(221,132,31,alpha(t-t0))(
          q.vxy(r(t-t0))(
            q.sc(radius)(q.circ)
          )
        ),
      t0
    }
  }
  const flame = (t, r, thrust) => state => {
    // (t, r, thrust) -> state -> state
    /*state: {draw, particles: [particle]}*/
    // if (state.particles.length) console.log(r)
    const particles = state.particles.filter(({t0}) => t - t0 <= maxT).concat(
      thrust ? [particle([r[0]-0.25,r[1]-4], [randInt(-xvel,xvel+1), randInt(...yvels)], t)] : []
    )
    return {
      draw: q.pipe(particles.map(p => p.draw(t))),
      particles
    }    
  }

  return {
    flame,
    particle
  }

})())