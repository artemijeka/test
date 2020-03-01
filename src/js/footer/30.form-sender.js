$('#registrationForm').submit(function(event) {
  event.preventDefault();
  if (validateForm.passwordsIsEqual()) {
    console.log('passwords is equal, sending form...');
      $.ajax({
      type: $(this).attr('method'),
      url: $(this).attr('action'),
      data: $(this).serialize(),
      success: function(resp) {
        // console.log(resp);
        if (resp === 'success: mail function send success') {
          console.log('success: mail function send success');     
          $('.register-form__wrap').addClass('hidden');
          $('.register-form__ok').removeClass('hidden');
          $('.register-form__background').addClass('to-black');
        } else {
          console.log(resp);
          $('.register-form__btn-complete').addClass('error');
          setTimeout(() => {
            $('.register-form__btn-complete').removeClass('error');
          }, 1000);
        }
      },
      error: function (resp) {
        console.log('error: ajax script send error');
        $('.register-form__btn-complete').addClass('error');
        setTimeout(() => {
          $('.register-form__btn-complete').removeClass('error');
        }, 1000);
      }
    });
  } else {
    $('.register-form__btn-complete').addClass('error');
    setTimeout(() => {
      $('.register-form__btn-complete').removeClass('error');
    }, 1000);
  }    
});

