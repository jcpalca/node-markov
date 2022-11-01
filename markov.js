"use strict";

/** Textual markov chain generator. */


class MarkovMachine {

  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
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

    for(let i = 0; i < this.words.length; i++) {
      const key = this.words[i];
      const value = this.words[i + 1] || null;
      if(chains.has(key)) {
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
    let text = [this.words[0]];
    let currWord = this.words[0];
    // console.log(this.chains)

    // - start at the first word in the input text
    // - find a random word from the following-words of that
    // - repeat until reaching the terminal null
    while(currWord !== null) {
      const words = this.chains.get(currWord);
      currWord = this.getRandomWord(words);
      text.push(currWord);
    }

    return text.join(" ");
  }

  /** Returns random word from array of words */

  getRandomWord(words) {
    return words[Math.floor(Math.random() * words.length)];
  }
}

const catInHatMachine = new MarkovMachine(`anyone lived in a pretty how town
with up so floating many bells down
spring summer autumn winter
he sang his didn’t he danced his did

Women and men both little and small
cared for anyone not at all
they sowed their isn’t they reaped their same
sun moon stars rain

children guessed but only a few
and down they forgot as up they grew
autumn winter spring summer
that noone loved him more by more

when by now and tree by leaf
she laughed his joy she cried his grief
bird by snow and stir by still
anyone’s any was all to her

someones married their everyones
laughed their cryings and did their dance
sleep wake hope and then they
said their nevers they slept their dream

stars rain sun moon
and only the snow can begin to explain
how children are apt to forget to remember
with up so floating many bells down

one day anyone died i guess
and noone stooped to kiss his face
busy folk buried them side by side
little by little and was by was

all by all and deep by deep
and more by more they dream their sleep
noone and anyone earth by april
wish by spirit and if by yes

Women and men both dong and ding
summer autumn winter spring
reaped their sowing and went their came
sun moon stars rain`);

console.log(catInHatMachine.getText());
