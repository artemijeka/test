$(function() {
  $('select').niceSelect();

  // $(document).on('click', '#submitForm', function(e) {
  //   e.preventDefault();

  $('#email').on( "focusout, keyup", function(e){

    let $emailVal = $('#email').val();
    
    // console.log(isCorrectEmail($emailVal));
    if ( isCorrectEmail($emailVal) ) {
      $('#email').removeClass('error');
      $('#email').addClass('correct');
    } else {
      $('#email').removeClass('correct');
      $('#email').addClass('error');
    }

  });

  var objPass = {
    pass: null,
    confirmPass: null,
    flag: ''
  };

  $("#password").keyup(function(e){
    objPass.pass = $(this).val();
    if ( validatePassword( $(this).val() ) ) {      
      // $(this).removeClass('error');
      // $(this).addClass('correct');
    } else {
      // $(this).removeClass('correct');
      // $(this).addClass('error');
    }
    
    // if (pass === confirmPass) {
    //   $(this).removeClass('error');
    //   $(this).addClass('correct');
    // } else {
    //   $(this).removeClass('correct');
    //   $(this).addClass('error');
    // }
   
  });

  $("#confirmPassword").keyup(function(e){
    objPass.confirmPass = $(this).val();
    if (objPass.pass === objPass.confirmPass) {
      // $(this).removeClass('error');
      // $(this).addClass('correct');
    } else {
      // $(this).removeClass('correct');
      // $(this).addClass('error');
    }
  });


  function isCorrectEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  
  function validatePassword(pswd) {
    //validate length
    if (pswd.length >= 8) {
      //validate letter
      if ( pswd.match(/[a-zа-яё]/) ) {
        //validate capital letter
        if ( pswd.match(/[A-Z]/) ) {
          //validate number
          if ( pswd.match(/\d/) ) {
            console.log('pass valid');
            return true;
          } else {
            console.log('Please write one or more digitals...');
            return false;
          }
        } else {
          console.log('Please write one or more uppercase letter...');
          return false;
        }
      } else {
        console.log('Please write one or more letter...');
        return false;
      }
    } else {
      console.log('Please write more then 8 simbols...');
      return false;
    }
  }/* validatePassword(pswd) */


  

});

