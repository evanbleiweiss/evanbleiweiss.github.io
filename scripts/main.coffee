R = React.DOM

Location = React.createClass(
  getInitialState: ->
    data: []

  loadRemoteData: ->
    $.ajax
      url: @props.url
      dataType: "json"
      success: ((data) ->
        console.log('Successfully fetched ' + @props.url)
        @setState
          data:  data
          city:  data.query.results.place[0].locality1.content
          state: data.query.results.place[0].admin1.content
        return
      ).bind(this)
      error: ((xhr, status, err) ->
        console.error @props.url, status, err.toString()
        return
      ).bind(this)
    return

  componentDidMount: ->
    @loadRemoteData()
    return

  render: ->
    R.div null,
      'Coming to you from '
      R.span {id:"myLocation", className:"animated bounceIn"}, @state.city + ', '
      R.span id:"myLocation2", className:"animated slideInRight", @state.state
)

React.renderComponent Location({url: 'http://query.yahooapis.com/v1/public/yql?q=select * from geo.places where text=78756&format=json'}), document.getElementById('location')

