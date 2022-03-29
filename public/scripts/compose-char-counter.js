/* eslint-env browser, jquery */
$(document).ready(function() {
  let counter = 0;
  // Grab and store elements
  const textArea = $('#tweet-text');
  // Need to use a jQuery method instead of specifying the child with [1] to keep it jQuery
  // .next -> under-text div -> .children -> array of tweet button and counter -> .last() -> counter
  const charCount = textArea.next().children().last();
  // On input, change counter to textArea's length and update
  textArea.on('input', function() {
    counter = this.value.length;
    charCount.text(140 - counter);
    // Red swap counter text if over limit
    if (counter > 140) return charCount.css('color', 'red');
    // Swap back to black once text is within limit again
    if (counter <= 140) return charCount.css('color', 'black');
  });
});