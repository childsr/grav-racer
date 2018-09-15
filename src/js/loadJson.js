const loadJSON = path => {
  const xhr = new XMLHttpRequest()
  xhr.overrideMimeType("application/json")
  xhr.open('GET', 'res/data/' + path + '.json', true)
  xhr.responseType = 'json'
  return new Promise((resolve, reject) => {
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const res = xhr.response
        if (res === null) reject('File not found (probably)')
        else resolve(res)
      }
    }
    xhr.send(null)
  })
}