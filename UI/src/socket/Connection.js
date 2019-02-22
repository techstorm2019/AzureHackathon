import React, {Component} from 'react';
import * as signalR from '@aspnet/signalr';
import ServerEndpoint from "../constants/Server-endpoint";

class Connection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: '',
            message: '',
            messages: [],
            hubConnection: null,
        };
    }

    componentDidMount = () => {
        const currentUser = window.prompt('Your email:', 'user@email.com');
        this.setState({
            currentUser
        }, () => {
            sessionStorage.setItem('currentUser', this.state.currentUser);

            let hubConnection = new signalR.HubConnectionBuilder()
                .withUrl(ServerEndpoint + '/notify')
                .configureLogging(signalR.LogLevel.Trace)
                .build();

            this.setState({
                hubConnection
            }, () => {
                this.props.setConnectionMethod(this.state.hubConnection);
                this.state.hubConnection
                    .start()
                    .then(() =>
                        console.log('Connection started!')
                    ).catch(err =>
                        console.log(err, 'Error while establishing connection :(')
                    );

                this.state.hubConnection.on('sendToAll', (user, receivedMessage) => {
                    const text = `${user}: ${receivedMessage}`;
                    const messages = this.state.messages.concat([text]);
                    this.setState({messages}, () => {
                        this.props.setNotificationMethod(this.state.messages);
                    });
                });
            });
        });
    };

    sendMessage = () => {
        this.state.hubConnection
            .invoke('ShipmentNotification', this.state.currentUser, this.state.message)
            .catch(err => console.error(err));

        this.setState({message: ''});
    };

    render() {
        return (
            <div>
                <br/>
                <input
                    type="text"
                    value={this.state.message}
                    onChange={e => this.setState({message: e.target.value})}
                />
                <button onClick={this.sendMessage}>Send</button>

                <div>
                    {
                        this.state.messages.map((message, index) => (
                            <span style={{display: 'block'}} key={index}> {message} </span>
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default Connection;