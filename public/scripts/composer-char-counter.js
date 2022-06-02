let remain;
function updateCountdown()  {
  console.log('update countdown')
  let val = $('#tweet-text').val().length;
  remain = 140 - val;
  if (remain < 0)  {
    $(".counter").css('color', 'red');
  } else  {
    $(".counter").css('color', 'black');
  }
  $(".counter").text(remain);
}

jQuery(document).ready(function($) {
  updateCountdown();
  $('#tweet-text').change(updateCountdown);
  $('#tweet-text').keyup(updateCountdown);
});

$("#tweet-text").on('input', function() {
  let $this = $(this);
  $this.attr('maxlength', null);
});
