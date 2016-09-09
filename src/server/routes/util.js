function parseGroups (body) {
  return Object.keys(body)
    .filter(key => key.includes('['))
    .map(key => key.split('[')[0])
    .reduce((acc, key) => acc.includes(key) ? acc : acc.concat([key]), [])
}

function segmentBody (resource) {
  return (req, res, next) => {
    let groupings = parseGroups(req.body)
    let body = Object.assign({}, req.body)
    req.body = groupings.concat(['']).reduce((acc, prefix) => {
      acc[prefix] = {}

      Object.keys(body)
        .filter(key => key.indexOf(`${prefix}`) === 0)
        .forEach(key => {
          let split = key.split('[')
          let newKey = split[1] ? split[1].slice(0, -1) : key
          acc[prefix][newKey] = body[key]
          delete body[key]
        })

      return acc
    }, {})

    req.body[resource] = Object.assign({}, req.body[''])
    delete req.body['']

    next()
  }
}

function catchError (next) {
  return (error) => {
    console.error(error)
    next(error)
  }
}

module.exports = { catchError, segmentBody }
