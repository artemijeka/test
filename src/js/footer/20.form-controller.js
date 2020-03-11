  let validateForm = new ValidateForm('#email', '#password', '#confirmPassword', '#passwordNotice', 'correct', 'error', 'visible');


  window.onload = function() {    
    validateForm.setEmail( $('#email').val() );
    validateForm.emailIsCorrect();
  }();


  $('#email').on( "focus, blur, click, focusout, keyup", function(e){    
    validateForm.setEmail( $(this).val() );
  });


  $('input[type=password]').on('click', function() {
    $('#passwordNotice').addClass('visible');
  });


  // $('#password, #confirmPassword').on('focusout', function() {
  //   $('#passwordNotice').removeClass('visible');
  // });


  $('#password').on( "focusout, keyup", function(e){    
    validateForm.setPassword( 1, $(this).val() );    
  });


  $('#confirmPassword').on( "focusout, keyup", function(e){    
    validateForm.setPassword( 2, $(this).val() );  
  });