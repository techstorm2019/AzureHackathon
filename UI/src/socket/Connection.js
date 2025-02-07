import React, {Component} from 'react';
import * as signalR from '@aspnet/signalr';
import API from "../constants/API-config";

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

    componentDidMount() {
        const currentUser = window.prompt('Your email:', 'sanjeebkr.paul@gmail.com');
        this.setState({
            currentUser
        }, () => {
            sessionStorage.setItem('currentUser', this.state.currentUser);

            let hubConnection = new signalR.HubConnectionBuilder()
                .withUrl(API.CONNECTION_ENDPOINT)
                .configureLogging(signalR.LogLevel.Trace)
                .build();

            this.setState({
                hubConnection
            }, () => {
                this.props.setConnectionMethod(this.state.hubConnection);
                this.state.hubConnection
                    .start()
                    .then(() => {
                        this.state.hubConnection
                            .invoke('LoadNotfications', sessionStorage.getItem('currentUser'))
                            .then(() => {
                                console.log('LoadNotfications called')
                            })
                            .catch(err => console.error(err, 'Error to call LoadNotfications'));
                        console.log('Connection started!');
                    }).catch(err =>
                        console.log(err, 'Error while establishing connection :(')
                    );

                this.state.hubConnection.on('getAllNotification', (user, receivedMessages) => {
                    this.setState({
                        messages: receivedMessages
                    }, () => {
                        this.props.setNotificationMethod(this.state.messages);
                    });
                });

                this.state.hubConnection.on('getNotifiedOnOrderUpdate', () => {
                    this.state.hubConnection
                        .invoke('LoadNotfications', sessionStorage.getItem('currentUser'))
                        .then(() => {
                            console.log('LoadNotfications called after update order')
                        })
                        .catch(err => console.error(err, 'Error to call LoadNotfications after update'));
                });
            });
        });
    }

    /*sendMessage = () => {
        this.state.hubConnection
            .invoke('ReadNotification', this.state.currentUser, /!*notification ID this.state.message*!/)
            .catch(err => console.error(err));

        this.setState({message: ''});
    };*/

    render() {
        return (
            <div>
                {/*<br/>
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
                </div>*/}
            </div>
        );
    }
}

export default Connection;