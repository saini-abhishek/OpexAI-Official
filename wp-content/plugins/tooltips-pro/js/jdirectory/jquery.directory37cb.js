/*!
 * jQuery.Directory. The jQuery directory plugin
 *
 * Copyright (c) 2014 - 2017 Tomas Zhu
 * http://tomas.zhu.bz
 * Support: http://tomas.zhu.bz/jquery-directory-plugin.html
 * Licensed under GPLv3 licenses
 * http://www.gnu.org/licenses/gpl.html
 *
 * Launch  : June 2014
 * Version : 2.0.0
 * Released: 10 June, 2014 - 00:00
 * 
 */
(function($)
{
	$.fn.directory = function(options)
	{
		if ( options['language'] == 'sv' ) 
		{
			$.fn.directory.defaults.navigation = 
				['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 'š', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'ž', 'å', 'ä', 'ö'] 
			
		};
		if ( options['language'] == 'en' )
		{
			$.fn.directory.defaults.navigation = 
				['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']								
		}
		if ( options['language'] == 'de' )
		{
			$.fn.directory.defaults.navigation = 
				['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'ä', 'ö', 'ü', 'ß']								
		}
		if ( options['language'] == 'fr' )
		{
			$.fn.directory.defaults.navigation = 
				['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'é', 'è', 'ç', 'ë', 'ò', 'ô', 'ö', 'ù', 'à', 'â']								
		}
		if ( options['language'] == 'es' )
		{
			$.fn.directory.defaults.navigation = 
				['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'll','m', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']								
		}
		if ( options['language'] == 'fi' )
		{
			$.fn.directory.defaults.navigation = 
				['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 'š', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'ž', 'å', 'ä', 'ö']								
		}
		
		var opts = $.extend($.fn.directory.defaults, options || {});

		var tooltipsShowNav = function(tooltipsNavBar)
		{

			
			var currentThis = $(tooltipsNavBar);

			$(currentThis).find('span').each(function()
			{
				var currentString = $.trim($(this).text()).toLowerCase();
				var firstAlpha = currentString.charAt(0);

				$(this).data('alpha',firstAlpha);
			});
			
			
			var navbar = '<a class="navitem allDirectory" href="#">ALL</a>';
			$.each($.fn.directory.defaults.navigation, function(i,val)
			{
				var directorySelectors = $.fn.directory.defaults.selectors
				var ttt = $(directorySelectors);
				var countStore = 0;
				$.each(ttt,function()
				{
					var nowVal = $(this);
					var alphacount = $(nowVal).data('alpha');
					if (val == alphacount)
					{
						countStore = countStore + 1;
					}
				}
				)
				if (countStore == 0 ) 
				{
					navbar = navbar + '<a class="navitem '+val+'" data-counter='+countStore+' href="#">'+val.toUpperCase()+'</a>';	
				}
				else {
				navbar = navbar + '<a class="navitem '+val+' href="#">'+val.toUpperCase()+'<span class="tooltiplist_count">'+countStore+'</span></a>';
				}
  			});
  			navbar = '<div class="navitems">' + navbar + '</div>';
			currentThis.prepend(navbar);

			$('.navitem').css('color','#007DBD');
			$('.navitem').click(function()
			{
				$('.navitem').css('font-size','16px');
				$(this).css('font-size','25px');
				$('.navitem').css('background','#fff');
				$(this).css('background','#007DBD');
				$('.navitem').css('color','#007DBD');
				$(this).css('color','#fff');
				var currentCheck = $(this);
				var clickedAlpha = $.trim(currentCheck.text()).toLowerCase();
				var clickedAlphaFirst = clickedAlpha.charAt(0);

				$(currentThis).find('span').each(function()
				{
					var alpha = $(this).data('alpha');
					
					if (clickedAlphaFirst == alpha)
					{
						$(this).css('display','inline-block');
						$('.tooltiplist_count').css('display','inline-block');
					}
					else
					{
						$(this).css('display','none');
						$('.tooltiplist_count').css('display','inline-block');
					}

					if (clickedAlpha == 'all')
					{
						$(this).css('display','inline-block');
					}
				});
  			});			
		}		
		
		var tooltipsResults = this.each(function () 
		{
			tooltipsShowNav(this);
		});
		return tooltipsResults;
		
   };
   
   $.fn.directory.defaults = {
			navigation: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],				
			frontground: 'red',    
			background: 'yellow',    // moved color to directory.css
			methods:	'list',
			selectors:	'.tooltips_list > span'
			};
})(jQuery);