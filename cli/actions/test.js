
// Command to run tests with Ava

const logger = require('./../logger');
const path = require('path');
const shell = require('shelljs');
const kytConfig = require('./../../config/kyt.config');

module.exports = () => {
  // Comment the following to see verbose shell ouput.

  const userRootPath = process.cwd();
  const userSrc = path.join(userRootPath, 'src');
  const userBuild = path.join(userRootPath, 'build/test');
  const avaCLI = path.resolve(__dirname, '../../node_modules/ava/cli.js');
  const npath = path.resolve(__dirname, '../../node_modules');
  const babel = path.join(npath, '.bin/babel');
  const es2015Preset = require.resolve('babel-preset-es2015');
  const reactPreset = require.resolve('babel-preset-react');
  const presets = `${es2015Preset},${reactPreset}`;

  logger.start('Running Tests...');

  // First, compile the sources into build/test.
  shell.config.silent = true;
  shell.exec(`${babel} ${userSrc} --presets ${presets} --out-dir ${userBuild} -s inline`);
  // Next, execute the ava cli on our build.
  let command = `node ${avaCLI} ${userRootPath}/build/test/**/*.test.js`;
  if (kytConfig.debug) command += ' --verbose';
  shell.config.silent = false;
  shell.exec(command);
};
