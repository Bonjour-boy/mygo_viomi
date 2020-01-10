/*
 * @Author: your name
 * @Date: 2019-10-17 18:50:41
 * @LastEditTime : 2020-01-06 10:19:46
 * @LastEditors  : sueRimn
 * @Description: In User Settings Edit
 * @FilePath: \项目\viomi-project\webpack.config.js
 */
const webpack = require('webpack');
const glob = require('glob');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const webpackConfig = {
    entry: {},
    output:{
        //生成指定路径下的js文件
        path:path.resolve(__dirname, './dist/'),
        filename:'[name].[chunkhash:6].js'
    },
    //设置开发者工具的端口号,不设置则默认为8080端口
    devServer: {
        host:'170.2.10.37',
        inline: true,
        // port: 8181
    },
    module:{
        rules:[
            {
                test:/\.js?$/,
                exclude:/node_modules/,
                loader:'babel-loader',
                query:{
                    presets: ['env', 'es2015', 'react', 'stage-3','stage-0']
                }
            },
            {
                test: /\.(scss|sass|css)$/, 
                loader: ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader"})
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 8192
                    }
                  }
                ]
            }     
        ]
    },
    plugins: [
        new ExtractTextPlugin("[name].[chunkhash:6].css"),//生成css文件，配合HtmlWebpackPlugin插件则自动插入index.html中
        new CleanWebpackPlugin(//先把dist (就是放生产环境用的文件) 目录里的文件先清除干净，再生成新的。
            ['dist'],　 
            {
                root: __dirname,       　　　　　　　　　　
                verbose:  true,        　　　　　　　　　　
                dry:      false        　　　　　　　　　　
            }
        )
    ],
};

// 获取指定路径下的入口文件
function getEntries(globPath) {
    const files = glob.sync(globPath),//对文件的路径处理，返回一个数组
      entries = {};
    files.forEach(function(filepath) {//filepath当前元素（item）
        const split = filepath.split('/');
        const name = split[split.length - 2];
        entries[name] = './' + filepath;
    });
    return entries;
}
       
const entries = getEntries('src/**/index.js');

Object.keys(entries).forEach(function(name) {//Object.keys(给定对象的所有可枚举属性的字符串数组)
   webpackConfig.entry[name] = entries[name];//入口文件
   const plugin = new HtmlWebpackPlugin({
       filename: name + '.html',//输出的html的文件名称
       template: './public/index.html',//html模板所在的文件路径
       inject: true,
       chunks: [name]//chunks主要用于多入口文件，当你有多个入口文件，那就会编译后生成多个打包后的文件，那么chunks 就能选择你要使用那些js文件
   });
   webpackConfig.plugins.push(plugin);
})

module.exports = webpackConfig;