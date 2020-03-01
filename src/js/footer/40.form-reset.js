  $(document).on('click keyup', function(e){
    if ( (e.which===27 && $('.register-form__background').has('to-black')) || $('.register-form__background').has('to-black') ) {
        $('.register-form__background').removeClass('to-black');
        $('.register-form__wrap').removeClass('hidden');
        $('.register-form__ok').addClass('hidden');    
      }
  });



});/* $(document.ready() */

