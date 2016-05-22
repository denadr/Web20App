/**
 * 
 */
DZ.init({
   appId  : '180042',
   channelUrl : 'http://localhost:8080/DynamicTest/deezer.html',
//	appId  : '152851',
//	channelUrl : 'http://external.codecademy.com/channel.html'
});

var Liste = new Array();
DZ.api('/search?q=Seeed', function(json){
//	alert(json.data.id);
	var len=pruefen(json.data.length);
	for (var i=0; i<len ; i++)
	{
//		alert(json.data[i].title);
		Liste[i]= new Object();
		Liste[i] ["anbieter"]="deezer";
		Liste[i] ["titelID"]=json.data[i].id;
	}
	for(var i=0; i < Liste.length; i++)
	{
		$("body").append('<iframe scrolling="no" frameborder="0" allowTransparency="true" src="http://www.deezer.com/plugins/player?autoplay=false&playlist=false&width=700&height=80&cover=true&type=tracks&id='+Liste[i] ["titelID"]+'&title=&app_id=undefined" width="1110" height="80"></iframe>');	
	}
});


function pruefen(len){
	
	var maxAnzahl=7;  //Einfach diesen Wert ändern, wenn die Anzahl der Datensätze, die ausgegeben werden, verändert werden soll
	if(len > maxAnzahl)
	{
		return maxAnzahl;
	} else return len;
}