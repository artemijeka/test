
  var $registrationForm = $('#registrationForm');
  
  $registrationForm.submit(function(event) {

  $('.register-form__btn-complete').removeClass('slide-top-2');//убираем анимацию

  event.preventDefault();

  if (validateForm.passwordsIsEqual() && validateForm.passwordIsValid(validateForm.password)) {
    
      console.log('passwords is equal, sending form...');

      $.ajax({
      type: $(this).attr('method'),
      url: $(this).attr('action'),
      data: $(this).serialize(),
      success: function(resp) {
        // console.log(resp);
        if (resp === 'success: mail function send success') {
          console.log('success: mail function send success'); 
          $('#passwordNotice').removeClass('visible'); 
          $('.register-form__wrap').addClass('hidden');
          $('.register-form__ok').removeClass('hidden'); 
          $('.register-form__background').addClass('to-black');
          $('.register-form__btn-complete').addClass('slide-top-2');
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
        $('#passwordNotice').removeClass('o-0');
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

