// Moves the d.ts files from es2015 to the main directory.

let fs = require('fs-extra')

const dir = 'es2015'

fs.readdir(dir, function (err, files) {
  if (err) {
    throw err
  }
  for (let f of files) {
    if (f.match(/d.ts$/)) {
      let path = `${dir}/${f}`
      fs.move(path, './' + f, {
        clobber: true
      }, function (err) {
        if (err) {
          throw err
        }
      })
    }
  }
})
