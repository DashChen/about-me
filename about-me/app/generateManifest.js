const fs = require('fs')
const path = require('path')
const fm = require('front-matter')

const getFilesList = (
  srcPath,
  callback = null,
  files = [],
  getDirectory = false,
  recursively = true
) => {
  const files_ = files || []
  fs.readdirSync(srcPath).filter(file => {
    if (fs.statSync(path.join(srcPath, file)).isDirectory()) {
      if (getDirectory) {
        files_.push(file)
      }
      if (recursively) {
        getFilesList(
          path.join(srcPath, file),
          callback,
          files_,
          getDirectory,
          recursively
        )
      }
    } else if (!getDirectory) {
      if (typeof callback === 'function') {
        const obj = callback(srcPath, file)
        if (obj) {
          files_.push(obj)
        }
      }
    }
  })
  return files_
}

const articlesInfo = (srcPath, file) => {
  const stat = fs.statSync(path.join(srcPath, file))
  if (stat) {
    if (path.extname(file).includes('.md')) {
      const text = fs.readFileSync(path.join(srcPath, file), 'utf8')
      if (!text) {
      } else {
        const wholeMd = fm(text)
        const body = wholeMd.body
          .replace(/\s/g, '')
          .replace(/<s*[^>]*>|<\/s*[^>]*>|[#*`>\-~![\]]/g, '')
        const obj = Object.assign({}, wholeMd.attributes, {
          // 去空白,取出字數
          wordLength: body.length,
          bodySummary: wholeMd.body.substring(0, 100) + '...'
        })
        const create = wholeMd.attributes.created_at
        const res = {
          url:
            '/blog/' +
            [
              create.toISOString().substring(0, 10),
              path.basename(file, '.md')
            ].join('/'),
          file: `/${srcPath}/${file}`,
          data: obj,
          timestamp: create.getTime()
        }
        return res
      }
    }
  }
  return null
}

// 取文字總數 regex /<\s*[^>]*>|<\s*\/\s*>/g
// 取出指定i標籤 regex /<\s*(i)[^>]*>(.*?)<\/\s*[^>]*(i)>/g
// 取出文字長度(先去空白) regex /<s*[^>]*>|<\/s*[^>]*>|[#*`>\-\~\!\[\]]/g
// 去空白 regex /\s/g
fs.writeFile(
  './store/articles.json',
  JSON.stringify(getFilesList('articles', articlesInfo)),
  function(err) {
    if (err) throw err
    console.log('complete')
  }
)
