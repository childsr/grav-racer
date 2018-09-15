(()=>{
  const ctx = new (window.AudioContext || window.webkitAudioContext)()

  const loadAudio = url => {
    const req = new XMLHttpRequest()
    req.open('GET', url, true)
    req.responseType = 'arraybuffer'

    return new Promise((resolve, _) => {      
      req.onload = () => {

        if(req.status === 200) {
          ctx.decodeAudioData(req.response).then(buf => resolve(buf))
        }
      }
      req.send()
    })
    
  }
  const track = n => new Audio(`res/audio/music/track${n}.mp3`)

  window.music = []

  window.sfx = {}

  loadAudio('res/audio/sfx/engine.mp3').then(
    buffer => {
      const source = ctx.createBufferSource()
      source.buffer = buffer
      source.loop = true
      source.loopStart = 0
      source.loopEnd = 6

      const gainNode = ctx.createGain()
      
      source.connect(gainNode)
      gainNode.connect(ctx.destination)
      
      gainNode.gain.value = 1e-3
      source.start()
    
      window.sfx.engine = isOn => gainNode.gain.value =
        Math.max(1e-5,
          Math.min(1,
            gainNode.gain.value + 0.07 * (isOn ? 1 : -1)
          )
        )
    }
  )
  loadAudio('res/audio/sfx/explosion.mp3').then(
    buffer => {
      const source = ctx.createBufferSource()
      source.buffer = buffer
      source.loop = false

      source.connect(ctx.destination)

      window.sfx.explosion = () => {
        const source = ctx.createBufferSource()
        source.buffer = buffer
        source.loop = false

        source.connect(ctx.destination)
        
        source.start()
      }
    }
  )

  window.music.setMute = () => {
    music.forEach(a => {
      a.volume = (soundOn ? 0.5 : 0)
    })
  }
  window.music.push(track(0))
  
  window.onclick = () => {
    window.onclick = null
    music[0].loop = true
    music[0].play()
  }

  window.actx = ctx

})()

/*
To turn engine noise on/off: window.sfx.engine(true/false)
*/