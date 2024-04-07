#!/usr/bin/env bun
import tree from 'tree-node-cli'

const files = tree(process.cwd(), {
  allFiles: true,
  exclude: [/node_modules/, /dist/],
  maxDepth: 2,
})

console.log(files)
