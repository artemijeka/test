$(function() {

  $('select').niceSelect();

  let validateForm = new ValidateForm('#email', '#password', '#confirmPassword', 'correct', 'error');

  //console.log(validateForm);

  /**
   * @param {'#email'} selectorEmail 
   * @param {'#password'} selectorPassword 
   * @param {'#confirmPassword'} selectorConfirmPassword 
   * @param {'correct'} classCorrect 
   * @param {'error'} classError 
   */
  function ValidateForm( selectorEmail, selectorPassword, selectorConfirmPassword, classCorrect, classError ) {

    this.email = null;
    this.$email = $(selectorEmail);
    this.setEmail = function(newValue) {
      this.email = newValue;
    };
    this.emailIsCorrect = function(email = this.email) {
      if (email === null || email === '') {
        this.$email.removeClass(classError);
      } else {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if ( regex.test(email) ) {
          this.$email.removeClass(classError);
          this.$email.addClass(classCorrect);
          return true;
        } else {
          this.$email.removeClass(classCorrect);
          this.$email.addClass(classError);
          return false;
        }     
      }
    };
    this.password = null;
    this.$password = $(selectorPassword);
    this.confirmPassword = null;
    this.$confirmPassword = $(selectorConfirmPassword);
    this.setPassword = function(number, newValue) {
      if (number === 1) {
        this.password = newValue;
        if ( this.passwordIsValid(this.password, 1) ) {
          this.addClassCorrect( this.$password );
          if ( this.passwordsIsEqual() ) {
            this.addClassCorrect( this.$confirmPassword );
          }
        } else {
          this.addClassError( this.$password );
          this.addClassError( this.$confirmPassword );//auto set not valid for second password
        }
      } else if (number === 2) {
        console.log('setPassword 2');
        this.confirmPassword = newValue;
        if ( this.passwordIsValid(this.confirmPassword, 2) ) {
          console.log('passwordIsValid 2');
          this.addClassCorrect( this.$confirmPassword );
        } else {
          console.log('passwordIs NOT Valid 2');
          console.log( this.$confirmPassword );
          this.addClassError( this.$confirmPassword );
        }
      }
    };
    this.passwordIsValid = function( pass, number = 1 ) {
      if (pass.length >= 8) {//validate length        
        if ( pass.match(/[a-zа-яё]/) ) {//validate letter          
          if ( pass.match(/[A-ZА-ЯЁ]/) ) {//validate capital letter            
            if ( pass.match(/\d/) ) {//validate number
              //console.log('Password is valid...');
              if (number === 1) {//for first password checking only valid
                return true;
              } else if (number === 2) {
                if (this.passwordsIsEqual()) {
                  return true;
                } else {//second password is not equal with first password
                  return false;
                }
              }              
            } else {
              //console.log('Please write one or more digitals...');
              return false;            }
          } else {
            //console.log('Please write one or more uppercase letter...');
            return false;
          }
        } else {
          //console.log('Please write one or more letter...');
          return false;
        }
      } else {
        //console.log('Please write more then 8 simbols...');
        return false;
      }
    };
    this.setConfirmPassword = function(newValue) {
      this.confirmPassword = newValue;
    };
    this.passwordsIsEqual = function() {
      if ( this.confirmPassword === this.password ) {
          //console.log('Confirm password is equal...');
          return true;        
      } else {
        return false;
      }      
    };
    this.addClassCorrect = function(target) {
      target.removeClass(classError);
      target.addClass(classCorrect);
    };
    this.addClassError = function(target) {
      target.removeClass(classCorrect);
      target.addClass(classError);
      console.log('addClassError SUCCESS');
    };

  }


  
  window.onload = function() {    
    validateForm.setEmail( $('#email').val() );
    validateForm.emailIsCorrect();
  }();



  $(document).on('click', '#submitForm', function(e) {
    e.preventDefault();
    if (true/* all right */) {
      
    }
  });



  $('#email').on( "focus, blur, click, focusout, keyup", function(e){    
    validateForm.setEmail( $(this).val() );
    validateForm.emailIsCorrect();
  });



  $('#password').on( "focusout, keyup", function(e){    
    validateForm.setPassword( 1, $(this).val() );    
  });



  $('#confirmPassword').on( "focusout, keyup", function(e){    
    validateForm.setPassword( 2, $(this).val() );  
  });



});