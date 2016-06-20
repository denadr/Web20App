//React Elemente
var SongList = React.createClass({
  render: function() {
	var rows = [], i = 0, len = 10;
	while (++i <= len) rows.push(i);
	  
    return (
      <div class="songList">
      {rows.map(function (i) {
	        return (<WidgetBox songid={i} />);
	  })}
      </div>
    );
  }
});

var AddButton = React.createClass({

	render: function() {	
		return ( 
			<a href="#" class="addButton">AddButton</a>
		);
	}
});

var DeleteButton = React.createClass({
	
	render: function() {
		return ( 
			<a href="#" class="DeleteButton">DeleteButton</a>
		);
	}
});

var Button = React.createClass({
	getInitialState: function() {
		return {
			saved: false
		};
	},
	
	handleClick: function(evt) {		
		this.setState({
			saved: !this.state.saved
		});
		
		if(this.state.saved) {
			console.log("geloescht") // Funktion um Song aus Liste zu loeschen
		} else {
			console.log("hinzugefuegt") // Funktion um Song in Liste zu speichern
		}
				
	},
	
	
	render: function() {
		var button = this.state.saved ? <DeleteButton /> : <AddButton />;
		return (
				<div class="button" onClick={this.handleClick}>{this.props.songid}, {button}</div>
		);
	}
})

var WidgetBox = React.createClass({
	
	render: function() {
			
		return ( 
			<div class="widgetBoxWithAddButton">
			<iframe frameborder="0" allowTransparency="true" scrolling="no" width="250" height="80" src={this.props.uri}></iframe>
			Widget fuer Song <Button songid={this.props.songid}/>
			</div>
		);
	}
});

ReactDOM.render(
	<SongList />,
    document.getElementById('example')
);
