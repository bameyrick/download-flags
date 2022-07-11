#!/usr/bin/env node

import * as fs from 'fs';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import iso from 'iso-3166-1';
import fetch from 'node-fetch';
import svgo from 'svgo';

const options: Record<string, yargs.Options> = {
  destination: {
    describe: 'File path to save the downloaded SVGs',
    type: 'string',
    requiresArg: true,
  },
};

const parser = await yargs(hideBin(process.argv))
  .scriptName('download-flags')
  .usage('$0 [options] <command ...>')
  .help('h')
  .alias('h', 'help')
  .alias('v', 'V')
  .alias('v', 'version')
  .options(options);

const { destination } = (await parser.parse(process.argv.slice(2))) as unknown as { destination: string };

const codes = iso.all().map(({ alpha2 }) => alpha2.toLowerCase());

if (!destination) {
  throw new Error(`destination argument is required`);
}

fs.mkdirSync(destination, { recursive: true });

await Promise.all(
  codes.map(async alpha2 => {
    const text = await (await fetch(`https://flagcdn.com/${alpha2}.svg`)).text();

    const svgoConfig = await svgo.loadConfig('svgo.config.json');

    const { data } = svgo.optimize(text, svgoConfig) as svgo.OptimizedSvg;

    fs.writeFileSync(`${destination}/${alpha2}.svg`, data, 'utf8');
  })
);

export default parser;
