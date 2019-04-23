const sh = require('shelljs');
const fs = require('fs');
const TOML = require('@iarna/toml');

const CONFIG_PATH = 'reqs.toml';

var isConfig = fs.existsSync(CONFIG_PATH);

if (isConfig) {
  const config = TOML.parse(fs.readFileSync(CONFIG_PATH));

  console.log('loaded config');
  console.log(config);
} else {
  console.log('no config found');
}