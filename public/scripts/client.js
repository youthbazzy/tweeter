/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const { render } = require("express/lib/response");


const createTweetElement = function(tweetObj) {
  console.log(tweetObj)

  let time = timeago.format(tweetObj.created_at); 
  console.log(time)
  const $tweet = $(`<article class="tweet-container">
    <header class="tweet-header">
      <div>            
        <!-- <img src=""> -->
        <span>${tweetObj.user.name}</span>
      </div>
      <div>
        <span>${tweetObj.user.handle}</span>
      </div>
    </header>
    <div class="tweet-body">
      <span>${tweetObj.content.text}</span>
    </div>
    <footer class="tweet-footer">
        <span>${time}</span>
        <div class="tweet-icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
    </footer>
</article>`);
  return $tweet;
}

const renderTweets = function(objArr) {
  for (let obj in objArr) {
    let $tweet = createTweetElement(objArr[obj])
    $('#tweets-container').append($tweet);
  }
}

const loadTweets = function() {
  $.ajax('/tweets', { method: 'GET' })
    .then(function (tweets) {
      renderTweets(tweets)
    })};

$(document).ready(function()  {  
  loadTweets();

  $("form").submit(function(event) {
    // Stop the form from submitting and loading a new page.
    event.preventDefault();
    console.log($(this))
    
    let tweetData = $(this).serialize()
    let tweetInfo = tweetData.substring(5)

    if(tweetInfo == '' || tweetInfo.length > 140 )  {
      alert('invalid tweet, check length and make sure its typed')
    } else  {
      let newTweet = {
        "user": {
          "name": "Me",
          "avatars": "https://i.imgur.com/73hZDYK.png",
          "handle": "@myUser"
        },
        "content": {
          "text": tweetData.substring(5)
        },
        "created_at": 1653703458814
      }

      $.post("/tweets", tweetData, function(data, status){
        alert("Data: " + tweetData + "\nStatus: " + status);
      });
    }
    loadTweets();
  });
});