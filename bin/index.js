#!/usr/bin/env node

/* eslint-env node */

var chalk = require('chalk')
var clear = require('clear')
var figlet = require('figlet')

// Tell everyone what they are using
clear()
console.log(
  chalk.blue.bold(
    figlet.textSync('Vue-Build')
  )
)
// process .env file
var pathToEnv = process.cwd() + '/.env'
var fs = require('fs')
try {
  fs.statSync(pathToEnv)
  require('dotenv').config({
    path: pathToEnv
  })
} catch (err) {}

// Initiate yargs scripts
var version = require('../package').version
var yargs = require('yargs')
  // List commands
  .command('init', 'Initiate structure', require('./init.js'))
  .command('dev', 'Start development server', require('./dev.js'))
  .command('prod', 'Production build to dist', require('./prod.js'))
  .command('lint', 'Lint files', require('./lint.js'))
  .command('unit', 'Unit testing', require('./test_unit.js'))
  .command('e2e', 'End to end testing', require('./test_e2e.js'))
  .command('help', 'Show help', function (yargs) { yargs.showHelp() })
  .recommendCommands() // If your close enough recommend the closest command

  // Version
  .alias('v', 'version')
  .version(function () { return version })
  .describe('v', 'show version information')

  // Help
  .alias('h', 'help')
  .help('help')

  // Simple usage
  .usage('Usage: vue-build <command> [options]\nUsage: vue-build <command> --help')
  .epilog('Have questions? Email: brian@webiswhatido.com')
  .showHelpOnFail(false, 'Specify --help for available options')

// If you dont send any commands show help
if (yargs.argv._.length === 0) {
  yargs.showHelp()
}
