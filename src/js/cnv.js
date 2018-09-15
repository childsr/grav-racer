const canvas = (sound, mute) => {

  const offscreen = document.createElement('canvas')
  Object.assign(offscreen,{
    width: 64,
    height: 64,
  })
  const canvas = document.getElementById('canvas')
  Object.assign(canvas,{
    width: 640,
    height: 640,
  })
  Object.assign(canvas.style, {
    width: '640px',
    height: '640px',
    position: 'absolute',
    left: topx(offset[0]),
    top: topx(offset[1]),
  })
  document.body.appendChild(canvas)

  const octx = offscreen.getContext('2d')
  const ctx = canvas.getContext('webgl')
  const regl = createREGL(ctx)

  const drawgl = regl({
    frag: `
      precision mediump float;
      uniform sampler2D texture;
      varying vec2 uv;
      void main() {
        gl_FragColor = texture2D(texture, vec2(floor(uv*64.0)/64.0));
      }`,

    vert: `
      precision mediump float;
      attribute vec2 position;
      varying vec2 uv;
      void main() {
        uv = vec2(1.0 - position.x, position.y);
        gl_Position = vec4(1.0 - 2.0 * position, 0, 1);
      }`,
    
    attributes: {
      position: regl.buffer([
        -2, 0,
        0, -2,
        2, 2
      ])
    },

    uniforms: {
      texture: regl.prop('texture')
    },

    count: 3
  })

  const render = draw => {
    const drawCall = q.pipe([draw,
      q.xy(57,1)
        (q.a(1)
          (soundOn ? sound : mute))
    ])(octx)
    drawgl({texture: regl.texture(drawCall)})
  }

  return {
    octx,
    ctx,
    render//: render(ctx)(octx), //render: (ctx -> ctx) -> ()
  }

}