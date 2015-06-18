jQuery(function () {
  // allow semantic ui messages to be closed
  $('.message .close').on('click', function() {
    $(this).closest('.message').fadeOut();
  });
});
