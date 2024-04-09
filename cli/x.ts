#!/usr/bin/env bun
// TODO directly publish TS source files, no need for build with Bun.
// Does not require bundling twice this way.
console.log('bunx test entry')
console.log(process.argv)
console.log(process.argv.slice(2))
