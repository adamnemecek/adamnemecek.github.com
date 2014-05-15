jQuery(document).ready(function(){
	(function( $ ) { 
/*        Skype.ui({
            name: "call",
            element: "skype-link",
            participants: ["jiri_translite"],
            imageSize: 10,
            imageColor: "skype"
        });*/

 		/* 
 		* Top Header Social Media Hover Direction 
 		* Credits: http://tympanus.net/codrops/2012/04/09/direction-aware-hover-effect-with-css3-and-jquery/
 		*/
 		if(jQuery().hoverdir) {
			$('.social-media li').each( function() { $(this).hoverdir(); } );
			$('.widget-social-media ul li').each( function() { $(this).hoverdir(); } );
		}

		var t = setTimeout ( hoverDirPostThumb, 1500 );
		function hoverDirPostThumb() {
			if(jQuery().hoverdir) {
				$('.hoverdir').each( function() { $(this).hoverdir(); } );
			}
		}

		/*
		*	Preloadify Blog Images
		*/
	    if(jQuery().preloadify) {
            $(".content").find('.preload').preloadify({preload_parent: 'post-thumb', delay: 300, imagedelay: 750 });
		}

		/*
		* Clone the menu so we can use it for a mobile menu. Different styling. 
		*/
		var menuClone = $('#header-menu').clone().attr('id', 'menu-mobile').removeClass('menu');

		/* In the new menu, look for sub-menus and add extra class */
		menuClone.children().find('ul.sub-menu').parent().addClass('li-submenu').append('<span class="li-sub-indicator"></span>');

		/* Function to create the menu and append it in the header. */
		function createMobileMenu() {
			 		
			windowWidth = $(window).width();
		
			if( windowWidth < 992 ) {
				if( !$('#menu-mobile-holder').length) {
					$('.menu-mobile-wrapper').append('<div id="menu-mobile-holder"></div>');
					$('#menu-mobile-holder').prepend(menuClone);

					$('span.li-sub-indicator').click(function() {
						$(this).siblings('ul.sub-menu').slideToggle();
					});
				}
			} else { 
				$('#menu-mobile-holder').remove();
			}
 		}
 		createMobileMenu();

 		/* When someone resizes the window, call the function again. */
 		$(window).resize(function(){
 			createMobileMenu();
 		});

 		/* SlideToggle the sub-menu in the mobile menu */
 		$('.menu-mobile-wrapper').find('#menu-mobile-trigger').bind('click', function(){
 			$('#menu-mobile-holder').stop().slideToggle(200);
 		});	


		/* 
 		* Superfish DropDown Menu
 		* Credits: http://users.tpg.com.au/j_birch/plugins/superfish/
 		*/
		    $('ul#header-menu').superfish({
				delay:       200,                            // one second delay on mouseout
		        animation:   {opacity:'show',height:'show'},  // fade-in and slide-down animation 
		        speed:       300,                          // faster animation speed 
		        autoArrows:  true                         // disable generation of arrow mark-up 
		    });


	    /*
	    * 	Custom Build Menu Hover. Follows the hover state on the menu items. 
		*	Change: var speed = 500; //transition speed 
	    */
	    var speed = 500;
	    var activeMenuItem = $('li.active');
	    var menuSlider = $('.menu-slider');

	    // Grap width from the active menu item
	    var w = activeMenuItem.width();
	   	menuSlider.width(w + 'px');

	    var left = activeMenuItem.position().left;
	    menuSlider.animate({left: left});
	    
	    // Move on hover 
	    $('.menu > li').hover( function() { 
	    	var w = $(this).width();

		    var left = $(this).position().left;
		   
		    menuSlider.stop().animate( { 
		    	width: w,
		    	left: left
		    }, speed)		    	
		}, function() {
			menuSlider.stop().animate( { 
		    	width: w,
		    	left: left
		    }, speed)
		});


		/*
		*	Slider OneByOne
		*	Credits: http://codecanyon.net/item/jquery-onebyone-slider-plugin/684613
		*/
		if(jQuery().oneByOne) { 
			$('#slides-container').oneByOne({
				className: 'oneByOne1',	             
				width: 1000,
				height: 400,
				easeType: 'random',
				slideShow: false,
				responsive: true,
				minWidth: 480,
				showButton: false,
				enableDrag: false
			});
		}

		/* 
		*	LayerSlider
		*	Credits: http://codecanyon.net/item/layerslider-the-parallax-effect-slider/922100
		*/
		
		if(jQuery().layerSlider) { 
			sliderWrapW = $('#homepage-slider').width();
			$('#layerslider').layerSlider({
				width 				: sliderWrapW,
				autoStart			: false,
				responsive			: false,
	   			pauseOnHover		: true,
				firstLayer			: 1,
				animateFirstLayer	: true,
				twoWaySlideshow		: true,
	    		keybNav				: true,
	    		touchNav			: true,
	    		imgPreload			: true,
	    		navPrevNext			: true,
	    		navStartStop		: false,
	    		navButtons			: false,
	    		skin				: 'verendus',
	    		skinsPath			: 'css/skins/',
	    		globalBGColor		: '#f6f6f6',
	    		yourLogo			: false,
	    		yourLogoStyle		: 'position: absolute; left: 10px; top: 10px; z-index: 99;',
	    		yourLogoLink		: false,
	    		yourLogoTarget		: '_self',
	    		
	    		loops				: 2,
	    		forceLoopNum		: false,
	    		autoPlayVideos		: false,
	    		autoPauseSlideshow	: 'auto',
	    		youtubePreview		: 'hqdefault.jpg',
	    		
	    		cbInit				: function() { },
	    		cbStart				: function() { },
	    		cbStop				: function() { },
	    		cbPause				: function() { },
	    		cbAnimStart			: function() { },
	    		cbAnimStop			: function() { },
	    		cbPrev				: function() { },
	    		cbNext				: function() { 
	    			// Hide the slide-form-response if someone did send the form. 
	    			$('.slider-form-response').fadeOut(500, function() { $(this).css('z-index', '-999') }); 
	    		}
	    	});
		}

		/*
		*	Custom Large Menu
		*/	
		$('.menu li').hover(function() {
			$(this).addClass('menu-big-hover');
			$(this).find('div.submenu-big').show();
			$(this).find('div.submenu-big').stop().animate({
				height: "auto",
				opacity: 1
			}, 300);
		}, function() {
			$(this).removeClass('menu-big-hover');
			$(this).find('div.submenu-big').hide();
			$(this).find('div.submenu-big').stop().animate({
				opacity: 0
			}, 100);
		});


		/* 
		*	Scroll to top function 
		*/
		$('.top-off-page a').click(function() {
			$('body,html').animate({scrollTop:0},600);
			return false;
		});	

		$('.divider-top span a').click(function() {
			$('body,html').animate({scrollTop:0},600);
			return false;
		});	

		/* 
		*	Custom Flickr Overlay
		*/
		$('.flickr-wrap div a').append('<span class="flickr-overlay"></span>');
		

		/*
		*	Adds overlay span to the Twitter Avatar. wait till DOM is ready loading.
		*/
		var t = setTimeout ( addTwitterOverlay, 1000 );
		function addTwitterOverlay() {
			$('.tweet_avatar').append('<span class="twitter-overlay"></span>');
		}

		/* 
		* 	Blog Format Gallery Bootstrap Carousel Slider and FlexSlider
		*/
		$('.carousel').carousel({interval: 5000});

		if(jQuery().flexslider) {
			$('.flexslider').flexslider({ 
				animation: "fade", 
				slideshowSpeed: 5000,
				prevText: "",
				nextText: ""
			});

			$('.flexslider-thumbs').flexslider({
			    animation: "slide",
			    controlNav: "thumbnails",
			});
		}

		/*
		*	Widget: Contact Form
		*/
		if(jQuery().validate) { 
			$("#contact-form-widget").validate({
				rules: {
					name: "required",
					email: { 
						required: true,
						email: true
					},
					message: {
						required: true
					}
				},			
				
				messages: {
					name: "",
					email: "",
					message: ""
				},

				errorElement: "div",
				errorClass: "contact-form-error",
			
				invalidHandler: function(form, validator) {	},
				submitHandler: function(form) {
					$.post('../php_includes/sendmail.php', $("#contact-form-widget").serialize(), function(data) {
						$('#contact-form-widget').fadeOut(300, function() {
							$('.contact-form-widget-respons').fadeIn(300);
						});
					});
				}
			});
		}

		/*
		*	Widget: Newsletter
		*/ 
		if(jQuery().validate) {
			$("#newsletter-form-widget").validate({
				rules: {
					email: { 
						required: true,
						email: true
					}
				},			
				
				messages: {
					email: "",
				},

				errorElement: "div",
				errorClass: "contact-form-error",
			
				invalidHandler: function(form, validator) { },
				submitHandler: function(form) {
					$.post('../php_includes/sendmail.php', $("#newsletter-form-widget").serialize(), function(data) {
						$('#newsletter-form-widget').fadeOut(300, function() {
							$('.widget-newsletter-respons').fadeIn(300);
						});
					});
				}
			});
		}

		/* Contact Form on Contact Page */
		if(jQuery().validate) {
			$("#contactform").validate({
				rules: {
					name: "required",
					email: { 
						required: true,
						email: true
					},
					website: {
						url: true
					},
					message: {
						required: true
					}
				},
				messages: {
						name: "",
						email: "",
						message: "",
				},
				errorElement: "div",
				errorClass: "contact-form-error",			
				invalidHandler: function(form, validator) {	},
				submitHandler: function(form) {
					$.post('../php_includes/sendmail.php', $("#contactform").serialize(), function(data) {
						$('#contactform').fadeOut(300, function() {
							$('.contact-form-respons').fadeIn(300);
						});
					});
				}
			});
		}

		/* Contact Form in Sliders */
		if(jQuery().validate) {
			$("#sliderform").validate({
				rules: {
					name: "required",
					email: { 
						required: true,
						email: true
					},
					website: {
						required: true
					}
				},
				messages: {
					name: "",
					email: "",
					message: ""
				},
				errorElement: "div",
				errorClass: "contact-form-error",			
				invalidHandler: function(form, validator) {	},
				submitHandler: function(form) {
					$.post('php_includes/sendmail.php', $("#sliderform").serialize(), function(data) {
						$('#sliderform').fadeOut(300, function() {
							$('.slider-form-response').css('z-index', '999').delay(5000).fadeOut('slow');					
						});
					});
				}
			});
		}

	 	/* 
	 	* Media Element Player 
	 	* http://mediaelementjs.com/
	 	*/
	 	if(jQuery().mediaelementplayer) { 
			$('video').mediaelementplayer({
				videoWidth: '100%',
				videoHeight: '100%',
				videoVolume: 'horizontal',
				alwaysShowControls: false,
				// the order of controls you want on the control bar (and other plugins below)
				features: ['playpause','progress','tracks','volume','fullscreen']
			});
			
			$('audio').mediaelementplayer({
				alwaysShowControls: true,
				audioWidth: '100%',
				audioHeight: 30,
				// the order of controls you want on the control bar (and other plugins below)
				features: ['playpause','progress','volume']
			});
		}
				

		/*
		*	Single page hover on authors name will show authors bio
		*/
		$('.meta-author-bio').find('h4').hover(function() {
			$('.meta-author-bio').find('.meta-author-bio-info').stop().fadeIn(100);
		}, function() {
			$('.meta-author-bio').find('.meta-author-bio-info').stop().fadeOut(100);
		});


		/*
		*	Jquery Isotop
		*	More information: http://isotope.metafizzy.co/
		*/
		if(jQuery().isotope) {
	        var portWrap = $('.portfolio-wrapper');
	        
	        if ( portWrap.hasClass('portfolio-one') ) {
				portWrap.isotope({
	            	itemSelector : '.portfolio-item',
	            	layoutMode : 'straightDown'
	       		});
			} else {
				portWrap.isotope({
		            itemSelector : '.portfolio-item',
		            layoutMode : 'fitRows'
		        });
			}        

	        $('.portfolio-filter a').click(function() {
	        	$('.button-active').removeClass('button-active');
	        	$(this).addClass('button-active');
	         	
	         	var selector = $(this).attr('data-filter');
	        	portWrap.isotope({ filter: selector });
	        	return false;
	        });
    	}

        /*
        *	prettyPhoto in portfolio items and gallery shortcodes
        *	More information: http://www.no-margin-for-errors.com/projects/prettyphoto-jquery-lightbox-clone/
        */
        if(jQuery().prettyPhoto) {
			$("a[data-rel^='prettyPhoto']").prettyPhoto({
				social_tools: false
			});
        }

        /*
        *	Infobox hide function
        */
        $('.info-hide').click(function(){
        	$(this).parent().fadeOut();   
        	return false; 
        }); 


        /*
        *	Shortcode tabs & Accordion (Boostrap)
        */  
        $('.tabs').tab();
        $(".accordion").collapse();

        $(".toggle_container").hide(); 
		$("div.trigger a").click(function(){
			$(this).parent().toggleClass("active").next().slideToggle();
			return false;
		});	

		/* 
		*	Quovolver blockquots in testimonials shortcode
		*	http://sandbox.sebnitu.com/jquery/quovolver/
		*/
		if(jQuery().quovolver) {
			$('.quovolver').quovolver({
			    children : 'li',
			    transitionSpeed : 350,
			    autoPlaySpeed: 5000,
			    autoPlay : true,
			    navPosition: 'custom',
			    equalHeight : false,
			    navPositionCustom : '.quotes-nav',
			    navPrev         : true,
			    navNext         : true,
			    navPrevText 	: "",
			    navNextText		: ""
			});
		}

		if(jQuery().jcarousel) {
			$('.jcarousel').jcarousel({
		    	wrap: 'circular',
				scroll: 1,
				animation: 750,
				itemFallbackDimension: 100
			});
		}

		/*
		*	Twitter Bootstrap Tooltip
		*/
		$("a[data-rel^='tooltip']").tooltip();

		/*
		*	New isotope for Gallery
		*/
		if(jQuery().isotope) {
			var isoWrap = $('.isotope-filter-wrap');		

			isoWrap.isotope({
	            itemSelector : '.isotope-item',
	            layoutMode : 'fitRows'
	        });     

	        $('.global-filter a').click(function() {
	        	$('.button-active').removeClass('button-active');
	        	$(this).addClass('button-active');
	         	
	         	var selector = $(this).attr('data-filter');
	        	isoWrap.isotope({ filter: selector });
	        	return false;
	        });
	    }
        
		/*
		*	Tabbed page load content
		*/
		var tabbedButton = $('.tabbed-navigation').find('a');
		var getPage = tabbedButton.data('page');
		var tabbedContent = $('.tabbed-content');
		var documentHash = document.location.hash.substr(1);

		if ( documentHash != "" ) {
			tabbedContent.load('../pages/tabbed-pages/' + documentHash + ' .content');
		}
		else {
			tabbedContent.load('../pages/' + getPage + ' .content');
		}		

		tabbedButton.on('click', function(e) {	
			$('.button-tabbed-active').removeClass('button-tabbed-active');
        	$(this).addClass('button-tabbed-active');	

			var getPage = $(this).data('page');

			tabbedContent.find('.content').fadeOut(250);
			tabbedContent.find('div.tabbed-loader').remove();
			tabbedContent.append('<div class="tabbed-loader"></div>');	

			window.setTimeout(function() { loadNewContent(getPage); }, 350);
			e.preventDefault();
		});

		function loadNewContent(getPage) {	
			tabbedContent.fadeOut(250, function() {				
				tabbedContent.fadeIn(500);
				tabbedContent.load('../pages/' + getPage + ' .content', function() {
					tabbedContent.fadeIn(500);
					tabbedContent.find('div.tabbed-loader').remove();
				});
			});			
		}


	})( jQuery, window, document );
 });