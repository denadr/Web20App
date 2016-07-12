function init_twitter(doc, src, id)
{
	console.log('init_twitter()');
  	
	var js;
	var fjs = doc.getElementsByTagName(src)[0];
    var twitter = window.twttr || {};
  	
    if (doc.getElementById(id)) 
  	{
  		return twitter;
  	}
    
  	js = doc.createElement(src);
  	js.id = id;
  	js.src = 'https://platform.twitter.com/widgets.js';
  	
  	fjs.parentNode.insertBefore(js, fjs);
 
  	twitter._e = [];
  	twitter.ready = function (f) 
  	{
    	t._e.push(f);
  	};
  	
  	return twitter;
}

window.twttr = init_twitter(document, 'script', 'twitter-wjs');
