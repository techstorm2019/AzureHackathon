import React, {Component} from 'react';

class NotificationDropDown extends Component {

    readNotification = () => {
        this.props.hubConnection
            .invoke('ShipmentNotification', 'John', 'notification read')
            .catch(err => console.error(err));
    };

    render() {
        const notifications = this.props.notificationItems.length > 0 ? this.props.notificationItems : [];

        return (
            <div className="app-switcher">
                <div className="apps-container">
                    <div className="apps-wrapper">
                        <div>
                            {
                                notifications.map((notification) => {
                                    return (
                                        <div className="app-switcher-item" onClick={this.readNotification}>
                                            <div className="app-switcher-item-icon-container">
                                                <div className="image-cropper">
                                                    <img alt=""
                                                         src="https://cdn.damco.com/cortex/v1/images/sample/1.png"
                                                         className="app-switcher-item-icon"/>
                                                </div>
                                            </div>
                                            <div className="app-switcher-item-text-container">
                                                <span
                                                    className="regular-link-text app-switcher-item-text">Order #102030</span>
                                                <br/>
                                                <span className="small-body-text">{notification}</span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NotificationDropDown;