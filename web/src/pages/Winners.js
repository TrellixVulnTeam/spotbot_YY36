import React, { Component } from 'react'
import WinnersList from '../components/WinnersList'

export default class Winners extends Component {
    state = {
        Winners: [],
    }

    getWinners = () => {
        fetch('http://localhost:3000/bot/winners')
            .then(response => response.json())
            .then(data => this.setState({ Winners: data }))
    }

    componentDidMount() { 
        this.getWinners()
    }

    render() {
        return (
            <div>
                <WinnersList Winners={this.state.Winners} getWinners={this.getWinners} />
            </div>
        )
    }
}
