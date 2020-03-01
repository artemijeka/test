$(document).ready(function () {
  console.log('TEST');
  //submit callback form
  $('#submitForm').on('click', function(e){console.log('click submitForm');});
  $('#registrationForm').submit(function(event) {
    event.preventDefault();
    console.log('$(registrationForm).submit()');
    $.ajax({
      type: $(this).attr('method'),
      url: $(this).attr('action'),
      data: $(this).serialize(),
      success: function(resp) {
        console.log(resp);
        if (resp === 'error') {
          console.log('error');
        } else if (resp === 'success') {
          console.log('success');
        }
      },
      error: function (resp) {
        console.log('error');
      }
    });
  });

});/* $(document.ready() */