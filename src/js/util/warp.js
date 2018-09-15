(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
(function (global){
const common = require('../../common'); const {
  functions: {
    array: {
      filter,
      fold,
      foldr,
      map,
      mapr,
      range,
      scan,
    },
    func: {
      compose: C,
      pipe: P,
    },
    math: {
      add,
      div,
      mul,
      sub,
      floor,
      ceil,
      sqrt,
    },
  },
} = common

const env = (typeof global === 'undefined') ? window : global
env.env = env
const makeObjectGlobal = obj => Object.assign(env, obj)

env.PI = Math.PI
env.TAU = 2*Math.PI

module.exports = {
  common,

  filter,
  fold,
  foldr,
  map,
  mapr,
  range,
  scan,
  C,
  P,
  add,
  div,
  mul,
  sub,
  floor,
  ceil,
  sqrt,
  array: common.functions.array,
  func: common.functions.func,
  math: common.functions.math,
  vector: common.functions.math.vector,
  object: common.functions.object,
  string: common.functions.string,
}

makeObjectGlobal(module.exports)

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common":3}],3:[function(require,module,exports){
(function (__dirname){
'use strict'

const fs = require('fs')

const ignore = []

const init = ( obj, dir ) => fs.readdirSync(dir).map(
  file => file.split('.')
).filter(
  ([ name, ext ]) => !ignore.includes(name)
).forEach(
  ([ name, ext ]) => {
    if (!ext) {
      obj[name] = {}
      init( obj[name], dir + '/' + name )
    }
    if ( ext === 'js' ) {
      Object.defineProperty( obj, name, {
        get: function () {
          return require( dir + '/' + name )
        }
      } )
    }
  }
)

module.exports = {}
init( module.exports, __dirname )
module.exports.prelude = require('../prelude')

}).call(this,"/Dropbox/chaostheory/common/src")
},{"../prelude":2,"fs":1}],4:[function(require,module,exports){
module.exports = {
  dataflow: {
    _signal: {
      evaluator: require('/home/ryan/Dropbox/chaostheory/warpcore/src/dataflow/_signal/evaluator'),
      signal: require('/home/ryan/Dropbox/chaostheory/warpcore/src/dataflow/_signal/signal'),
      system: require('/home/ryan/Dropbox/chaostheory/warpcore/src/dataflow/_signal/system')
    },
    cache: require('/home/ryan/Dropbox/chaostheory/warpcore/src/dataflow/cache'),
    eval: require('/home/ryan/Dropbox/chaostheory/warpcore/src/dataflow/eval'),
    eventTrigger: require('/home/ryan/Dropbox/chaostheory/warpcore/src/dataflow/eventTrigger'),
    signal: {
      atom: require('/home/ryan/Dropbox/chaostheory/warpcore/src/dataflow/signal/atom'),
      evaluate: require('/home/ryan/Dropbox/chaostheory/warpcore/src/dataflow/signal/evaluate'),
      signal: require('/home/ryan/Dropbox/chaostheory/warpcore/src/dataflow/signal/signal')
    },
    stream: {
      funcs: {
        chain: require('/home/ryan/Dropbox/chaostheory/warpcore/src/dataflow/stream/funcs/chain'),
        drop: require('/home/ryan/Dropbox/chaostheory/warpcore/src/dataflow/stream/funcs/drop'),
        filter: require('/home/ryan/Dropbox/chaostheory/warpcore/src/dataflow/stream/funcs/filter'),
        fork: require('/home/ryan/Dropbox/chaostheory/warpcore/src/dataflow/stream/funcs/fork'),
        log: require('/home/ryan/Dropbox/chaostheory/warpcore/src/dataflow/stream/funcs/log'),
        map: require('/home/ryan/Dropbox/chaostheory/warpcore/src/dataflow/stream/funcs/map'),
        pipe: require('/home/ryan/Dropbox/chaostheory/warpcore/src/dataflow/stream/funcs/pipe'),
        scan: require('/home/ryan/Dropbox/chaostheory/warpcore/src/dataflow/stream/funcs/scan'),
        take: require('/home/ryan/Dropbox/chaostheory/warpcore/src/dataflow/stream/funcs/take'),
        throttle: require('/home/ryan/Dropbox/chaostheory/warpcore/src/dataflow/stream/funcs/throttle'),
        write: require('/home/ryan/Dropbox/chaostheory/warpcore/src/dataflow/stream/funcs/write')
      },
      send: require('/home/ryan/Dropbox/chaostheory/warpcore/src/dataflow/stream/send'),
      sendto: require('/home/ryan/Dropbox/chaostheory/warpcore/src/dataflow/stream/sendto'),
      stream: require('/home/ryan/Dropbox/chaostheory/warpcore/src/dataflow/stream/stream')
    },
    stream2: {
      stream: require('/home/ryan/Dropbox/chaostheory/warpcore/src/dataflow/stream2/stream')
    }
  },
  engine: {
    core: {
      core: require('/home/ryan/Dropbox/chaostheory/warpcore/src/engine/core/core')
    },
    gamepad: {
      axis: require('/home/ryan/Dropbox/chaostheory/warpcore/src/engine/gamepad/axis'),
      button: require('/home/ryan/Dropbox/chaostheory/warpcore/src/engine/gamepad/button'),
      gamepad: require('/home/ryan/Dropbox/chaostheory/warpcore/src/engine/gamepad/gamepad')
    },
    signalSources: {
      cursor: require('/home/ryan/Dropbox/chaostheory/warpcore/src/engine/signalSources/cursor'),
      keydown: require('/home/ryan/Dropbox/chaostheory/warpcore/src/engine/signalSources/keydown')
    },
    streamSources: {
      animationFrame: require('/home/ryan/Dropbox/chaostheory/warpcore/src/engine/streamSources/animationFrame'),
      emitter: require('/home/ryan/Dropbox/chaostheory/warpcore/src/engine/streamSources/emitter'),
      event: require('/home/ryan/Dropbox/chaostheory/warpcore/src/engine/streamSources/event'),
      frameTick: require('/home/ryan/Dropbox/chaostheory/warpcore/src/engine/streamSources/frameTick'),
      funcs: {
        map: require('/home/ryan/Dropbox/chaostheory/warpcore/src/engine/streamSources/funcs/map'),
        merge: require('/home/ryan/Dropbox/chaostheory/warpcore/src/engine/streamSources/funcs/merge')
      },
      keypress: require('/home/ryan/Dropbox/chaostheory/warpcore/src/engine/streamSources/keypress'),
      keyrelease: require('/home/ryan/Dropbox/chaostheory/warpcore/src/engine/streamSources/keyrelease'),
      mousemove: require('/home/ryan/Dropbox/chaostheory/warpcore/src/engine/streamSources/mousemove'),
      streamSource: require('/home/ryan/Dropbox/chaostheory/warpcore/src/engine/streamSources/streamSource')
    }
  }
}
},{"/home/ryan/Dropbox/chaostheory/warpcore/src/dataflow/_signal/evaluator":6,"/home/ryan/Dropbox/chaostheory/warpcore/src/dataflow/_signal/signal":7,"/home/ryan/Dropbox/chaostheory/warpcore/src/dataflow/_signal/system":8,"/home/ryan/Dropbox/chaostheory/warpcore/src/dataflow/cache":9,"/home/ryan/Dropbox/chaostheory/warpcore/src/dataflow/eval":10,"/home/ryan/Dropbox/chaostheory/warpcore/src/dataflow/eventTrigger":11,"/home/ryan/Dropbox/chaostheory/warpcore/src/dataflow/signal/atom":12,"/home/ryan/Dropbox/chaostheory/warpcore/src/dataflow/signal/evaluate":13,"/home/ryan/Dropbox/chaostheory/warpcore/src/dataflow/signal/signal":14,"/home/ryan/Dropbox/chaostheory/warpcore/src/dataflow/stream/funcs/chain":15,"/home/ryan/Dropbox/chaostheory/warpcore/src/dataflow/stream/funcs/drop":16,"/home/ryan/Dropbox/chaostheory/warpcore/src/dataflow/stream/funcs/filter":17,"/home/ryan/Dropbox/chaostheory/warpcore/src/dataflow/stream/funcs/fork":18,"/home/ryan/Dropbox/chaostheory/warpcore/src/dataflow/stream/funcs/log":19,"/home/ryan/Dropbox/chaostheory/warpcore/src/dataflow/stream/funcs/map":20,"/home/ryan/Dropbox/chaostheory/warpcore/src/dataflow/stream/funcs/pipe":21,"/home/ryan/Dropbox/chaostheory/warpcore/src/dataflow/stream/funcs/scan":22,"/home/ryan/Dropbox/chaostheory/warpcore/src/dataflow/stream/funcs/take":23,"/home/ryan/Dropbox/chaostheory/warpcore/src/dataflow/stream/funcs/throttle":24,"/home/ryan/Dropbox/chaostheory/warpcore/src/dataflow/stream/funcs/write":25,"/home/ryan/Dropbox/chaostheory/warpcore/src/dataflow/stream/send":26,"/home/ryan/Dropbox/chaostheory/warpcore/src/dataflow/stream/sendto":27,"/home/ryan/Dropbox/chaostheory/warpcore/src/dataflow/stream/stream":28,"/home/ryan/Dropbox/chaostheory/warpcore/src/dataflow/stream2/stream":29,"/home/ryan/Dropbox/chaostheory/warpcore/src/engine/core/core":30,"/home/ryan/Dropbox/chaostheory/warpcore/src/engine/gamepad/axis":31,"/home/ryan/Dropbox/chaostheory/warpcore/src/engine/gamepad/button":32,"/home/ryan/Dropbox/chaostheory/warpcore/src/engine/gamepad/gamepad":33,"/home/ryan/Dropbox/chaostheory/warpcore/src/engine/signalSources/cursor":34,"/home/ryan/Dropbox/chaostheory/warpcore/src/engine/signalSources/keydown":35,"/home/ryan/Dropbox/chaostheory/warpcore/src/engine/streamSources/animationFrame":36,"/home/ryan/Dropbox/chaostheory/warpcore/src/engine/streamSources/emitter":37,"/home/ryan/Dropbox/chaostheory/warpcore/src/engine/streamSources/event":38,"/home/ryan/Dropbox/chaostheory/warpcore/src/engine/streamSources/frameTick":39,"/home/ryan/Dropbox/chaostheory/warpcore/src/engine/streamSources/funcs/map":40,"/home/ryan/Dropbox/chaostheory/warpcore/src/engine/streamSources/funcs/merge":41,"/home/ryan/Dropbox/chaostheory/warpcore/src/engine/streamSources/keypress":42,"/home/ryan/Dropbox/chaostheory/warpcore/src/engine/streamSources/keyrelease":43,"/home/ryan/Dropbox/chaostheory/warpcore/src/engine/streamSources/mousemove":44,"/home/ryan/Dropbox/chaostheory/warpcore/src/engine/streamSources/streamSource":45}],5:[function(require,module,exports){
module.exports = require('/home/ryan/Dropbox/chaostheory/common')

},{"/home/ryan/Dropbox/chaostheory/common":3}],6:[function(require,module,exports){
const evaluator = signals => {
  const eval_ = inputId => {
    const node = signals[inputId]
    if (!node.f) return node
    return node.f( ...node.inputs.map(eval_) )
  }
  return eval_
}

module.exports = evaluator

},{}],7:[function(require,module,exports){
function signal( inputs, f ) {
  if (arguments.length === 1) return inputs
  else return { inputs, f }
}

module.exports = signal

},{}],8:[function(require,module,exports){
const common = require('common')
const { map: mapObj } = common.functions.object
const { filter } = common.functions.array
const { id : idf } = common.functions.func
const evaluator = require('./evaluator')

const openPorts = signals => filter(
  signalId => signals[signalId] === null
)(Object.keys(signals))
const checkOutputs = ( signals, outputMap ) => {
  Object.keys(outputMap).forEach(
    id => {
      const signalId = outputMap[id]
      if (!signals.hasOwnProperty(signalId)) {
        throw '[checkOutputs]: no signal with id \'' + signalId +
          '\' present in signals.'
      }
    }
  )
}

const system = signals => {
  const inputPorts = openPorts(signals)
  return outputMap => {
    //outputMap: { <id>: signalId } //id: alias, signalId: id in signals
    checkOutputs( signals, outputMap )

    const signalMap = mapObj(idf)(signals)
    inputPorts.forEach( id => signalMap[id] = null )
    const eval_ = evaluator(signalMap)

    return inputs => {
      Object.keys(inputs).forEach(
        id => {
          if ( inputPorts.includes(id) ) {
            signalMap[id] = inputs[id]
          }
        }
      )
      return mapObj(eval_)(outputMap)
    }
  }
}

module.exports = system

/*
  signature: signal[] -> { <id>: signalId, ... } -> { <signalId>: val, ... } -> { <id>: val }
  usage:
    Pass in an object of connected signals.
    Then pass in an object where each key is the external name of an output,
    and the corresponding value is the id to an output signal in 'signals'.

  Signals may have multiple input nodes, each node may only have one source.
  Signals may only have one output node, node may have multiple destinations.

  TODO: Optimize by tracking the system state and avoiding unnecessary
        calculations.
*/

},{"./evaluator":6,"common":5}],9:[function(require,module,exports){
const cache = ( val = null ) => ({
  signal : [ () => val, [] ],
  stream : [ newVal => val = newVal, null ],
})

module.exports = cache

},{}],10:[function(require,module,exports){
const evaluate = require('./signal/evaluate')
const st = require('./stream/stream')

const eval = sig => st( () => evaluate(sig) )

module.exports = eval

},{"./signal/evaluate":13,"./stream/stream":28}],11:[function(require,module,exports){
/*
  'eventType' is anything that uniquely identifies a certain type of event.
  'dispatch' is a function that can take an eventType an trigger the associated
    event.
  'signal' is a signal whose 'f' returns a boolean, indicating whether to
    trigger the event.
*/

const eventTrigger = dispatch => eventType => signal => [
  (...args) => {
    const result = signal(...args)
    if (result) dispatch(eventType)
  },
  signal.inputs,
]

module.exports = eventTrigger

},{}],12:[function(require,module,exports){
const atom = f => Object.freeze([ f, Object.freeze([]) ])

module.exports = atom

},{}],13:[function(require,module,exports){
const evaluate = signal => {
  const [ f, inputs ] = signal
  if (!inputs.length) return f()
  return f( ...inputs.map(evaluate) )
}

module.exports = evaluate

},{}],14:[function(require,module,exports){
const signal = f => (...inputSignals) =>
  Object.freeze([ f, Object.freeze(inputSignals) ])

module.exports = signal

},{}],15:[function(require,module,exports){
const { functions: { array: { foldr } } } = require('common')
const stream = require('../stream')
const pipe = require('./pipe')

const chain = (...streams) => foldr(pipe)(streams)

module.exports = chain

},{"../stream":28,"./pipe":21,"common":5}],16:[function(require,module,exports){
const drop = n => {
  let c = 0
  let f = x => {
    if ( c < n ) {
      c++
      return null
    }
    return x
  }
  // return stream(f)
  return [f, null]
}

module.exports = drop

},{}],17:[function(require,module,exports){
const stream = require('../stream')
const pipe = require('./pipe')

const filter = f => {
  const g = x => {
    if (!f(x)) return null;
    return x
  }
  return stream(g)
}

module.exports = filter

},{"../stream":28,"./pipe":21}],18:[function(require,module,exports){
const { functions: { array: { fold } } } = require('common')
const stream = require('../stream')
const pipe = require('./pipe')

const fork = (...streams) => fold(pipe)([stream(x=>x),...streams])

module.exports = fork

},{"../stream":28,"./pipe":21,"common":5}],19:[function(require,module,exports){
const log = [ arg => {
  console.log(arg)
  return arg
}, null ]

module.exports = log

},{}],20:[function(require,module,exports){
const stream = require('../stream')

const map = f => stream(f)

module.exports = map

},{"../stream":28}],21:[function(require,module,exports){
const pipe = stm1 => stm2 => [ stm1[0], [ stm2, stm1[1] ] ]

module.exports = pipe;

},{}],22:[function(require,module,exports){
const stream = require('../stream')
const pipe = require('./pipe')

const scan = f => stm => {
  let acc = null
  let start = true
  const g = x => {
    if (start) {
      start = false
      acc = x
    }
    else {
      acc = f(acc)(x)
    }
    return acc
  }
  return stream(g)
}

module.exports = scan

},{"../stream":28,"./pipe":21}],23:[function(require,module,exports){
const take = n => {
  let c = 0
  let f = x => {
    if ( c >= n ) return null
    c++
    return x
  }
  // return stream(f)
  return [f, null]
}

module.exports = take

},{}],24:[function(require,module,exports){
const stream = require('../stream')
const send = require('../send')
const pipe = require('./pipe')

const throttle = maxRate => {
  const interval = 1000 / maxRate
  let open = true
  const f = x => {
    if (open) {
      open = false
      setTimeout( () => {
        open = true
      }, interval )
      return x
    }
    else {
      return null
    }
  }
  return stream(f)
}

module.exports = throttle

},{"../send":26,"../stream":28,"./pipe":21}],25:[function(require,module,exports){
const {writeto} = require('common').functions.mutable
const stream = require('../stream')

const write = obj => key => stream(writeto(obj)(key))

module.exports = write

},{"../stream":28,"common":5}],26:[function(require,module,exports){
const common = require('common')
const sendto = require('./sendto')
const {
  functions : {
    dataStructures : {
      list : {
        car : f, cdr : nexts, each
      }
    }
  }
} = common

const send = val => stream => {
  // a -> stream -> ()
  if (val instanceof Promise) {
    val.then(sendto(stream))
  }
  else {
    const result = f(stream)(val)
    if (result === null) return
    each(s => send(result)(s))(nexts(stream))
  }
}

module.exports = send

/*
  Pass in the initial value and then stream to send it to.
  Nothing is returned, but the value will pass through the stream until it
  triggers the function at the end.
*/

},{"./sendto":27,"common":5}],27:[function(require,module,exports){
const send = require('./send')

module.exports = stream => val => send(val)(stream)

},{"./send":26}],28:[function(require,module,exports){
const common = require('common')
const {
  functions : {
    dataStructures : {
      list : {
        arr2list
      },
    }
  }
} = common

// ( a -> b ) -> [ a -> b, list<stream> ]
const stream = f => [ f, null ]

module.exports = stream

/*
  A stream is a linked list, in the form [ a -> b, list<stream> ]
  i.e. [ f, nexts ], where f is the transformation from the input to the output
    and nexts is a list of all the streams to send the output to.
*/

},{"common":5}],29:[function(require,module,exports){
class Stream {
  constructor(f, children = []) {
    this.data = Object.freeze({f, children})
  }
  send(val) {
    if (val instanceof Promise) {
      val.then(val1 => this.send(val1))
    }
    else {
      const result = this.data.f(val)
      if (result === null) return
      this.data.children.forEach(s => s.send(result))
    }
  }
  pipe(other) {
    return new Stream(this.f, this.children.concat([other]))
  }
}
},{}],30:[function(require,module,exports){
/*
  Input Data:
    -

*/

},{}],31:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],32:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],33:[function(require,module,exports){
const cache = require('../../dataflow/cache')
const mousemove = require('../streamSources/mousemove')
const atom = require('../../dataflow/signal/atom')

const atoms = index => {
  console.log(`controller ${index} connected`)
  return {
    axis: id => atom( () => navigator.getGamepads()[index].axes[id] ),
    button: id => {
      console.log(index)
      return atom( () => navigator.getGamepads()[index].buttons[id] )
    },
  }
}
const gamepad = index => then => window.addEventListener(
  'gamepadconnected', () => then(atoms(index))
)

module.exports = gamepad

},{"../../dataflow/cache":9,"../../dataflow/signal/atom":12,"../streamSources/mousemove":44}],34:[function(require,module,exports){
const cache = require('../../dataflow/cache')
const mousemove = require('../streamSources/mousemove')
const pipe = require('../../dataflow/stream/funcs/pipe')

const cursor = element => {
  const position = cache([0,0])
  mousemove(element)(position.stream)
  return position.signal
}

module.exports = cursor

},{"../../dataflow/cache":9,"../../dataflow/stream/funcs/pipe":21,"../streamSources/mousemove":44}],35:[function(require,module,exports){
const [ keypress, keyrelease, event ] = [
  require('../streamSources/keypress'),
  require('../streamSources/keyrelease'),
  require('../streamSources/event'),
]
const stream = require('../../dataflow/stream/stream')

const keydown = element => code => {
  let down = false
  const kp = keypress(element)(code)(
    stream( () => down = true )
  )
  const kr = keyrelease(element)(code)(
    stream( () => down = false )
  )
  event(element)('blur')(
    stream( () => down = false )
  )
  return [ () => down, [] ]
}

module.exports = keydown

},{"../../dataflow/stream/stream":28,"../streamSources/event":38,"../streamSources/keypress":42,"../streamSources/keyrelease":43}],36:[function(require,module,exports){
const send = require('../../dataflow/stream/send')

const animationFrame = stream => {
  let stop = false
  let t0 = -1
  const a0 = ms => {
    t0 = ms
    a(ms)
  }
  const a = ms => {
    requestAnimationFrame(a)
    send((ms - t0) / 1000)(stream)
  }
  requestAnimationFrame(a0)
}

module.exports = animationFrame

},{"../../dataflow/stream/send":26}],37:[function(require,module,exports){
const send = require('../../dataflow/stream/send')

// event: EventTarget -> eventType: str -> stream -> ()
const emitter = eventTarget => eventType => stream => {
  eventTarget.on(eventType, e => {
    send(e)(stream)
  })
  return stream
}

module.exports = emitter

},{"../../dataflow/stream/send":26}],38:[function(require,module,exports){
const send = require('../../dataflow/stream/send')

// event: EventTarget -> eventType: str -> stream -> ()
const event = eventTarget => eventType => stream => {
  eventTarget.addEventListener(eventType, e => {
    send(e)(stream)
  })
  return stream
}

module.exports = event

},{"../../dataflow/stream/send":26}],39:[function(require,module,exports){
const send = require('../../dataflow/stream/send')

const frameTick = stream => {
  let stop = false
  let frameNo = 0
  const a = ms => {
    requestAnimationFrame(a)
    send(frameNo++)(stream)
  }
  requestAnimationFrame(a)
}

module.exports = frameTick

},{"../../dataflow/stream/send":26}],40:[function(require,module,exports){
const st = require('../../../dataflow/stream/stream')
const send = require('../../../dataflow/stream/send')
const pipe = require('../../../dataflow/stream/funcs/pipe')

const map = f => streamSource => stream => {
  streamSource(pipe(st(f))(stream))
  return stream
}

module.exports = map

},{"../../../dataflow/stream/funcs/pipe":21,"../../../dataflow/stream/send":26,"../../../dataflow/stream/stream":28}],41:[function(require,module,exports){
const merge = ( ...streamSources ) => (...streams) => {
  streamSources.forEach( ss => ss(...streams) )
}

module.exports = merge

},{}],42:[function(require,module,exports){
const send = require('../../dataflow/stream/send')
const st = require('../../dataflow/stream/stream')
const pipe = require('../../dataflow/stream/funcs/pipe')
const event = require('./event')
const keyrelease = require('./keyrelease')

const keypress = element => code => stream => {
  let down = false
  keyrelease(element)(code)(st(() => down = false))
  event(element)('blur')(st( () => down = false ))
  element.addEventListener( 'keydown', ({code:c,timeStamp}) => {
    if ( code === c && !down ) {
      down = true
      send(timeStamp)(stream)
    }
  })
  return stream1 => pipe
}

module.exports = keypress

},{"../../dataflow/stream/funcs/pipe":21,"../../dataflow/stream/send":26,"../../dataflow/stream/stream":28,"./event":38,"./keyrelease":43}],43:[function(require,module,exports){
const send = require('../../dataflow/stream/send')
const keyrelease = element => code => stream => {
  element.addEventListener( 'keyup', ({code:c,timeStamp}) => {
    if ( code === c ) {
      send(timeStamp)(stream)
    }
  } )
}

module.exports = keyrelease

},{"../../dataflow/stream/send":26}],44:[function(require,module,exports){
const event = require('./event')
const fork = require('../../dataflow/stream/funcs/fork')
const pipe = require('../../dataflow/stream/funcs/pipe')
const st = require('../../dataflow/stream/stream')

// event: element -> eventType -> stream
const mousemove = element => stream =>
  (event
    (element)
    ('mousemove')
    (pipe
      (st (({clientX,clientY}) => [ clientX, clientY ]))
      (stream)))

module.exports = mousemove

},{"../../dataflow/stream/funcs/fork":18,"../../dataflow/stream/funcs/pipe":21,"../../dataflow/stream/stream":28,"./event":38}],45:[function(require,module,exports){
// StreamSource: stream -> StreamSource //side effect of adding an event listener

const StreamSource = onAdd => {
  return stream => {
    onAdd(stream)
  }
}

},{}]},{},[4]);
