// API from https://forismatic.com/en/api/
// Eg: https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en
console.log($(quote).text());
$(document).ready(function($) {

	var quote;
	var author;

	function getNewQuote(){
		$.ajax({
			url: 'https://api.forismatic.com/api/1.0/',
			jsonp: 'jsonp',
			dataType: 'jsonp',
			data: {
				// From documentation getQuote Method:
				method: 'getQuote',
				lang: 'en',
				format: 'jsonp'
			},
			success: function(response){
				// All the object of the response would be:
				// console.log(response);
				// The property of the object from the respond is "quoteText"
				// console.log(response.quoteText);
				quote = response.quoteText;
				author = response.quoteAuthor;
				$('#quote').text('" '+quote+'"');
				if (author){
					$('#author').text(author);
				} else{
					$('#author').text('Unknown');
				}
			}
		});
	}
	function randomColor() {
	  return Math.floor(Math.random() * 250);
	}

	$('.get-quote').click(function(event) {
		// event prevent Default for avoiding annoying behave.
		event.preventDefault();
		getNewQuote();
		color = 'rgba('+randomColor()+','+randomColor()+','+randomColor()+', 0.1)';
		$('.quote-box').css({
			background:  color,
		});
	});

	$('.share-quote').click(function(event) {
		event.preventDefault();
		// Easy way to share:
		if(!quote || !author){
			quote = "Step by Step";
			author = "Manuel Valles";
		}
		window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent('" ' + quote + '"' + '\n' + author));
	});
});