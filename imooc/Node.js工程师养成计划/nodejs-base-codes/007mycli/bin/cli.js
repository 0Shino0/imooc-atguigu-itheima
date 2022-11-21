#! /usr/bin/env node 
const {program} = require('commander')
const myhelp = require('../lib/core/help')
myhelp(program)

const mycommander = require('../lib/core/mycommander')
mycommander(program)
program.parse(process.argv)