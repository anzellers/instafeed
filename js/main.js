// var instafeed = [
// 	{'src':'test1.jpg', 'data-caption':'Dinosaurs', 'data-likes':'191'},
// 	{'src':'test2.jpg', 'data-caption':'Stars', 'data-likes':'19'},
// 	{'src':'test3.jpg', 'data-caption':'Birds', 'data-likes':'473'},
// 	{'src':'test4.jpg', 'data-caption':'Heart', 'data-likes':'5454'},
// 	{'src':'test5.jpg', 'data-caption':'Rain', 'data-likes':'31'},
// 	{'src':'test6.jpg', 'data-caption':'Lined Paper', 'data-likes':'332'},
// 	{'src':'test7.jpg', 'data-caption':'Paper Plane', 'data-likes':'14'},
// 	{'src':'test8.jpg', 'data-caption':'Triangles', 'data-likes':'2'},
// 	{'src':'test9.jpg', 'data-caption':'More Triangles', 'data-likes':'34'},
// ]


// $.each (instafeed, function (i, photo) {

// 	$('<img>')
// 	.attr('src', 'img/' + photo.src)
// 	.attr('data-caption'. 'img/' + photo.data-caption)
// 	.appendTo('.feed');


// });

var squares = function() {

	var w = $('.instaimg').width();
	$('.instaimg').height(w);



	$('.instaimg img').each(function () {

		var imgw = $(this).width();
		var imgh = $(this).height();


		if ( imgh > imgw ) {
			$(this).addClass('portrait');
			var r = $(this).width() / imgw;
			var crop = (imgh * r - w) / 2; 
			$(this).css('bottom', crop + 'px');
		}
		else {
			$(this).addClass('landscape');
			var r = $(this).height() / imgh;
			var crop = (imgw * r - w) / 2;
			$(this).css('right', crop + 'px' );
		};

	});

};

squares();
// $(window).load(squares);

// $('.instaimg').hover(function() {

// 	if ( $(this).has('.caption').length > 0) {
// 		$(this).find('.caption').show();
// 	}
// 	else {
// 		$('<div>').addClass('caption')
// 		.text(  $(this).find('img').attr('data-caption') )
// 		.prependTo( this )
// 		.show();
// 	};

// 	$(this).find('img').addClass('zoom');
	
// }, 

// function() {

// 	$(this).find('img').removeClass('zoom');
// 	$(this).find('.caption').hide();

// });



//////////////////GET INTSTAGRAM FEED - DOES NOT WORK YET//////////////////
$.getJSON('user-media-recent.php?callback=?', { q: "183122502" }, function(data) {
	
	console.log(data);

	// $.each(data, function(i, pic) {
	// 	$('<img>').attr('src',pic.images.standard_resolution.url).appendTo('body');
	// });

})
/////////////////////////////////////////////////////////////////////////////////



var searchphotos = function(term) {

	$('.gallery').empty();

	var flickr = 'http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?';

	var params = {tags: term, tagmode: "any", format: "json"};

	$.getJSON(flickr, params, function(result) {

		$.each(result.items, function(index, photo) {
				// index = node/photo number, starting at 0, increasing by 1 EACH time
				// photo = is the photo {object} itself
				$('<img>')
					.attr('src', photo.media.m)
					.attr('alt', photo.title)
					.appendTo('.gallery')
					.wrap("<figure class='instaimg'></figure>");

		});

		squares();

		$('.instaimg').hover(function() {

				if ( $(this).has('.caption').length > 0) {
					$(this).find('.caption').show();
				}
				else {
					$('<div>').addClass('caption')
					.text(  $(this).find('img').attr('alt') )
					.prependTo( this )
					.show();
				};

				$(this).find('img').addClass('zoom');
			
			}, function() {

					$(this).find('img').removeClass('zoom');
					$(this).find('.caption').hide();

				});

	});


};

$('.load').on('click', function() {

	// Store the term
	var term = $('.term').val();

	// Run a search
	searchphotos(term);

});



