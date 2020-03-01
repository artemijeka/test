$(function () {



  $('#registrationForm').submit(function(event) {
    event.preventDefault();
    $.ajax({
      type: $(this).attr('method'),
      url: $(this).attr('action'),
      data: $(this).serialize(),
      success: function(resp) {
        // console.log(resp);
        if (resp === 'success: mail function send success') {
          console.log('success: mail function send success');
          $('#formWrap').hide();
          $('#formSended').show();
          // setTimeout(() => {
          //   $('#formSended').hide();
          //   $('#formWrap').show();
          // }, 1500);
        } else {
          console.log(resp);
        }
      },
      error: function (resp) {
        console.log('error: ajax script send error');
      }
    });
  });



});/* $(document.ready() */