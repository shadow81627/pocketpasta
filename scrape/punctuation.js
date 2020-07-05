const chalk = require('chalk');

function pedant(text) {
  let inQuote = false;
  let quoteStartIndex = 0;
  const MAX_QUOTE_LENGTH = 20;
  const MAX_PUNCTUATION_LENGTH = 3;
  const punctuation = [',', '.', '!', ';', ';', '"'];
  let punctuationAmount = 0;
  let punctuationStartIndex = 0;
  const quotes = ['"', "'"];
  const contractionEndings = ['t', 's', 'm', 're', 's', 've', 'd', 'll', 'em'];

  const splitAt = (index) => (x) => [x.slice(0, index), x.slice(index)];

  function printError(msg, type, col, text) {
    console.log(
      `${msg}, ${type}, col ${col + 1}`,
      text.charAt(col),
      splitAt(col)(text),
    );
  }

  let rv = text;
  for (let i = 0; i < text.length; i++) {
    if ('('.includes(text[i])) {
      if ('('.includes(text[i + 1])) {
        printError('too many parenthesis', 'PunctuationError', i, text);
      }
    }

    if (punctuation.includes(text[i])) {
      if (punctuationAmount === 0) {
        punctuationStartIndex = i;
      }
      punctuationAmount++;

      if (
        text[i + 1] !== ')' &&
        text[i + 1] !== ' ' &&
        // not a number
        !`${text[i - 1]}`.match(/(\d)/) &&
        // not the last character
        text[i + 1] !== ''
      ) {
        printError(
          'no space after punctuation',
          'PunctuationError',
          punctuationStartIndex,
          text,
        );
        rv = splitAt(punctuationStartIndex + 1)(text).join(' ');
      }
    } else {
      punctuationStartIndex = 0;
      punctuationAmount = 0;
    }
    if (punctuationAmount > MAX_PUNCTUATION_LENGTH) {
      printError(
        'too much punctuation',
        'PunctuationError',
        punctuationStartIndex,
        text,
      );

      punctuationStartIndex = 0;
      punctuationAmount = 0;
    }

    // on a space
    if (' '.includes(text[i])) {
      if (text[i + 1] === ' ' || text[i + 1] === ')') {
        printError('too much whitespace', 'WhitespaceError', i, text);
      }
    }
    // found a quote that didn't end after sentence
    if (text[i + 1] === undefined && inQuote) {
      inQuote = false;
      printError('unclosed quote', 'QuoteError', quoteStartIndex, text);
    }

    // okay, we found a quote
    if (quotes.includes(text[i])) {
      // proper contraction detection using xor
      const a = !contractionEndings.includes(text[i + 1]);
      const b = text[i] === "'";
      const xor = a ? !b : b;
      if (!inQuote && !xor) {
        quoteStartIndex = i;
        inQuote = true;
      } else if (i - quoteStartIndex > MAX_QUOTE_LENGTH) {
        printError('quote too long', 'QuoteError', quoteStartIndex, text);
        inQuote = false;
      }
    }
  }
  return rv;
}

module.exports = pedant;
