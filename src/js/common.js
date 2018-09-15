const pxSize = 10
const res = 64

Object.prototype.pipe = function(f) { return f(this) }
const {filter, map} = R
const mapr = n => f => Array(n).fill(null).map((_,i) => f(i))
const randInt = (lo, hi = null) => (
  hi === null ?
    Math.floor(lo*Math.random()) :
    lo + Math.floor((hi-lo)*Math.random())
)
const randr = (lo, hi) => lo + (hi-lo)*Math.random()
const forr = n => f => {
  for (let i = 0; i < n; i++) f(i)
}
const merge = objs => Object.assign({},...objs)
const toPromise = val => new Promise(resolve => resolve(val))
const map2 = f => arr1 => arr2 => arr1.map((a,i) => f(a,arr2[i]))
const [add, mul, sub, div] = [R.add, R.multiply, R.subtract, R.divide]
const neg = x => -x
const addv = map2(add)
const negv = map(neg)
const rsub = b => a => a - b
const rdiv = b => a => a / b
const clampLo = lo => x => x < lo ? lo : x
const clampHi = hi => x => x > hi ? hi : x
const clamp1 = x => x > 1 ? 1 : (x < 0 ? 0 : x)
const pvec = (r, theta) =>
  [Math.cos, Math.sin]
    .map(R.applyTo(theta*Math.PI/180))
    .map(mul(r))
const nrst30th = x => Math.round(30*x)/30
const cmap = f => arr => {
  arr.forEach((x,i) => arr[i] = f(x,i))
  return arr
}
const imap = f => arr => {
  arr.forEach((_,i) => arr[i] = f(i))
  return arr
}

// Copy a null-terminated string from the buffer pointed to.
// Consumes the old data and thus deallocated it.
function copyCStr(module, ptr) {
  let orig_ptr = ptr;
  const collectCString = function* () {
    let memory = new Uint8Array(module.memory.buffer);
    while (memory[ptr] !== 0) {
      if (memory[ptr] === undefined) { throw new Error("Tried to read undef mem") }
      yield memory[ptr]
      ptr += 1
    }
  }

  const buffer_as_u8 = new Uint8Array(collectCString())
  const utf8Decoder = new TextDecoder("UTF-8");
  const buffer_as_utf8 = utf8Decoder.decode(buffer_as_u8);
  module.dealloc_str(orig_ptr);
  return buffer_as_utf8
}

const serialize = obj => {
  const data = JSON.stringify(obj)
  const len = data.length
  let ptr = module.malloc(len)
  const usub = new Uint8Array(module.memory.buffer, ptr, len)
  
  usub.forEach((_,i) => {
    usub[i] = data.charCodeAt(i)
  })
  
  return [ptr, len]
}
const liftp = f => (...args) => new Promise(resolve => resolve(f(...args)))
const topx = num => num + 'px'
const half = mul(0.5)
const [winw, winh] = [innerWidth, innerHeight]
const [cx, cy] = [winw, winh].map(half)
const offset = [cx, cy].map(add(-pxSize*res/2))

const setBestTime = level => val => {
  const bestTimes = ('bestTimes' in localStorage) ?
    JSON.parse(localStorage.bestTimes) :
    Array(10).fill(Math.pow(2,25))

  bestTimes[level] = val
  localStorage.bestTimes = JSON.stringify(bestTimes)
}
const getBestTime = level => {
  const bestTimes = ('bestTimes' in localStorage) ?
    JSON.parse(localStorage.bestTimes) :
    Array(10).fill(Math.pow(2,25).toString())

  return bestTimes[level]
}
const setUnlocked = level => val => {
  const unlocked = ('unlocked' in localStorage) ?
    JSON.parse(localStorage.unlocked) :
    [true, ...(Array(9).fill(false))]

  unlocked[level] = val
  localStorage.unlocked = JSON.stringify(unlocked)
}
const getUnlocked = () => {
  const unlocked = ('unlocked' in localStorage) ?
    JSON.parse(localStorage.unlocked) :
    [true, ...(Array(9).fill(false))]

  return unlocked
}
