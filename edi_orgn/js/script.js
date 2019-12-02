new WOW().init();
// remove() polifil
// (function() {
//   function remove() { this.parentNode && this.parentNode.removeChild(this); }
//   if (!Element.prototype.remove) Element.prototype.remove = remove;
//   if (Text && !Text.prototype.remove) Text.prototype.remove = remove;
// })();


/* ===== Scroll TO id  ===== */
$('a[data-href^="#"]').on('click',function(e) {
  e.preventDefault();
  var id = $(this).data("href")

  $('html,body').animate({
      scrollTop: $(id).offset().top
  }, 1000);
  return false;
});

/*----------------------------------------------------*/
$(window).scroll(function(){
  var win_scroll = $(window).scrollTop();
  var win_H = $(window).outerHeight();


  if(win_scroll >= $('#header').position().top) $('#header').addClass('_fixed');
  if(win_scroll < win_H) $('#header').removeClass('_fixed');

  // if (win_scroll > 800) $('.scrolltop').fadeIn(400)
  // else $('.scrolltop').fadeOut(800);

  var element = document.querySelector('#counters-block');
  if (element) {
      var countPoint = element.getBoundingClientRect();
      var display = window.innerHeight;
      var elementH = element.clientHeight
      if(countPoint.bottom < display + elementH/2 || countPoint.bottom < elementH ) {
        if(element.classList.contains('activated')) return null;
        $('.counter').each(function() {
          var $this = $(this),
              countTo = $this.attr('data-count');
          $({ countNum: $this.text()}).animate({
            countNum: countTo
          },
          {
            duration: 2000,
            easing:'linear',
            step: function() {
              $this.text(Math.floor(this.countNum));
            },
            complete: function() {
              $this.text(this.countNum);
            }
          });
        });
        element.classList.add('activated')
      }
  }
});

/*----------------------------------------------------*/
$(document).ready(function(){

  var mySwiper = new Swiper ('.swiper-container', {
    autoplay: {delay: 8000},
    loop: true
  });

  /*--------------------------------------------------*/
  /* Counter
  /*--------------------------------------------------*/
  $('.counter').appear(function() {
    $('.count').countTo();
  },{accY:-300});


  $('.mobile-menu-trigger, .navigation, .navigation a').click(function(){
    $('body').toggleClass('show_nav')
    $('.mobile-menu-trigger').toggleClass('active')
  })


// Mobile
  var mobileMode = ($(window).width() < 1100) ? 1 : 0;
  $('*').not('script').parent('a').css('border','none');

  mobileMode ? $('body').addClass('mobile') : $('body').removeClass('mobile');
  $('#lev_1 > li, #langs').hover(function(){ $(this).toggleClass('opened') })
  $('#top-button a').click(function(){ $('body').addClass('popup-opened') })
  $('.close').click(function(){ $('body').removeClass('popup-opened') })

  mobileMode ? Array.prototype.slice.call(
    document.querySelectorAll('.mobile-hamburger, #lev_1 a')
  ).forEach(function(el){
    el.addEventListener('click', function(e){
      $('.header').toggleClass('is-active')
    })
  }) : '';

// ----
  $('.popup_show').click(function(){
    var form = $(this).data('form')
    $('.popup, '+form).addClass('popup_showed')
  })

  $('body, .close').click(function(e){
    if(e.target.classList.contains('popup') || e.target.classList.contains('close')) {
      e.target.classList.remove('popup_showed');
      document.querySelector('.lt--control-select ul').classList.remove('sel_opened')
      document.querySelectorAll('.popup_showed').forEach(function(e) {return e.classList.remove('popup_showed')});
    }
  })
  document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
      $('.popup_showed').removeClass('popup_showed')
    }
  };

  $('.lt--control-select input').click(function(){
    $(this).next().next().addClass('sel_opened')
  })
  $('.lt--control-select li').click(function(){
    const ul = $(this).parent()
    ul.removeClass('sel_opened')
    ul.closest('div.mdl-textfield').addClass('is-dirty')
    ul.prev().prev().val($(this).text())
  })

});



var logi_form = document.getElementById("login_form");
logi_form && (logi_form.onsubmit = function(e){e.preventDefault(); return false;});

$("#login_form-bttn").on("click", function(event){
  var fform = $("#login_form");
  var formData = {};
  formData.username = fform.find("input[name=fusername]").val();
  formData.password = fform.find("input[name=fpassword]").val();
  formData.uniq_param = (new Date()).getTime();
  console.log("*/*" + formData.username + ' *');

  function sendResult(text){
    //console.log('sendResult: ' + text);
    var cnt_result = document.getElementById("cnt_result");
    cnt_result.innerHTML = '<br>' + text;
    setTimeout(
      function(){
      cnt_result.innerHTML = '';
    }, 5000)
  }

  $.ajax({
    url: 'cnt_login',
    type: 'POST',
    data: formData,
    success: function(res){
      document.getElementById("fusername").value = '';
      document.getElementById("fpassword").value = '';

        // console.log('Index ' + res.indexOf('OK: '));

      if ( res.indexOf('OK: ') == 0 ){
        // sendResult('Login OK ');
        window.location.href = res.substring(4);
      } else {
        console.log('Login failed ' + res);
        sendResult('Login failed ');
      }
    },
    error: function(){
      console.log('Login failed - request error ' + res);
      sendResult('Login failed - request error ');
    },
    timeout: 3000
  });
});








function sendSuccess(block, text){
  let p = document.createElement('p');
  p.innerHTML = text;
  block.appendChild(p);
  setTimeout(
    function(){
      block.classList.remove('sending');
      while (block.firstChild) block.removeChild(block.firstChild);
      $('.close').click()
  },8000)
}


function doValidStyle(inp){
  var controlBox = inp.parent('div');
  controlBox.removeClass('wrong')
  return true
}
function doWrongStyle(inp){
  var controlBox = inp.parent('div');
  controlBox.addClass('wrong');
  return false
}

function valid_email(inp){
  var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return re.test(inp.val()) ? doValidStyle(inp) : doWrongStyle(inp)
}
function non_empty(inp){
  return (inp.val() == '' || inp.val() == 'empty') ? doWrongStyle(inp) : doValidStyle(inp)
}

function valid_inp(inp,type){
  // //console.log('2: valid input: ',inp[0].tagName, $(this).attr('id'));
  var validInp = (inp[0].tagName == 'TEXTAREA' || type === 'phone' || type === 'text') ? non_empty(inp) : type === 'email' ? valid_email(inp) : false;
  !validInp ? console.log('4 wrong el : ',inp[0].tagName+' '+ inp.attr("id")) : '';
  return validInp
}
function valid_form(form){
  var validForm = true;
  $(form).find('.required').each(function(){
    //console.log('1 ------------------- REQ each');
    if(valid_inp($(this), $(this).attr('type')) === false)  validForm = false ;
  });
  // console.log('++++++++++++++++++++++++++++++++++++++++\n5: form VALID:', validForm);
  return validForm;
}

function contMail(form){
  let $cont = $('<div class="cont" />');

  $(form).find('input, textarea').each(function(){
    let el = $(this), label = $(this).next().text();
    $cont.append( $('<p><span style="display:inline-block;width:200px;text-align:right;">'+label+': </span>  <span><strong>'+el.val()+'</strong></span></p>') )
  });
  return $cont.html()
}

// $("#login_form-bttn").on("click", function(event){
//   var fform = $("#login_form");
//   var formData = {};
//   formData.username = fform.find("input[name=fusername]").val();
//   formData.password = fform.find("input[name=fpassword]").val();
//   formData.uniq_param = (new Date()).getTime();
//   console.log("*/*" + formData.username + ' *');


//   $.ajax({
//     url: 'cnt_login',
//     type: 'POST',
//     data: formData,
//     success: function(res){
//       document.getElementById("fusername") = '';
//       document.getElementById("fpassword").value = '';
//         console.log('Index ' + res.indexOf('OK: '));
//       if ( res.indexOf('OK: ') == 0 ){
//         sendResult('Login OK ');
//         window.location.href = res.substring(4);
//       } else {
//         console.log('Login failed ' + res);
//         sendResult('Login failed ');
//       }
//     },
//     error: function(jqXhr, textStatus, errorMessage){
//       console.log('Login failed - request error ' + errorMessage);
//       sendResult('Login failed - request error ');
//     },
//     timeout: 3000
//   });
// });

$('#consult button, #contact-form button').click(function (e) {
  e.preventDefault();

  let form = $(this).closest('form')[0];

  if(valid_form(form)){

    let cont = contMail(form),
        sbj = form.dataset.sbj ? form.dataset.sbj : 'I want consultation: ' + document.querySelector('#product').value,
        formData = new FormData(form)
        sending = form.querySelector('[data-sending]');

    formData.append('sbj',sbj);
    formData.append('cont',cont);

    // lio: for off mailTo in form_custom.pl
    // formData.append('test','test');

    // console.log('\n\n',...formData);
    // console.log('\n\n',cont);

    // sending.classList.add('sending')
    // sendSuccess(sending, msg_success)
    // return 1;

    $.ajax({
      url: 'form_custom',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      beforeSend: function(){
        sending.classList.add('sending')
      },
      success: function(res){
        if( res == 1 ){
          // console.log("OOOOOOOOOOOKKKKKKKKKKKbbbbbbbbbbbbboooooooooooooooooooooooooTTTTTTTTTTTT");
          sendSuccess(sending, msg_success)
          form.reset();
          form.querySelectorAll('.mdl-textfield').forEach(function(e){ return e.classList.remove('is-dirty','is-upgraded')})
        }else{
          sendSuccess(sending, msg_error)
        }

      },
      error: function(){
        alert('ERROR!!!');
      }
    });
  }

});


