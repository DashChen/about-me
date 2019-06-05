const fs = require('fs')
const path = require('path')
const readline = require('readline')

const getMdInfo = (srcPath, file) => {
    let stat = fs.statSync(path.join(srcPath, file))
    if (stat) {
        let info = {
            name: file,
            size: stat.size,
            ctime: Date.parse(stat.ctime),
            mtime: Date.parse(stat.mtime)
        }
        if (path.extname(file).includes('.md')) {
            // readline
            //   .createInterface({
            //     input: fs.createReadStream(path.join(srcPath, file))
            //   })
            //   .on('line', function(line) {
            //     console.log('Line from file:', line)
            //   })
            let text = fs.readFileSync(path.join(srcPath, file), 'utf8')
            // 取文字總數 regex /<\s*[^>]*>|<\s*\/\s*>/g
            // 取出指定i標籤 regex /<\s*(i)[^>]*>(.*?)<\/\s*[^>]*(i)>/g
            // 取出文字長度(先去空白) regex /<s*[^>]*>|<\/s*[^>]*>|[#*`>\-\~\!\[\]]/g

            // 去空白
            text = text.replace(/\s/g, '');
            // 取出字數
            info["wordLength"] = text.replace(/<s*[^>]*>|<\/s*[^>]*>|[#*`>\-\~\!\[\]]/g, '').length
            // 取出 summary
            if (text.match(/<\s*(summary)[^>]*>(.*?)<\/\s*(summary)>/g)) {
                info["summary"] = (text.match(/<\s*(summary)[^>]*>(.*?)<\/\s*(summary)>/g)[0]).replace(/<\s*[^>]*>|<\s*\/\s*>/g, '')
            }
        }
        return info
    }
    return null

}

const getFilesList = (srcPath, files = [], callback = null, getDirectory = false) => {
    const files_ = files || []
    fs.readdirSync(srcPath).filter(file => {
        if (fs.statSync(path.join(srcPath, file)).isDirectory()) {
            if (getDirectory) {
                files_.push(file)
            }
            getFilesList(path.join(srcPath, file), files_, getDirectory)
        } else if (!getDirectory) {
            if (typeof callback == "function") {
                files_.push(callback(srcPath, file))
            } else {
                files_.push(file)
            }
        }
    })
    return files_
}
console.log(getFilesList('./pages/', [], getMdInfo))


// console.log(getFilesList('./pages/', [], true))
