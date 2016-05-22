/**
 * 
 */
SC.initialize({
  client_id: 'c202b469a633a7a5b15c9e10b5272b78'
});


//find all sounds of seeed
SC.get('/tracks', {q: 'Seeed'}).then(function(tracks) {	
	var id = 0;
	$(tracks).each(function(index, track) {
		id++;
		//$('#results').append($('<li></li>').html(track.title));	
		
		//create div's dynamic
		$("body").append("<div id=player"+id+">test</div>");
		
		//embed player
		SC.oEmbed(track.uri, {
			auto_play: false,
			maxwidth: 1000,
			maxheight: 150,
			element: document.getElementById('player'+id)
		});
	});	
});



