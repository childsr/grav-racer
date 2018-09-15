const loadGraphics = (() => {

  const loadImg = (id, name) => loadImage('res/png/' + name + '.png')
    .then(q.image)
    .then(assign(id))
  const loadSpt = (id, name) => loadImage('res/png/' + name + '.png')
    .then(q.sprite)
    .then(assign(id))

  const characters = Promise.all(
    mapr(10)(i => loadImg(i, 'characters/digits/' + i.toString())).concat(
      mapr(26)(i => {
        const char = String.fromCharCode(i + 97)
        return loadImg(char, 'characters/letters/' + char)
      })
    ).concat([
      loadImg(':', 'characters/misc/colon'),
      loadImg('.', 'characters/misc/point'),
      loadImg('<', 'characters/misc/left'),
      loadImg('>', 'characters/misc/right'),
    ])
  ).then(group('characters'))

  const stars = (()=>{
    const density = 3
    const size = 2**density
    const cell = 64/size
  
    const field =
      mapr(size)(x => mapr(size)(y => [x,y]))
        .reduce(R.concat)
        .map(R.map(R.multiply(cell)))
        .map(R.map(x => x + randInt(cell-1)))
      
    const canvas = toCanvas(
      q.pipe([
        q.fillAll(10,20,40),
        q.a(0.3)(
          q.pipe(
            field.map(q.vxy).map(xy =>
              q.fill(
                170 + randInt(70),
                180 + randInt(70),
                195 + randInt(60),
              )(xy(q.rect))
            )
          )
        ),
      ])
    )
    return toPromise(q.image(canvas))
  })().then(assign('stars'))

  const asteroids = Promise.all(
    mapr(3)(i => loadSpt('asteroid' + (i+1), 'asteroid' + (i+1)))
  ).then(group('asteroids'))
  const shipImg = loadSpt('ship', 'ship')
  const ship_red = loadSpt('ship_red', 'ship_red')
  const sound = loadImg('sound', 'sound')
  const mute = loadImg('mute', 'mute')



  return Promise.all([
    characters,
    asteroids,
    shipImg,
    ship_red,
    stars,
    sound,
    mute,
  ]).then(merge)

})()