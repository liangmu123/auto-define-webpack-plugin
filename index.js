const webpack = require('webpack')
const { getEnvConfig } = require('./lib/utils')

class AutoDefineWebpackPlugin {
  constructor (options = {}) {
    this.options = options
  }
  apply (compiler) {
    // 获取配置
    let envConfig = getEnvConfig(this.options)
    // 转换配置为json格式
    envConfig = this.transformToJson(envConfig)
    new webpack.DefinePlugin({
      'process.env': envConfig
    }).apply(compiler)
  }
  transformToJson (config) {
    for (let key in config) {
      if (typeof config[key] === 'string' && !this.isJson(config[key])) {
        config[key] = JSON.stringify(config[key])
      }
    }
    return config
  }
  // 判断是否是JSON格式
  isJson (str) {
    try {
      str = JSON.parse(str)
      return !!str && (typeof str === 'string' || typeof str === 'object')
    } catch (error) {
      return false
    }
  }
}

module.exports = AutoDefineWebpackPlugin
