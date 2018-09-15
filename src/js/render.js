const q = (()=>{

  const toStyle = ( r, g, b, a ) => {
    if ( Array.isArray(r) ) return rgba( ...r )
    if (
      typeof r === 'string' ||
      r.toString() === "[object CanvasGradient]"
    ) return r
    return rgba( r, g, b, a )
  }
  const toColor = ( r, g, b, a ) => {
    if ( Array.isArray(r) ) return rgba( ...r )
    if ( typeof r === 'string' ) return r
    return rgba( r, g, b, a )
  }
  const rgba = ( r, g, b, a = 1 ) =>
    'rgba(' + [r,g,b].map(Math.round).concat([a]).join() + ')'

  const save = ctx => {
    ctx.save()
    return ctx
  }
  const restore = ctx => {
    ctx.restore()
    return ctx
  }
  const pipe = funcs => {
    const n = funcs.length
    return ctx => {
      let ctx1 = ctx
      for ( let i = 0; i < n; i++ ) {        
        ctx1 = funcs[i](ctx)
      }
      return ctx1
    }
  }
  const transform = tfm => ( ...fs ) => ctx => {
    return restore
      (pipe (fs)
        (tfm (save (ctx))))
  }
  const composite = btm => top => ctx => top(btm(ctx))

  const rgrad = ( offsetX, offsetY ) => {
    return document.createElement('canvas')
                  .getContext('2d')
                  .createRadialGradient( 0, 0, 0, offsetX, offsetY, 1 )
  }
  const lgrad = ( offsetX, offsetY ) => {
    return document.createElement('canvas')
                  .getContext('2d')
                  .createLinearGradient( 0, 0, offsetX, offsetY )
  }
  const colorStop = offset => ( ...color ) => grad => {
    grad.addColorStop( offset, toColor(color) )
    return grad
  }

  const util = {
    colorStop,
    composite,
    lgrad,
    pipe: pipe,
    restore,
    rgba,
    rgrad,
    save,
    toColor,
    toStyle,
    transform,
  }

  const translate = ( x, y ) => transform(
    ctx => {
      ctx.translate( x, y )
      return ctx
    }
  )
  const translateRatio = ( kx, ky ) => transform(
    ctx => {
      ctx.translate( kx*ctx.canvas.width, ky*ctx.canvas.height )
      return ctx
    }
  )
  const rotate = theta => transform(
    ctx => {
      ctx.rotate( theta )
      return ctx
    }
  )
  const scale = ( sx, sy ) => transform(
    ctx => {
      ctx.scale( sx, sy )
      return ctx
    }
  )
  const filter = str => (...fs) => ctx => {
    if (ctx.filter === 'none' ) ctx.filter = str
    else ctx.filter += ( ' ' + str )
    return pipe(fs)(ctx)
  }

  const blur = rd => filter(`blur(${rd}px)`)
  const dropShadow = ( x, y, b, ...clr ) => filter(
    `drop-shadow(${x}px,${y}px,${b}px,${toStyle(clr)})`
  )

  const alpha = a => transform(
    ctx => {
      ctx.globalAlpha *= a
      return ctx
    }
  )
  const lineCap = lc => transform(
    ctx => {
      ctx.lineCap = lc
      return ctx
    }
  )
  const lineDash = ld => transform(
    ctx => {
      ctx.setLineDash(ld)
      return ctx
    }
  )
  const lineWidth = lw => transform(
    ctx => {
      ctx.lineWidth *= lw
      return ctx
    }
  )
  const setLineWidth = lw => transform(
    ctx => {
      ctx.lineWidth = lw
      return ctx
    }
  )
  const setAlpha = a => transform(
    ctx => {
      ctx.globalAlpha = a
      return ctx
    }
  )
  const smooth = bool => transform(
    ctx => {
      ctx.imageSmoothingEnabled = bool
      return ctx
    }
  )
  const shadowBlur = b => transform(
    ctx => {
      ctx.shadowBlur = b
      return ctx
    }
  )
  const shadowClr = ( ...style ) => transform(
    ctx => {
      ctx.shadowColor = toStyle( ...style )
      return ctx
    }
  )
  const shadowX = x => transform(
    ctx => {
      ctx.shadowOffsetX = x
      return ctx
    }
  )
  const shadowY = y => transform(
    ctx => {
      ctx.shadowOffsetY = y
      return ctx
    }
  )
  const shadowXY = ( x, y ) => transform(
    ctx => {
      ctx.shadowOffsetX = x
      ctx.shadowOffsetY = y
      return ctx
    }
  )
  const shadow = ( x, y, blur, ...clr ) => transform(
    ctx => {
      ctx.shadowOffsetX = x
      ctx.shadowOffsetY = y
      ctx.shadowBlur = blur
      ctx.shadowColor = toStyle( ...clr )
      return ctx
    }
  )

  const transforms = {
    x : x => translate( x, 0 ),
    y : y => translate( 0, y ),
    vxy : ([ x, y ]) => translate( x, y ),
    sc : sc => scale( sc, sc ),
    sx : sx => scale( sx, 1 ),
    sy : sy => scale( 1, sy ),
    sxy : ( sx, sy ) => scale( sx, sy ),
    svec : ([ sx, sy ]) => scale( sx, sy ),
    xyRatio : ( kx, ky ) => translateRatio( kx, ky ),
    alpha,
    blur,
    dropShadow,
    lineDash,
    lineWidth,
    lineCap,
    rotate,
    setAlpha,
    shadow,
    shadowX,
    shadowY,
    shadowXY,
    shadowClr,
    shadowBlur,
    smooth,

    a : alpha,
    lc : lineCap,
    lw : lineWidth,
    ld : lineDash,
    rot : rotate,
    seta : setAlpha,
    setlw : setLineWidth,
    shblur : shadowBlur,
    shclr : shadowClr,
    shx : shadowX,
    shy : shadowY,
    shxy : shadowXY,
    shv : ([ x, y ]) => shadowXY( x, y ),
    xy : translate,

    imageSmoothingEnabled : smooth,
    antiAlias : smooth,

    matrix : ([ a, b, c, d, e, f ]) => transform(
      ctx => {
        ctx.setTransform( a, b, c, d, e, f )
        return ctx
      }
    )
  }


  const all = ctx => {
    ctx.save()
    ctx.setTransform( 1, 0, 0, 1, 0, 0 )
    ctx.rect( 0, 0, ctx.canvas.width, ctx.canvas.height )
    ctx.restore()
    return ctx
  }
  const rect = ctx => {
    ctx.rect( 0, 0, 1, 1 )
    return ctx
  }
  const circ = ctx => {
    ctx.moveTo(1,0)
    ctx.arc( 0, 0, 1, 0, Math.PI*2 )
    return ctx
  }
  const arc = ( theta0, theta1 ) => ctx => {
    ctx.arc( 0, 0, 1, theta0, theta1 )
    return ctx
  }
  const line = ( x, y ) => ctx => {
    ctx.lineTo( x, y )
    return ctx
  }
  const move = ( x, y ) => ctx => {
    ctx.moveTo( x, y )
    return ctx
  }
  const center = ctx => {
    ctx.moveTo( 0, 0 )
    return ctx
  }
  const path = transform(
    ctx => {
      ctx.beginPath()
      return ctx
    }
  )

  const iter = n => idraw => {
    let draws = []
    for ( let i = 0; i < n; i++ ) {
      draws.push(idraw(i))
    }
    const f = pipe(draws)
    return ctx => {
      return f(ctx)
    }
  }
  const drawr = n => idraw => ctx => {
    for ( let i = 0; i < n; i++ ) idraw(i)(ctx)
    return ctx
  }

  const drawCalls = {
    all,
    arc,
    center,
    circ,
    drawr,
    iter,
    line,
    move,
    path,
    rect,
  }


  const image = img => ctx => {
    ctx.drawImage( img, 0, 0 )
    return ctx
  }
  const sprite = img => {    
    const x = -img.width/2
    const y = -img.height/2
    return ctx => {
      ctx.drawImage( img, x, y )
      return ctx
    }
  }
  const tiled = img => {
    let pattern = 'rgba(0,0,0,0)'
    img.onload = () => {
      pattern = document.createElement('canvas')
                        .getContext('2d')
                        .createPattern(img, 'repeat')

    }
    return ctx => {
      ctx.save()
      ctx.fillStyle = pattern
      ctx.fill()
      ctx.restore()
      return ctx
    }

  }
  const clear = ctx => {
    // ctx.save()
    // ctx.setTransform( 1, 0, 0, 1, 0, 0 )
    // ctx.clearRect( 0, 0, ctx.canvas.width, ctx.canvas.height )
    // ctx.restore()
    ctx.canvas.width ^= 0
    return ctx
  }
  const fillAll = ( ...style ) => ctx => {
    ctx.save()
    ctx.setTransform( 1, 0, 0, 1, 0, 0 )
    ctx.fillStyle = toStyle( ...style )
    ctx.fillRect( 0, 0, ctx.canvas.width, ctx.canvas.height )
    ctx.restore()
    return ctx
  }
  const fill = ( ...style ) => ( ...funcs ) => ctx => {
    ctx.save()
    ctx.fillStyle = toStyle(...style)
    ctx.beginPath()
    pipe(funcs)(ctx)
    ctx.fill()
    ctx.restore()
    return ctx
  }
  const stroke = ( ...style ) => ( ...funcs ) => ctx => {
    ctx.save()
    ctx.strokeStyle = toStyle(...style)
    ctx.beginPath()
    pipe(funcs)(ctx)
    ctx.stroke()
    ctx.restore()
    return ctx
  }
  const pstroke = ( ...style ) => ( ...funcs ) => ctx => {
    ctx.save()
    ctx.strokeStyle = toStyle(...style)
    ctx.beginPath()
    pipe(funcs)(ctx)
    ctx.setTransform( 1, 0, 0, 1, 0, 0 )
    ctx.stroke()
    ctx.restore()
    return ctx
  }


  const text = type => ( opts = {} ) => {
    const font = opts.font || (()=>{
      const style = opts.style || 'monospace'
      const variant = opts.variant || ''
      const weight = opts.weight || ''
      const lineHeight = opts.lineHeight || ''
      const family = opts.family || ''
      const size = ( opts.size || 12 ) + 'px'
      const align = opts.align || 'left'

      return {
        style : [ size, style, variant, weight, lineHeight, family ].join(' '),
        align
      }
    })()
    return str => ctx => {
      ctx.save()
      if (opts.color) ctx.fillStyle = toStyle(opts.color)
      ctx.font = font.style
      ctx.textAlign = font.align
      ctx[type+'Text']( str, 0, 0 )
      ctx.restore()
      return ctx
    }
  }
  const fillText = text('fill')
  const strokeText = text('stroke')

  const point = ({ rd, style }) => {
    const s = style ? toStyle(style) : 0
    return ctx => {
      ctx.save()
      if (s) ctx.fillStyle = s
      const { a : sx, d : sy } = ctx.currentTransform
      ctx.scale( 1/sx, 1/sy )

      ctx.beginPath()
      ctx.arc( 0, 0, rd + 1, 0, 2*Math.PI )
      ctx.globalAlpha *= 0.5
      ctx.fill()

      ctx.beginPath()
      ctx.arc( 0, 0, rd, 0, 2*Math.PI )
      ctx.globalAlpha *= 2
      ctx.fill()
      ctx.restore()
      return ctx
    }
  }
  const plot = ( xi, xf ) => f => ctx => {
    const dx = ( xf - xi ) / ctx.canvas.width
    ctx.beginPath()
    ctx.moveTo( xi, f(xi) )
    for ( let x = xi + dx; x < xf; x += dx ) {
      ctx.lineTo( x, f(x) )
    }
    return ctx
  }
  const trace = pts => ctx => {
    ctx.moveTo(...pts[0])
    pts.forEach(([x,y]) => ctx.lineTo(x,y))
    return ctx
  }


  const hline = ctx => {
    ctx.save()
    const { a : sx, d : sy } = ctx.currentTransform
    ctx.scale( 1/sx, 1/sy )

    ctx.beginPath()
    ctx.moveTo( -ctx.canvas.width, 0 )
    ctx.lineTo( ctx.canvas.width, 0 )
    ctx.stroke()
    ctx.restore()
    return ctx
  }
  const vline = ctx => {
    ctx.save()
    const { a : sx, d : sy } = ctx.currentTransform
    ctx.scale( 1/sx, 1/sy )

    ctx.beginPath()
    ctx.moveTo( 0, -ctx.canvas.height )
    ctx.lineTo( 0, ctx.canvas.height )
    ctx.stroke()
    ctx.restore()
    return ctx
  }

  const pxCirc = ({ rd, style }) => {
    const s = style ? toStyle(style) : 0
    return ctx => {
      ctx.save()
      if (s) ctx.strokeStyle = s
      const { a : sx, d : sy } = ctx.currentTransform
      ctx.scale( 1/sx, 1/sy )

      ctx.beginPath()
      ctx.arc( 0, 0, rd, 0, 2*Math.PI )

      ctx.stroke()
      ctx.restore()
      return ctx
    }
  }


  const paintCalls = {
    clear,
    fill,
    fillAll,
    fillText,
    hline,
    image,
    plot,
    point,
    pstroke,
    pxCirc,
    sprite,
    stroke,
    strokeText,
    tiled,
    trace,
    vline,
  }

  return Object.assign( transforms, drawCalls, paintCalls, util )
})()