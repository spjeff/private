		$(function() {

			$("#pager").paginate({
				count 		: 10,
				start 		: 1,
				display     : 7,
				border					: true,
				border_color			: '#fff',
				text_color  			: '#797979',
				background_color    	: 'transparent',	
				border_hover_color		: '#ddd',
				text_hover_color  		: '#000',
				background_hover_color	: '#fff', 
				images					: false,
				mouse					: 'press',
				onChange     			: function(page){
											$('._current','#gallery').removeClass('_current').hide();
											$('#p'+page).addClass('_current').show();
										  }
			});
		});