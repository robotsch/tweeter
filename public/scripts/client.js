/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  const $tweetForm = $('#tweet-submit-form')
    .submit(function (e) {
      e.preventDefault()
      const tweetLength = this.text.value.length
      if(this.text.value && 
        tweetLength > 0 && 
        tweetLength <= 140 &&
        this.text.value.trim() !== ''
        ) {
          return $.ajax({
          url: '/tweets',
          method: 'POST',
          data: $(this).serialize()
        }).then( () => {
          $.ajax('/tweets', { method: 'GET'})
            .then(function (results) {
              renderTweets([results[results.length-1]])
            })
        })
      }
      alert('Failure')
    })

  const createTweetElement = function (data) {
    // Dates handled by timeago jQuery plugin
    // https://timeago.yarp.com/
    const datePosted = new Date(data.created_at);
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
      `)

      .append(`<p>${data.content.text}</p>`)
      .append(`
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

  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET'})
      .then(function (results) {
        renderTweets(results)
      })
  }

  const renderTweets = function (tweets) {
    const tweetSection = $("#tweets-section");
    for (const tweet of tweets) {
      tweetSection.prepend(createTweetElement(tweet));
    }
  };

  loadTweets()
});
