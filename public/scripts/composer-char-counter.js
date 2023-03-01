// composer-char-counter.js

$(document).ready(function() {

    // Register an event handler to the textarea element
    $('textarea').on('keyup', function() {
      
      // Determine the length of the input value
      const charCount = $(this).val().length;
      console.log(charCount)
      // Update the counter on the page
      const counter = $(this).parent().find('.counter');
      counter.text(140 - charCount);
      
      // Turn the counter red if the input is too long
      if (charCount > 140) {
        counter.addClass('invalid');
      } else {
        counter.removeClass('invalid');
      }
    });
  
  });
  
  