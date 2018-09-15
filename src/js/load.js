const loadImage = path => {
  // string -> string -> string -> Promise<Image>
  return new Promise(resolve => {
    const img = new Image()
    img.onload = () => {
      resolve(img)
    }
    img.src = path
  })
}

const assign = id => item => ({[id]: item})
const group = id => pairs => assign(id)(merge(pairs))
