(function(cash) { "use strict";
					 
				 
     /***********************************/
	/*REVOLUTION SLIDER*/
	/**********************************/
				 
	var RevolSlider;
     $(function(){
	  if ($('.banner').length){	 
        RevolSlider = jQuery('.banner').revolution(
		  {
			dottedOverlay:"none",
			autoplay: 2000,
			hideTimerBar:"off",
			fullWidth:"on",
			swipe_velocity:"0.7",
			fullScreen: "on",
			fullScreenOffsetContainer:"header",
			naigationVAlign: "center",
			autoHeight:"off",
			minHeight:600
		  });
	  }
		 
     });
				 
	/***********************************/
	/*Swiper Slider*/
	/**********************************/
		
    var swipers = [];
    var winW = $(window).width();
    var winH  =  $(window).height();
	var xsPoint = 700, smPoint = 991, mdPoint = 1199; 
	var initIterator = 0;
				 
				 
    function swiperInit(){
		
		  $('.swiper-container').each(function(){								  
			var $th = $(this);								  
			var index = $th.attr('id'); 
				$(this).addClass('swiper-'+index + ' initialized').attr('init-attr', 'swiper-'+index);
				$(this).find('.pagination').addClass('pagination-'+index);
			
				var autoPlayVar = parseInt($th.attr('data-autoplay'),10);
				var slidesPerViewVar = $th.attr('data-slides-per-view');
			    var loopVar = parseInt($th.attr('data-loop'),10);
			    var mouseVar = parseInt($th.attr('data-mouse'),10);
			    var sliderSpeed = parseInt($th.attr('data-speed'),10);
			    var touchVar = parseInt($th.attr('data-touch'),10);
			    var xsValue, smValue, mdValue, lgValue;
			    var slideMode =  $th.attr('data-mode');
			    var centerSlide =  $th.attr('data-center');
			    if(slidesPerViewVar == 'responsive'){
					 xsValue = parseInt($th.attr('data-xs-slides'),10);
					 smValue = parseInt($th.attr('data-sm-slides'),10);
					 mdValue = parseInt($th.attr('data-md-slides'),10);
					 lgValue = parseInt($th.attr('data-lg-slides'),10);
					 slidesPerViewVar = updateSlidesPerView(xsValue, smValue, mdValue, lgValue);
                } else slidesPerViewVar = parseInt(slidesPerViewVar);
				
				swipers ['swiper-'+index] = new Swiper('.swiper-'+index,{
					speed: sliderSpeed,
					loop: loopVar,
					mode: slideMode,
					grabCursor: true,
					centeredSlides: centerSlide,
					pagination: '.pagination-'+index,
					paginationClickable: true,
					autoplay: autoPlayVar,
					autoplayDisableOnInteraction: true,
					slidesPerView: slidesPerViewVar,
					keyboardControl: true,
					simulateTouch: touchVar,
					calculateHeight: true,
					mousewheelControl: mouseVar,
					onInit: function(swiper){
					var activeIndex = (loopVar===true)?swiper.activeIndex:swiper.activeLoopIndex;
					if($th.closest('#slider').length) {
                     	  $('.points').on('click', function(){
                            var eqIndex = $('.points').index(this);
                            $('.points').removeClass('act');
							$('.absolut-point').css({'left': $(this).offset().left -$(this).parent().offset().left});
                            $(this).addClass('act');
                            swiper.swipeTo(eqIndex);
                            swiper.stopAutoplay();
                            return false;
                        });
					}	
					},
					onSlideChangeStart: function(swiper){
					var activeIndex = (loopVar===true)?swiper.activeIndex:swiper.activeLoopIndex;
					if($th.closest('.testi-slider-app').length){
						$th.closest('.client-app').find('.clients-slider .logotype-clients').removeClass('active');
						$th.closest('.client-app').find('.clients-slider .logotype-clients').eq(activeIndex).addClass('active');
					}
				    if($th.closest('.menu-slider').length){
					    $th.closest('.rest-menu').find('.res-point').removeClass('active');
						$th.closest('.rest-menu').find('.res-point').eq(activeIndex).addClass('active');
					}
				    },
					onSlideChangeEnd: function(swiper){
					var activeIndex = (loopVar===true)?swiper.activeIndex:swiper.activeLoopIndex;
					if($th.closest('.career-slider').length){
					   $th.closest('.car-home').find('.career-point').removeClass('active');
						$th.closest('.car-home').find('.career-point').eq(activeIndex).addClass('active');
					}
					}
				});
  
			swipers['swiper-'+index].reInit();
		    initIterator++;
       
		});
	 }
				 
	 $('.slide-prev').on('click', function(){
     var arIndex = $(this).parent().find('.swiper-container').attr('init-attr');
      swipers[arIndex].swipePrev();
     });

     $('.slide-next').on('click', function(){
     var arIndex = $(this).parent().find('.swiper-container').attr('init-attr');
      swipers[arIndex].swipeNext();
     });
				 
			 
	 $('.slide-prev-slide').on('click', function(){
     var arIndexNew = $(this).parent().parent().find('.swiper-container').attr('init-attr');
      swipers[arIndexNew].swipePrev();
     });

     $('.slide-next-slide').on('click', function(){
     var arIndexNew = $(this).parent().parent().find('.swiper-container').attr('init-attr');
      swipers[arIndexNew].swipeNext();
     });

				 	 
	function updateSlidesPerView(xsValue, smValue, mdValue, lgValue){
         if(winW > mdPoint) return lgValue;
         else if(winW>smPoint) return mdValue;
         else if(winW>xsPoint) return smValue;
         else return xsValue;
    }			 				 			   
    swiperInit();
				 
				 
    $('.clients-slider .logotype-clients').on('click' ,function(){
		if($(this).hasClass('active')) return false;
		var val = $(this).parent().parent().find('.log-click').index($(this).parent());
		swipers['swiper-'+$(this).closest('.client-app').find('.testi-slider-app.swiper-container').attr('id')].swipeTo(val);

		var parentSwiper = $(this).closest('.client-app').find('.clients-slider');
		if(parentSwiper.hasClass('swiper-container')) swipers['swiper-'+parentSwiper.attr('id')].swipeTo(val);
		$('.clients-slider .logotype-clients').removeClass('active');
		$(this).addClass('active');
	});
				 
	$('.rest-slide-point .res-point').on('click', function(){
		if($(this).hasClass('active')) return false;
		var valMenu = $(this).parent().parent().find('.point-click').index($(this).parent());
		swipers['swiper-'+$(this).closest('.rest-menu').find('.menu-slider.swiper-container').attr('id')].swipeTo(valMenu);

		var menuSwiper = $(this).closest('.rest-menu').find('.rest-slide-point');
		if(menuSwiper.hasClass('swiper-container')) swipers['swiper-'+menuSwiper.attr('id')].swipeTo(valMenu);
		$('.rest-slide-point .res-point').removeClass('active');
		$(this).addClass('active');
	});			 
				 
	$('.career-point').on('click', function(){
	   var carVal = $('.career-point').index(this);
           swipers['swiper-'+$(this).closest('.car-home').find('.career-slider.swiper-container').attr('id')].swipeTo(carVal);
		 $('.career-point').removeClass('active');
		  $(this).addClass('active');
		   
    });
	
	$('.points-prev').on('click', function(){
	    var PointInd = $('.points-prev').index(this);
		  $('.points-prev').removeClass('active');
		    $(this).addClass('active');
		      return false;
	});			 
			 
	/***********************************/
	/*SCROLLBOX PLUGIN*/
	/**********************************/
				 
	if ($('#scroll-box').length){			 
		$('#scroll-box').scrollbox({
		  linear: true,
		  step: 1,
		  delay: 0,
		  speed: 70,
		  queue: 'scroll-box-queue'
		});			 
	}
				 		 
	/***********************************/
	/*VIDEO CKICK*/
	/**********************************/
				 
	$('.video-click').on( "click", function() {
			$(this).find('iframe').attr('src',$(this).find('.video-change').attr('href') + '&autoplay=1');
              $(this).find('.video').show();
              $(this).find('.img-href').hide();
			  $(this).find('.play').hide();
	    });
				   
		$('.video .close-v').on('click', function(){
			$('.video').fadeOut(500, function(){
				$('.video iframe').attr('src','');
				$('.img-href').show();
				$('.play').show();
			});
	});
				 
	function rax() {
      $(function(){
           if($(window).width()>980){
              $('.main-wrap').css({'margin-bottom':$('.footer-fix').height()});
              $('.footer-fix').removeClass('no-fix');
           }else{
              $('.main-wrap').css({'margin-bottom':'0px'});
              $('.footer-fix').addClass('no-fix');
           }
	  });
	}
	
	/***********************************/
	/*BOOTSTRAP ACARDION*/
	/**********************************/			 
				 
	$(".togglec").hide();
         $(".togglet").on('click', function(e) {
             $(this).toggleClass("toggleta").next(".togglec").slideToggle(300);
                return true;
    });
				 
	/***********************************/
	/*DROPDOWN LIST*/
	/**********************************/			 
				 
	$('.drop').on( "click", function() {
			if($('.drop-list').hasClass('act')){
				$(this).find('.drop-list').removeClass('act');
				$(this).find('span').slideUp(300);
			}else{
               $('.drop span').slideUp(300);
				$(this).find('.drop-list').addClass('act');
                
				$(this).find('span').slideDown(300);
			}
			return false;
		});
		
    $('.drop span button, .drop span a').on( "click", function() {
			$(this).parent().parent().find('b').text($(this).text());
			$('.drop').find('span').slideUp(300);
		});			 
				 
	/***********************************/
	/*MENU LINK CLICK*/
	/**********************************/
				 
	function setLocation(curLoc){
       location.hash = curLoc;
     }
		 
	var top_menu = 0;			 
	 $('.creative nav a').on('click', function(){
	  top_menu = $('.creative nav a').index(this);
           $('.creative nav a').removeClass('active');
		   $('.nav-menu-icon a').removeClass('active');
           $(this).addClass('active');
		   $('.creative nav').removeClass('slide-menu');
		   $('body').removeClass('fix');
           $('body,html').animate({'scrollTop':$('.scrollto').eq(top_menu).offset().top - $('header').height()},800); 
           setLocation($(this).attr('data-href'));
    });
				 
	$('.flat nav a').on('click', function(){
	 top_menu = $('.flat nav a').index(this);
           $('.flat nav a').removeClass('active');
           $(this).addClass('active');
		   $('.flat header').removeClass('slide-menu');
		   $('.flat .logo').removeClass('scaleLogo');
		   $('.logo-text').removeClass('move');
		   $('body').removeClass('fix');
           $('body,html').animate({'scrollTop':$('.scrollto').eq(top_menu).offset().top},800); 
           setLocation($(this).attr('data-href')); 
    });
				 
	$('.rest nav a').on('click', function(){
	 top_menu = $('.rest nav a').index(this)-1;
           $('.rest nav a').removeClass('active');
           $(this).addClass('active');
		   $('.rest  header').removeClass('move');
		   $('body').removeClass('fix');
		   $('.rest .nav-menu-icon a').removeClass('active');
           $('body,html').animate({'scrollTop':$('.scrollto').eq(top_menu).offset().top},800); 
           setLocation($(this).attr('data-href')); 
    });			 
				 
	$('.main nav a').on('click', function(){
     top_menu = $('.main nav a').index(this);
           $('.main nav a').removeClass('active');
           $(this).addClass('active');
		   $('.main nav').removeClass('slide-menu');
		   $('.nav-menu-icon a').removeClass('active');
		   $('body').removeClass('fix');
           $('body,html').animate({'scrollTop':$('.scrollto').eq(top_menu).offset().top - $('header').height()},800); 
           setLocation($(this).attr('data-href'));
    });			 
				 
	/***********************************/
	/*WINDOW RESIZE*/
	/**********************************/
				 
	function resizeCall() {
		rax();
		winW = $(window).width();
   		winH = $(window).height();
         $('.swiper-container[data-slides-per-view="responsive"]').each(function(){
			 var $th = $(this);
			 var xsValue = parseInt($th.attr('data-xs-slides'), 10);
			 var smValue = parseInt($th.attr('data-sm-slides'), 10);
			 var mdValue = parseInt($th.attr('data-md-slides'), 10);
			 var lgValue = parseInt($th.attr('data-lg-slides'), 10);
			 var currentSwiper = swipers[$(this).attr('init-attr')];
			 var newSlideNumber = updateSlidesPerView(xsValue, smValue, mdValue, lgValue);
			 currentSwiper.params.slidesPerView = newSlideNumber;
             currentSwiper.reInit();
         });
    }

    $(window).resize(function(){
         resizeCall();
    });	
				 
	window.addEventListener("orientationchange", function() {
         resizeCall();
    }, false);				 
	 			 
				 
	/***********************************/
	/*GOOGLE MAP*/
	/**********************************/
				 		 
	function initialize(obj) {
		var stylesArray = {
		'style-1' : {
    		'style': [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}]
		},
	    'style-2' : {
    		'style': [{"featureType":"all","elementType":"geometry","stylers":[{"color":"#dddddd"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"gamma":0.01},{"lightness":20}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"saturation":-31},{"lightness":100},{"weight":3},{"gamma":0.8}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"on"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#050505"}]},{"featureType":"administrative.locality","elementType":"labels.text.stroke","stylers":[{"color":"#fef3f3"},{"weight":"3.01"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.fill","stylers":[{"color":"#0a0a0a"},{"visibility":"off"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.stroke","stylers":[{"color":"#fffbfb"},{"weight":"3.01"},{"visibility":"off"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"lightness":100},{"saturation":30}]},{"featureType":"poi.attraction","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"lightness":100},{"saturation":-20}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":10},{"saturation":-30}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"saturation":25},{"lightness":25}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#a1a1a1"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#292929"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"color":"#202020"}]},{"featureType":"road.highway","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"labels.icon","stylers":[{"visibility":"simplified"},{"hue":"#0006ff"},{"saturation":"-100"},{"lightness":"13"},{"gamma":"0.00"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#686868"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#8d8d8d"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"color":"#353535"},{"lightness":"6"}]},{"featureType":"road.arterial","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"weight":"3.45"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"#d0d0d0"}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"lightness":"2"},{"visibility":"on"},{"color":"#999898"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#383838"}]},{"featureType":"road.local","elementType":"labels.text.stroke","stylers":[{"color":"#faf8f8"}]},{"featureType":"water","elementType":"all","stylers":[{"lightness":-20}]}]
		},
	    'style-3' : {
			'style':[{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}]
		}		
		}
		
		
		var lat = $('#'+obj).attr("data-lat");
        var lng = $('#'+obj).attr("data-lng");
		var contentString = $('#'+obj).attr("data-string");
		var myLatlng = new google.maps.LatLng(lat,lng);
		var map, marker, infowindow;
		var image = 'img/marker.png';
		var zoomLevel = parseInt($('#'+obj).attr("data-zoom"),10);
		var styles = stylesArray[$('#map-canvas-contact').attr("data-style")]['style'];
		var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});
	    
		var mapOptions = {
			zoom: zoomLevel,
			disableDefaultUI: true,
			center: myLatlng,
            scrollwheel: false,
			mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
			}
		}
		
		map = new google.maps.Map(document.getElementById(obj), mapOptions);
	
		map.mapTypes.set('map_style', styledMap);
		map.setMapTypeId('map_style');
	
		infowindow = new google.maps.InfoWindow({
			content: contentString
		});
      
	    
        marker = new google.maps.Marker({
			position: myLatlng,
			map: map,
			icon: image
		});
	
		google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map,marker);
		});
	
	}
	
	/***********************************/
	/*MAGNIFIC POPUP*/
	/**********************************/
				 
	if($('.image-link').length){
	 $('.image-link').magnificPopup({type:'image'});
	}
     $('.rest-slide').on('click', function(){
	    if($('body').hasClass('fix')){
		   $('body').removeClass('fix');
		}else{
		   $('body').addClass('fix');
		}
		return false;
	});				 
				 
	/***********************************/
	/*PHOTOSWIPE GALLERY*/
	/**********************************/          
                 
   var initPhotoSwipeFromDOM = function(gallerySelector) {
    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            childElements,
            linkEl,
            size,
            item;
        for(var i = 0; i < numNodes; i++) {
            figureEl = thumbElements[i]; // <figure> element
            if(figureEl.nodeType !== 1) {
                continue;}
            linkEl = figureEl.children[0]; // <a> element
            size = linkEl.getAttribute('data-size').split('x');
            item = {src: linkEl.getAttribute('href'), w: parseInt(size[0], 10),h: parseInt(size[1], 10)};
            if(figureEl.children.length > 1) {item.title = figureEl.children[1].innerHTML; }
            if(linkEl.children.length > 0) {item.msrc = linkEl.children[0].getAttribute('src');} 
            item.el = figureEl; items.push(item);}
        return items;};
    var closest = function closest(el, fn) {return el && ( fn(el) ? el : closest(el.parentNode, fn) );};
    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
        var eTarget = e.target || e.srcElement;
        var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');});
        if(!clickedListItem) {return;}
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,index;
        for (var i = 0; i < numChildNodes; i++) {
            if(childNodes[i].nodeType !== 1) { continue; }
            if(childNodes[i] === clickedListItem) { index = nodeIndex; break;} nodeIndex++; }
        if(index >= 0) {openPhotoSwipe( index, clickedGallery ); }return false;};
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
        params = {};
        if(hash.length < 5) {
            return params;
        }
        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');  
            if(pair.length < 2) {
                continue;
            }           
            params[pair[0]] = pair[1];
        }
        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }
        if(!params.hasOwnProperty('pid')) {
            return params; }
        params.pid = parseInt(params.pid, 10);
        return params;};
    var openPhotoSwipe = function(index, galleryElement, disableAnimation) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;
        items = parseThumbnailElements(galleryElement);
        options = {
            index: index,
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),
            getThumbBoundsFn: function(index) {
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect(); 
                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};},history: false,
           focus: false };

        if(disableAnimation) {
            options.showAnimationDuration = 0;}
        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();};
    var galleryElements = document.querySelectorAll( gallerySelector );
    for(var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i+1);
        galleryElements[i].onclick = onThumbnailsClick;}
    var hashData = photoswipeParseHash();
	
    if(hashData.pid > 0 && hashData.gid > 0) {openPhotoSwipe( hashData.pid - 1 ,  galleryElements[ hashData.gid - 1 ], true );} };
    initPhotoSwipeFromDOM('.my-simple-gallery');
			
				 
    $('.info-button').on('click', function(){
	     if($('.popup-info-modal').hasClass('slide')){
		    $('.popup-info-modal').removeClass('slide');
		 }else{
		    $('.popup-info-modal').addClass('slide');
		 }
		return false;
	});	

		
	/***********************************/
	/*DROPDOWN*/
	/**********************************/
				 
	$('.dropdown').on( "click", function() {
			if($('.drop-list').hasClass('act')){
				$('.drop-list').removeClass('act');
				$('.dropdown').find('.list').slideUp(300);
				$('.dropdown').removeClass('bgg');
			}else{	
				$('.drop-list').addClass('act');
				$('.dropdown').find('.list').slideDown(300); 
				$('.dropdown').addClass('bgg');
			}
			return false;
		});
				 
    $('.dropdown .list a').on( "click", function() {
			$(this).parent().parent().find('.check').text($(this).text());
			$('.dropdown').find('.list').slideUp(300);
		    $('.dropdown .list a span').removeClass('visi');
            $(this).find('span').addClass('visi'); 
		    $('.dropdown .list a').removeClass('color');
		    $(this).addClass('color');
		});
	
	/***********************************/
	/*MOBILE MENU*/
	/**********************************/
				 
	$('.nav-menu-icon a').on("click", function() { 
	  if ($('nav').hasClass('slide-menu')){
		  $('nav').removeClass('slide-menu');
		  $('body').removeClass('fix');
		  $(this).removeClass('active');
	  }else {
		  $('nav').addClass('slide-menu');
		  $('body').addClass('fix');
		  $(this).addClass('active');
	  }
		return false;
	});
				 
	$('.rest .nav-menu-icon a').on("click", function() { 
	  if ($('.rest  header').hasClass('move')){
		  $('.rest  header').removeClass('move');
		  $('body').removeClass('fix');
		  $(this).removeClass('active');
	  }else {
		  $('.rest  header').addClass('move');
		  $('body').addClass('fix');
		  $(this).addClass('active');
	  }
		return false;
	});			 
				 
	/***********************************/
	/*LEFT MENU FLAT DESIGN*/
	/**********************************/
				 
    $('.flat .logo').on("click", function() { 
	  if ($('.flat header').hasClass('slide-menu')){
		  $('.flat header').removeClass('slide-menu'); 
		  $(this).removeClass('scaleLogo');
		  $('.logo-text').removeClass('move');
		  $('.flat').removeClass('fix');
	  }else {
		  $('.flat header').addClass('slide-menu');
		  $(this).addClass('scaleLogo');
		  $('.logo-text').addClass('move');
		  $('.flat').addClass('fix');
	  }
		return false;
	});				 
				 
	/***********************************/
	/*ISOTOPE PLUGIN*/
	/**********************************/			 
				 
    function getItemElements() {
                var $item = $('.item').slice(3).clone();
                 return $item;
              }			 
				 
	 if ($('.izotope-container').length) { 
			 var $container = $('.izotope-container');
              $container.isotope({
                itemSelector: '.item',
                layoutMode: 'masonry',
                masonry: {
                  columnWidth: '.grid-sizer'
                }
              });
			  
			  $('.load-more').on( 'click', function(e) {
				e.preventDefault();
				   $(this).fadeOut(300);
				   $('.work').append('<span class="no-more">no more projects</span>');
				      var $elems = getItemElements();
				        $container.append( $elems )
					   .isotope( 'appended', $elems );
				});

			  $('#filters').on( 'click', '.button', function() {
				$('.izotope-container').each(function(){
				   $(this).find('.item').removeClass('animated');
				});
				$('#filters .button').removeClass('activbut');
				  $(this).addClass('activbut');
					 var filterValue = $(this).attr('data-filter');
						$container.isotope({filter: filterValue});
              });
	
           }
	
	/***********************************/
	/*WINDOW SCROLL*/
	/**********************************/			 
				 
	$(window).scroll(function() {
		
	    if ($('.time-line').length) {
		 $('.time-line').not('.animated').each(function(){
		  if($(window).scrollTop() >= $(this).offset().top-$(window).height()*0.5)
		   {$(this).addClass('animated').find('.timer').countTo();}});
		}
		
		if ($('.start-line').length){
			if($(window).scrollTop() >= $('.start-line').offset().top - $('.start-line').height()){
				 $('.skill-line div').each(function(){
							var objel = $(this);
							var pb_width = objel.attr('data-width-pb');
							objel.css({'width':pb_width});
						});
			  }
		 }
		
		if ($(this).scrollTop() > 50) {
		   $('.app .navigation').addClass('scrol');
		}else{
		   $('.app .navigation').removeClass('scrol');
		}
	});
				 
	/***********************************/
	/*TIMER*/
	/**********************************/			 
				 
    function setTimer(){					   	
		var today = new Date();
		var finalTime = new Date("july,27,2015");
		var interval = finalTime - today;
		if(interval<0) interval = 0;
		var days = parseInt(interval/(1000*60*60*24),10);
		var daysLeft = interval%(1000*60*60*24);
		var hours = parseInt(daysLeft/(1000*60*60),10);
		var hoursLeft = daysLeft%(1000*60*60);
		var minutes = parseInt(hoursLeft/(1000*60),10);
		var minutesLeft = hoursLeft%(1000*60);
		var seconds = parseInt(minutesLeft/(1000),10);
		$('.days').text(days);
		$('.hours').text(hours);
		$('.minutes').text(minutes);
		$('.seconds').text(seconds);
	}
	setTimer();
	setInterval(function(){setTimer();}, 1000);			 
				 
	/***********************************/
	/*WINDOW LOAD*/
	/**********************************/
 
    $(window).load(function() {
		rax();
		if($('#map-canvas-contact').length==1){
		  initialize('map-canvas-contact');}
		
        $('.loader').hide();
		
	    if ($('.izotope-container').length) { 
			 var $container = $('.izotope-container');
               $container.isotope({
                itemSelector: '.item',
                layoutMode: 'masonry',
                masonry: {
                  columnWidth: '.grid-sizer'
                }
              });
           }
	});
				 			 
				 
})(jQuery); 