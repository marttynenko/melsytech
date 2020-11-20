$.fn.Tabs = function() {
	var selector = this;

	this.each(function() {
		var obj = $(this); 
		$(obj.attr('href')).hide();
		$(obj).click(function() {
			$(selector).removeClass('selected');
			
			$(selector).each(function(i, element) {
				$($(element).attr('href')).hide();
			});
			
			$(this).addClass('selected');
			$($(this).attr('href')).fadeIn();
			return false;
		});
	});

	$(this).show();
	$(this).first().click();
	if(location.hash!='' && $('a[href="' + location.hash + '"]').length)
		$('a[href="' + location.hash + '"]').click();	
};

//lazy load для сторонних либ
function lazyLibraryLoad(scriptSrc,linkHref,callback) {
  let script = document.createElement('script');
  script.src = scriptSrc;
  document.querySelector('script[src*="main.js"]').before(script);

  if (linkHref !== '') {
    let style = document.createElement('link');
    style.href = linkHref;
    style.rel = 'stylesheet';
    document.querySelector('link[href*="main.css"]').before(style);
  }

  script.onload = callback
}





$(document).ready(function () {

  function addBodyPadding () {
    const padding = $('header#header').innerHeight();
    $('#page').css('paddingTop',`${padding}px`);
  }
  
  $(window).on('load resize',addBodyPadding)
  addBodyPadding();


  $('.video-about-lasers').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    centerMode: true,
    variableWidth: true
  });

  $('.flexslider-promo').flexslider({
    animation: "slide",
    touch: true,
  });

  $(document).on('click','li.dropdown > span',function(e){
    e.preventDefault();
    $(this).next('ul.dropdown-menu').toggleClass('show');
  })

  /* var position = $(document).scrollTop();
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $('body').addClass("scrolled");
    }
    else {
      $('body').removeClass("scrolled");
    }
    var scroll = $(window).scrollTop();
    if (scroll > position) {
      $('body').addClass("scrolldown");
      $('body').removeClass("scrollup");
    }
    else {
      $('body').addClass("scrollup");
      $('body').removeClass("scrolldown");
    }
    position = scroll;
  }); */

  $('.ui-slick').slick({
    dots: true
  })
  $('.slick-magic').slick({
    fade: true,
    speed: 500,
    cssEase: 'linear'
  });

  $(document).on('click','.menu-toggler',function(e){
    e.preventDefault();
    $(this).toggleClass('opened');
    $('.main-menu').toggleClass('opened');
  })


  $('.faq-tabs a').Tabs();


  $(document).on('click','.faq-item-toggler',function(e){
    e.preventDefault();
    const item = $(this).closest('.faq-item');
    const itemIsOpen = item.attr('data-isopen') || false;
    const isopen = (itemIsOpen === 'false') ? false : true;
    

    if (isopen) {
      item.find('.faq-item-txt').removeClass('toggled')
      item.find('.faq-item-toggler')
        .each(function(key,item){
          $(item).text($(item).attr('data-open'))
        })
    } else {
      item.find('.faq-item-txt').addClass('toggled')
      item.find('.faq-item-toggler')
        .each(function(key,item){
          $(item).text($(item).attr('data-close'))
        })
    }
    item.attr('data-isopen',!isopen);
  })


  lazyLibraryLoad(
    'https://cdnjs.cloudflare.com/ajax/libs/fotorama/4.6.4/fotorama.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/fotorama/4.6.4/fotorama.min.css',
  )

  
  
});