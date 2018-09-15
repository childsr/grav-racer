const explosion = () => {
  const particles = mapr(10)(
    i => {
      const [rd0, rd1] = [randr(0.5,2),randr(5,7)]
      const maxT = randr(0.5,1)
      const ease = t => t/maxT
      const alpha = t => 1 - (Math.pow(ease(t),2))
      const rd = t => rd0 + (rd1-rd0)*ease(t)
      const r = pvec(randr(1,3),randr(0,360))
      return t => q.fill(221,132,31,alpha(t))
        (q.vxy(r)(
          q.sc(rd(t))(q.circ)
        ))
    }
  )
  return t => q.pipe(particles.map(p => p(t)))
}