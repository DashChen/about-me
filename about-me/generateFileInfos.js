const fs = require('fs')
const path = require('path')
const frontmatterMarkdownLoader = require('frontmatter-markdown-loader')

const getMdInfo = (srcPath, file) => {
  const stat = fs.statSync(path.join(srcPath, file))
  if (stat) {
    if (path.extname(file).includes('.md')) {
      const info = path.join(srcPath, file)
      // const info = {
      //   name: file,
      //   size: stat.size,
      //   ctime: Date.parse(stat.ctime),
      //   mtime: Date.parse(stat.mtime)
      // }
      // // readline
      // //   .createInterface({
      // //     input: fs.createReadStream(path.join(srcPath, file))
      // //   })
      // //   .on('line', function(line) {
      // //     console.log('Line from file:', line)
      // //   })
      // let text = fs.readFileSync(path.join(srcPath, file), 'utf8')
      // // 取文字總數 regex /<\s*[^>]*>|<\s*\/\s*>/g
      // // 取出指定i標籤 regex /<\s*(i)[^>]*>(.*?)<\/\s*[^>]*(i)>/g
      // // 取出文字長度(先去空白) regex /<s*[^>]*>|<\/s*[^>]*>|[#*`>\-\~\!\[\]]/g
      // // 去空白
      // text = text.replace(/\s/g, '')
      // // 取出字數
      // info.wordLength = text.replace(
      //   /<s*[^>]*>|<\/s*[^>]*>|[#*`>\-\~\!\[\]]/g,
      //   ''
      // ).length
      // // 取出 summary
      // let reg = /<\s*(summary)[^>]*>(.*?)<\/\s*(summary)>/g
      // if (text.match(reg)) {
      //   info.summary = text.match(reg)[0].replace(/<\s*[^>]*>|<\s*\/\s*>/g, '')
      // }
      // // 取出標籤 tag
      // if (text.match(/<\s*(i)[^>]*>(.*?)<\/\s*(i)>/g)) {
      //   const tag = text
      //     .match(/<\s*(i)[^>]*>(.*?)<\/\s*(i)>/g)
      //     .filter(content => {
      //       reg = /<[^>]*class="fasfa-tag">|<\/[^>]*>/g
      //       if (content.match(reg)) {
      //         return content.replace(reg, '')[0]
      //       }
      //     })
      //   if (tag.length > 0) {
      //     info.tag = tag[0].replace(reg, '')
      //   }
      // }
      return info
    }
  }
  return null
}

const getFilesList = (
  srcPath,
  files = [],
  callback = null,
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
          files_,
          callback,
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
// // 取得文章內容
// const articleContent = getFilesList('./pages/articles', [], getMdInfo)
// // 取得文章分類(就是取得資料夾)
// const articleType = getFilesList('./pages/articles', [], null, true, false)
//
// const obj = {
//   // 文章數量
//   articleLength: articleContent.length,
//   // 文章內容
//   articleContent: articleContent,
//   // 文章分類數
//   articleTypes: articleType.length,
//   // 文章分類
//   articleType: articleType
// }
//
// fs.writeFile('articles.json', JSON.stringify(obj), function(err) {
//   if (err) throw err
//   console.log('complete')
// })
fs.writeFile(
  './store/articles.json',
  JSON.stringify(getFilesList('./content/blogs', [], getMdInfo)),
  function(err) {
    if (err) throw err
    console.log('complete')
  }
)
