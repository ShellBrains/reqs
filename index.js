#!/usr/bin/env node

const sh = require('shelljs');
const fs = require('fs');
const TOML = require('@iarna/toml');

const CONFIG_PATH = 'reqs.toml';

const isConfig = fs.existsSync(CONFIG_PATH);

if (isConfig) {
  const config = TOML.parse(fs.readFileSync(CONFIG_PATH));

  var files = config.files || [];

  if (files.readable) {
    files.readable.forEach(checkReadable);
  }
  if (files.writeable) {
    files.writeable.forEach(checkWriteable);
  }
  if (config.commands) {
    Object.values(config.commands).forEach(function (commandReqs) {
      checkCommand(commandReqs.command, commandReqs.outputs);
    });
  }
} else {
  logStatus(false, 'Configuration not found');
}


function logStatus (check, text) {
  const green = '\033[32m';
  const red = '\033[31m';
  console.log((check ? green + '+ ' : red + '- ') + text);
}

function checkReadable (f) {
  try {
    fs.accessSync(f, fs.constants.R_OK)
    var readable = true;
  } catch (err) {
    var readable = false;
  }
  logStatus(readable, 'Path ' + f + ' is ' + (!readable ? 'not ' : '') + 'readable');
}

function checkWriteable (f) {
  try {
    fs.accessSync(f, fs.constants.W_OK)
    var writeable = true;
  } catch (err) {
    var writeable = false;
  }
  logStatus(writeable, 'Path ' + f + ' is ' + (!writeable ? 'not ' : '') + 'writeable');
}

function checkCommand (command, mustOutput) {
  const output = sh.exec(command, { silent: true }).stdout;
  const result = output && output.includes(mustOutput);
  logStatus(result, 'Command "' + command + '" ' + (!result ? 'does not output' : 'outputs') + ' "' + mustOutput + '"');
}