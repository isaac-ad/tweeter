/*
 * Client-side JS logic goes here

 * jQuery is already loaded*/

const renderTweets = function (tweets) {
  // loop through each tweet
  tweets.forEach(function (tweet) {
    // create a new tweet element
    const $tweet = createTweetElement(tweet);
    // append the tweet element to the #tweets-container
    $(".tweet-container").prepend($tweet);
  });
};
const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
const createTweetElement = function (tweet) {
  let $tweet = $(`
  <article class="example-tweet">
  <section class="user-information">
  <section class="avatar-name">
  <img class="avatar" src=${tweet.user.avatars}/>
  <h3>${tweet.user.name}</h3>
  </section>
  <p>${tweet.user.handle}</p>
  </section>
  <p>${escape(tweet.content.text)}</p>
  <hr class="line-hr">
  <footer>
  <span id="dateJoined">${timeago.format(tweet.created_at)}</span>
  <div align="right" class="icons">
  <i class="fa-solid fa-flag"></i>     
  <i class="fas fa-heart"></i>
  <i class="fas fa-retweet"></i>
  </div>
  </footer>
  </article>
`);

  return $tweet;
};

$(document).ready(function () {
    // $("time.timeago").timeago();
    $(".tweet-form").submit(function (event) {
      event.preventDefault(); // prevent default form submission behavior
      
      // Get tweet text and error message element
     let text = $("#tweet-text").val();
     let $errorMsg = $(".error-msg");
    //  $errorMsg.empty()
      
      // Validate text
      if (!text.length) {
        $errorMsg.html("Tweet content cannot be empty.").show();
        setTimeout(()=>{
            $errorMsg.empty()
        },2000)
        return;
      } else if (text.length > 140) {
        $errorMsg.html("Tweet content is too long.").show();
        return;
      }
      
      // AJAX request to send form data to server
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $(this).serialize(), // serialize form data and send as query string
        success: function (response) {
        //   loadTweets() // log response from server
        $("textarea").val("");
        $(".counter").text(0)
        // $(".error_msg").hide();
        $.get("http://localhost:8080/tweets", data => {
          renderTweets(data.slice(-1));
        }); 
        },
        error: function (error) {
          console.log(error); // log any errors that occur
        },
      });
    });
    
    function loadTweets() {
      $.ajax('/tweets', { method: 'GET' })
        .then(function (tweets) {
          renderTweets(tweets);
        //   $("time.timeago").timeago(); // For testing purposes
        });
    }
    
    loadTweets();
  });
  


