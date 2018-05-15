import React from 'react'
import ReactDOM from 'react-dom'
import icon from './img/party.jpg'
import dcss from './style/index.scss'
import Home from './containers/index'

class App extends React.Component {
    render() {
        return (
                <Home/>
            )
    }
}
ReactDOM.render(<App />, document.getElementById('app'));