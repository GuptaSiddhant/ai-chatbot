var base = require('./eslint-base.js')

base.extends.push('next')
base.extends.push('next/core-web-vitals')

module.exports = base
