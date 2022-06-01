function updateCountdown()  {
  let val = $('#tweet-text').val().length;
  let remain = 140 - val;
  if (remain < 0)  {
    $(".counter").css('color', 'red');
  }
  $(".counter").text(remain);
}

jQuery(document).ready(function($) {
  updateCountdown();
  $('#tweet-text').change(updateCountdown);
  $('#tweet-text').keyup(updateCountdown);
});

$("#tweet-text").on('input', function() {
  console.log(this);
  let $this = $(this);
  let maxLength = parseInt($this.attr('maxlength'));
  $this.attr('maxlength', null);
  
});
