"use strict";



class MarkovMachine {

  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
    // console.log(this.words);
  }

  /** Get markov chain: returns Map of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   *
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null],
   *  }
   *
   * */

  getChains() {
    let chains = new Map();

    for (let i = 0; i < this.words.length; i++) {
      const key = this.words[i];
      const value = this.words[i + 1] || null;
      if (chains.has(key)) {
        chains.get(key).push(value);
      }
      else {
        chains.set(key, [value]);
      }
    }

    // console.log(this.words)
    // console.log(chains)
    return chains;
  }


  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText() {
    const starting_words = this.getStartingWords(this.words);
    let currWord = this.getRandomWord(starting_words);
    let text = [currWord];

    // - start at the first word in the input text
    // - find a random word from the following-words of that
    // - repeat until reaching the terminal null
    while (currWord !== null) {
      const words = this.chains.get(currWord);

      currWord = this.getRandomWord(words);
      if (currWord !== null) text.push(currWord);
      else break;

    }
    return text.join(" ");
  }

  /** Returns random word from array of words */

  getStartingWords(words) {
    return words.filter(word => {
      try {
        return word[0] === word[0].toUpperCase();
      }
      catch {
        return false;
      }
    });
  }

  getRandomWord(words) {
    '';
    return words[Math.floor(Math.random() * words.length)];
  }
}


module.exports = {
  MarkovMachine
};


