const ondata = (() => {
  let listeners = []
  return {
    push: data => {
      listeners.forEach(listener => listener(data))
      listeners = []
    }, 
    add: listener => {
      listeners.push(listener)
    }
  }
})()

const imports = {
  env: {
    Math_atan2: Math.atan2,
    Math_hypot: Math.hypot,
    output: function(ptr) {
      let str = copyCStr(module, ptr)
      ondata.push(JSON.parse(str))
    },
  }
}

fetch('./bin/grav_racer.wasm')
  .then(response => response.arrayBuffer())
  .then(bytes => WebAssembly.instantiate(bytes, imports))
  .then(results => {
    const mod = results.instance
    const memory = mod.exports.memory
    const module = {
      malloc: mod.exports.malloc,
      free: mod.exports.free,
      frame: mod.exports.frame,
      dealloc_str: function() {},
      run: mod.exports.run,
      memory,
    }

    window.mod = mod

    window.module = module
    window.frame = (t, dt) => state => {
      if (dt > 1/10) dt = 0
      let [ptr, len] = serialize(state)
      return new Promise(resolve => {
        ondata.add(data => resolve(data))
        module.frame(ptr, len, t, dt)
      })
    }

    Promise.all([
      loadGraphics,
      Promise.all([loadJSON('asteroid_body'), loadJSON('ship')])
    ]).then(main)
  })