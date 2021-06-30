const dotenv = require('dotenv')
const path = require('path')
const merge = require('webpack-merge')

// 获取所有的配置
function getEnvConfig (options = {}) {
  let contextPath = path.join(process.cwd(), './env')
  // 获取.env的配置
  let commonEnvConfig = dotenv.config({
    path: path.join(contextPath, '.env')
  })
  if (commonEnvConfig.error) {
    console.error('未查询到.env文件')
    commonEnvConfig = {}
  } else {
    commonEnvConfig = commonEnvConfig.parsed
  }
  // 获取环境变量
  const LM_ENV = process.env.LM_ENV
  // 获取当前LM_ENV环境 配置文件
  let curEnvConfig = {}
  if (LM_ENV) {
    let curenvConfigPath = path.resolve(contextPath, `.env.${LM_ENV}`)
    curEnvConfig = dotenv.config({
      path: curenvConfigPath
    })
    if (curEnvConfig.error) {
      console.error(`未查询到.env.${LM_ENV}文件`)
      curEnvConfig = {}
    } else {
      curEnvConfig = curEnvConfig.parsed
    }
  }
  let mergeConfig = merge(commonEnvConfig, curEnvConfig)
  // 获取options 配置 优先级最高
  let optionsEnvConfig = options['process.env']
  if (optionsEnvConfig && typeof optionsEnvConfig === 'object') {
    mergeConfig = merge(mergeConfig, optionsEnvConfig)
  }
  for (let key in mergeConfig) {
    process.env[key] = mergeConfig[key]
  }
  return mergeConfig
}

module.exports = {
  getEnvConfig
}