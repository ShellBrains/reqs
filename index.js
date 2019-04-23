const sh = require('shelljs');
const fs = require('fs');
const TOML = require('@iarna/toml');

const CONFIG_PATH = 'reqs.toml';

var isConfig = fs.existsSync(CONFIG_PATH);
const results = [];

if (isConfig) {
  const config = TOML.parse(fs.readFileSync(CONFIG_PATH));

  var files = config.files || [];

  if (files.readable) {
      files.readable.forEach(function (f) {
          if (fs.accessSync(f, fs.constants.R_OK))
      });
  }

  console.log(config);
} else {
  console.log('no config found');
}