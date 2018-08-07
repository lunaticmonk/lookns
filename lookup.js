'use strict';

const dns = require('dns');
const chalk = require('chalk');
const utils = require('./utils');

async function digger() {
  const options = await utils.getOptions(process.argv);
  const reverse = await utils.isReverse(options);
  if (reverse && (options["r"] || options["r"] === undefined)) {
    /**
     * Reverse: Hostname from IP.
     */
    dns.reverse(options["i"], (err, hostnames) => {
      if (err) {
        console.log(`⚠️  ${chalk.yellow(`Could not find the Host from the IP`)}`);
        process.exit();
      }
      console.log(`${chalk.whiteBright(`Hostnames: `)}`);
      for (const [index, hostname] of hostnames.entries()) {
        console.log(`${chalk.whiteBright(index + 1)}${chalk.whiteBright(`)`)} ${chalk.cyanBright(hostname)}`);
      }
    });
  } else {
    /**
     * IP from hostname
     */
    const lookupOptions = {
      all: true
    };
    const normalizedUrl = await utils.normalizeUrl(options["i"]);
    dns.lookup(normalizedUrl, lookupOptions, (err, addresses) => {
      if (err) {
        console.log(`⚠️  ${chalk.yellow(`Could not find the IP from the Host`)}`);
        process.exit();
      }
      console.log(`${chalk.whiteBright(`Host: `)}${chalk.green(normalizedUrl)}`);
      console.log(`${chalk.whiteBright(`IPs  found: `)}`);
      for (const address of addresses) {
        const { address: ip, family } = address;
        console.log(`${chalk.cyanBright(ip)} ${chalk.whiteBright(`=>`)} ${chalk.cyanBright(`IPv`)}${chalk.cyanBright(family)}`);
      }
    });
  }
}

digger();