'use strict';

async function isReverse(options) {
  for (const flag of Object.keys(options)) {
    if (flag === 'r') {
      return true;
    }
  }
  return false;
}

async function getOptions(commandLineArgs) {
  const options = {};
  for (const [index, arg] of commandLineArgs.entries()) {
    if (arg.split('')[0] === '-') {
      const key = arg.split('').slice(1).join('');
      options[key] = process.argv[index + 1];
    }
  }
  return options;
}

async function normalizeUrl(url) {
  return url.split('://')[url.split('://').length - 1].split('/')[0];
}

module.exports = {
  isReverse,
  getOptions,
  normalizeUrl
}