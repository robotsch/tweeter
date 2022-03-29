/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  
  // Hide 'optional' elements on pageload
  const tweetError = $("#tweet-error");
  tweetError.hide();
  const $tweetForm = $("#tweet-submit-form");
  $tweetForm.hide()

  // Tweet form animation
  const $composeBtn = $("#compose-btn")
  $composeBtn.click(function() {
    $($tweetForm).slideToggle()
  })
  
  $tweetForm.submit(function (e) {
    e.preventDefault();
    const tweetLength = this.text.value.length;
    // Validate tweet content
    if (
      this.text.value &&
      tweetLength > 0 &&
      tweetLength <= 140 &&
      this.text.value.trim() !== ""
    ) {
      // Tweet is valid, post it to server
      return $.ajax({
        url: "/tweets",
        method: "POST",
        data: $(this).serialize(),
      }).then(() => {
        // Clear text box, error, show new validated tweet
        tweetError.slideUp();
        $("#tweet-text").val("");
        $.ajax("/tweets", { method: "GET" }).then(function (results) {
          renderTweets([results[results.length - 1]]);
        });
      });
    }
    tweetError.slideDown();
  });

  const createTweetElement = function (data) {
    // Dates handled by timeago jQuery plugin
    // https://timeago.yarp.com/
    const safeHTML = `<p>${escape(data.content.text)}</p>`;
    const datePosted = new Date(data.created_at);
    // Construct new tweet, append each section of tweet
    const $tweet = $(`<article>`)
      .append(`
      <header>
        <div class="tweeter-name">
          <span>ඞ</span>${data.user.name}
        </div>
        <div class="tweeter-handle">
        ${data.user.handle}
        </div>
      </header>
      `
      )
      .append(`${safeHTML}`).append(`
      <footer>
        <time>
          ${jQuery.timeago(datePosted)}
        </time>
        <div>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>`);

    return $tweet;
  };

  const loadTweets = function () {
    // Get all tweets, send to renderTweets
    $.ajax("/tweets", { method: "GET" }).then(function (results) {
      renderTweets(results);
    });
  };

  const renderTweets = function (tweets) {
    // Grab tweet section once to avoid searching dom tree repeatedly
    const tweetSection = $("#tweets-section");
    for (const tweet of tweets) {
      tweetSection.prepend(createTweetElement(tweet));
    }
  };

  // Basic character escaping for the most rudimentary of XSS attempts
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Load tweets on initial page load
  loadTweets();
});
