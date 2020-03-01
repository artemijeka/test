
  let validateForm = new ValidateForm('#email', '#password', '#confirmPassword', '#passwordNotice', 'correct', 'error');


  window.onload = function() {    
    validateForm.setEmail( $('#email').val() );
    validateForm.emailIsCorrect();
  }();


  $('#email').on( "focus, blur, click, focusout, keyup", function(e){    
    validateForm.setEmail( $(this).val() );
    validateForm.emailIsCorrect();
  });


  $('#password, #confirmPassword').on('focus', function() {
    $('#passwordNotice').removeClass('o-0');
    $('#passwordNotice').addClass('o-1');
  });
  $('#password, #confirmPassword').on('focusout', function() {
    $('#passwordNotice').removeClass('o-1');
    $('#passwordNotice').addClass('o-0');
  });


  $('#password').on( "focusout, keyup", function(e){    
    validateForm.setPassword( 1, $(this).val() );    
  });


  $('#confirmPassword').on( "focusout, keyup", function(e){    
    validateForm.setPassword( 2, $(this).val() );  
  });


