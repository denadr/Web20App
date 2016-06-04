var songSaved = true; //ist der Song schon in einer Playlist?

var SongList = React.createClass({
  render: function() {
    return (
      <div class="songList">
        <WidgetBox />
      </div>
    );
  }
});

var AddButton = React.createClass({
	render: function() {
		return ( 
			<div class="addButton">AddButton</div>
		);
	}
});

var DeleteButton = React.createClass({
	render: function() {
		return ( 
			<div class="DeleteButton">DeleteButton</div>
		);
	}
});

var WidgetBox = React.createClass({
	render: function() {
		var Button;
		if (songSaved) {
		  Button = <DeleteButton />;
		} else {
		  Button = <AddButton />;
		}
		
		return ( 
			<div class="widgetBoxWithAddButton">
			Widget will be located here
			{Button}
			</div>
		);
	}
});

var TestLoop = React.createClass({
	render: function () {
	  var rows = [], i = 0, len = 10;
	  while (++i <= len) rows.push(i);
	
	  return (
	    <tbody>
	      {rows.map(function (i) {
	        return <AddButton />;
	      })}
	    </tbody>
	  );
	}
});

ReactDOM.render(
    <SongList />,
    document.getElementById('example')
);
