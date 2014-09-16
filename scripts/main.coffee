R = React.DOM


track = React.createClass
    render: ->
        R.div {}, ['Hello ' + @props.name]

React.renderComponent (track {name: 'Example Track', artist: 'Music Hombre', album: 'This is Ziggles', year: 2014}), document.getElementById("content")
