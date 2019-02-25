/*import "@babel/polyfill";*/
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import Header from "./componenets/header/header";
import NavItems from './constants/Nav-items';
import MobileNav from "./componenets/footer/mobile-nav";
import Dashboard from "./componenets/content/dashboard/dashboard";
import Shipment from "./componenets/content/shipment/shipment";
import Connection from "./socket/Connection";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoading: false,
            user: null,
            accessItems: [NavItems.DASHBOARD, NavItems.SHIPMENT, NavItems.ADMIN],
            setAdmin: 'User Management',
            currentLocation: true,
            hubConnection: null,
            notifications: []
        };
    }

    componentDidMount() {

    }

    setNotifications = (notifications) => {
        this.setState({
            notifications: notifications
        })
    };

    setHubConnection = (connection) => {
        this.setState({
            hubConnection: connection
        })
    };

    render() {
        return (
            <Router>
                <div>
                    <Header
                        accessItems={this.state.accessItems}
                        notificationItems={this.state.notifications}
                        hubConnection={this.state.hubConnection}
                    />
                    <main className={"full-width"}>
                        <Connection
                            setNotificationMethod={(nf) => this.setNotifications(nf)}
                            setConnectionMethod={(con) => this.setHubConnection(con)}
                        />
                        <Route exact path="/" component={Dashboard}/>
                        <Route path="/shipment" component={Shipment}/>
                    </main>
                    <MobileNav accessItems={this.state.accessItems}/>
                </div>
            </Router>
        );
    }
}

export default App;
