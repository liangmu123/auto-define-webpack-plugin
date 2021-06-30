#!/usr/bin/env node
const crossEnv = require('cross-env')
const { getEnvConfig } = require('../lib/utils')

// 解析参数
let reg = /^(.*)=(.*)$/
let args = process.argv.slice(2)
args.forEach(item => {
  let arr = null
  if (arr = item.match(reg)) {
    let [, key, value] = arr
    process.env[key] = value
  }
})

getEnvConfig()

crossEnv(process.argv.slice(2))