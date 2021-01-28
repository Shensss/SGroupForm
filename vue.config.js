const path = require('path')
const fs = require('fs')
const join = path.join

function getEntries (path) {
    let files = fs.readdirSync(resolve(path))
    const entries = files.reduce((ret, item) => {
        const itemPath = join(path, item)
        const isDir = fs.statSync(itemPath).isDirectory()
        if (isDir) {
            ret[item] = resolve(join(itemPath, 'index.js'))
        } else {
            const [name] = item.split('.')
            ret[name] = resolve(`${ itemPath }`)
        }
        return ret
    }, {})
    return entries
}

function resolve (dir) {
    return path.resolve(__dirname, dir)
}

const devConfig = {
    devServer: {
        port: 8091,//固定端口
        hot: true,//开启热更新
        open: 'Google Chrome'//固定打开浏览器
    },
    pages: {
        index: {
            entry: 'examples/main.js',
            template: 'public/index.html',
            filename: 'index.html',
        },
    },
    configureWebpack: {
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                '@': resolve('packages'),
                'assets': resolve('examples/assets'),
                'views': resolve('examples/views'),
            }
        },
    },
    chainWebpack: config => {
        config.module
            .rule('js')
            .include
            .add('/packages')
            .end()
            .use('babel')
            .loader('babel-loader')
            .tap(options => {
                return options
            })
    },
}
const buildConfig = {
    outputDir: 'lib',
    productionSourceMap: false,
    css: {
        sourceMap: true,
        extract: {
            filename: 'theme/[name].css'//在lib文件夹中建立style文件夹中，生成对应的css文件。
        }
    },
    configureWebpack: {
        entry: {
            ...getEntries('packages'),
        },
        output: {
            filename: '[name].js',
            libraryTarget: 'commonjs2',
        }
    },
    chainWebpack: config => {
        config.optimization.delete('splitChunks')
        config.plugins.delete('copy')
        config.plugins.delete('html')
        config.plugins.delete('preload')
        config.plugins.delete('prefetch')
        config.plugins.delete('hmr')
        config.entryPoints.delete('app')
        config.module
            .rule('js')
            .include
            .add('/packages')
            .end()
            .use('babel')
            .loader('babel-loader')
            .tap(options => {
                return options
            })
    },
}
console.log(process.env.NODE_ENV)
module.exports = process.env.NODE_ENV === 'development' ? devConfig : buildConfig
