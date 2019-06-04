const fs = require('fs')
const path = require('path')
const readline = require('readline')
const getFilesList = (srcPath, files = [], getDirectory = false) => {
  const files_ = files || []
  fs.readdirSync(srcPath).filter(file => {
    if (fs.statSync(path.join(srcPath, file)).isDirectory()) {
      if (getDirectory) {
        files_.push(file)
      }
      getFilesList(path.join(srcPath, file), files_, getDirectory)
    } else if (!getDirectory) {
      let stat = fs.statSync(path.join(srcPath, file))
      files_.push({
        name: file,
        size: stat.size,
        ctime: Date.parse(stat.ctime),
        mtime: Date.parse(stat.mtime)
      })
      if (path.extname(file).includes('.md')) {
        // readline
        //   .createInterface({
        //     input: fs.createReadStream(path.join(srcPath, file))
        //   })
        //   .on('line', function(line) {
        //     console.log('Line from file:', line)
        //   })
        let text = fs.readFileSync(path.join(srcPath, file), 'utf8')
        // 取文字總數 regex /<\s*[^>]*>|<\s*/\s*>/g
        // 取出指定i標籤 regex /<\s*(i)[^>]*>(.*?)</\s*[^>]*(i)>/g
        console.log(text)
      }
    }
  })
  return files_
}
console.log(getFilesList('./pages/', []))
console.log(getFilesList('./pages/', [], true))
