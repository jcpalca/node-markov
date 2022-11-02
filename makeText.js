'use strict';

const fsP = require('fs/promises');
const axios = require('axios');

const { MarkovMachine } = require("./markov.js");




/** Command-line tool to generate Markov text. */


/** cat: read file with path and print contents of file to console.
 *
 * - Input: filepath
 * - Output: logs to console
 * - on Error: returns error message and exits process
*/

async function cat(path) {
  try {
    const content = await fsP.readFile(path, "utf8");
    return content;
  }
  catch (error) {
    console.error(`
      Error reading ${path}:
        Error: ENOENT: no such file or directory, open '${path}'
    `);
    process.exit(1);
  }
}

/** webcat: reads contents of URL and prints to contents to the console.
 *
 * - Input: URL
 * - Output: logs to console
 * - on Error: returns error message and exits process
 *
*/

async function webCat(url) {

  try {
    const response = await axios.get(url);
    return content;
  }
  catch (error) {
    console.error(`Error fetching ${url}:
    Error: Request failed with status code 404`);
  }
}


/** Handler function for process arguments.
 * If path is URL, calls webCat()
 * Else if filepath, calls cat()
 */
async function main(type, path) {
  let text;

  if (type.toLowerCase() === 'url') {
    text = await webCat(path);
  }
  else if (type.toLowerCase() === 'file') {
    text = await cat(path);
  }


  const machine = new MarkovMachine(text);
  console.log(machine.getText());
  return machine;

}


const type = process.argv[2];
const path = process.argv[3];

main(type, path);