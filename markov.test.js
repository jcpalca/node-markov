'use strict';

const { MarkovMachine } = require("./markov");
console.log(MarkovMachine);

describe("getChains", function () {

  const text = "The cat is in the hat. The cat is the cat. The hat is a cat.";
  const machine = new MarkovMachine(text);
  const testChain = new Map();

  test("creates valid chain", function () {

    testChain.set('The', ['cat', 'cat', 'hat']);
    testChain.set('cat', ['is', 'is']);
    testChain.set('is', ['in', 'the', 'a']);
    testChain.set('in', ['the']);
    testChain.set('the', ['hat.', 'cat.']);
    testChain.set('hat.', ['The']);
    testChain.set('cat.', ['The', null]);
    testChain.set('hat', ['is']);
    testChain.set('a', ['cat.']);

    expect(machine.chains).toEqual(testChain);

  });


});


describe("getText", function () {



  test("generates expected text", function () {
    const text = "The cat is in the hat.";
    const machine = new MarkovMachine(text);
    expect(machine.getText(text)).toEqual("The cat is in the hat.");


  });

  test("expects same starting word", function () {
    const text = `The cat is in the hat. The cat is the cat. The hat is a cat.`;
    const machine = new MarkovMachine(text);
    expect(machine.getText(text).startsWith('The')).toBeTruthy();

  });

  test("expects same ending word", function () {
    const text = `The cat is in the hat. The cat is the cat. The hat is a cat.`;
    const machine = new MarkovMachine(text);
    expect(machine.getText(text).endsWith('cat.')).toBeTruthy();

  });

  test("expects each bigram to be valid", function () {
    const text = `The cat is in the hat. The cat is the cat. The hat is a cat.`;

    const machine = new MarkovMachine(text);

    const words = machine.getText(text).split(/[ \r\n]+/);

    for (let i = 0; i < words.length - 1; i++) {
      expect(text).toContain(words[i] + ' ' + words[i + 1]);

    }


  });

});
