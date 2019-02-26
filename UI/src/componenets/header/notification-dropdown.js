import React, {Component} from 'react';

class NotificationDropDown extends Component {

    readNotification = (notification) => {
        this.props.hubConnection
            .invoke('ReadNotification', sessionStorage.getItem('currentUser'), notification.id)
            .catch(err => console.error(err));
        alert("Notification successfully read");
    };

    render() {
        const notifications = this.props.notificationItems.length > 0 ? this.props.notificationItems : [];
        console.log("Inside dropdown component",notifications);

        return (
            <div className="app-switcher">
                <div className="apps-container">
                    <div className="apps-wrapper">
                        <div>
                            {
                                notifications.map((notification) => {
                                    return (
                                        <div className="app-switcher-item" onClick={() => this.readNotification(notification)}>
                                            <div className="app-switcher-item-icon-container">
                                                <div className="image-cropper">
                                                    <img alt=""
                                                         src="https://cdn.damco.com/cortex/v1/images/sample/1.png"
                                                         className="app-switcher-item-icon"/>
                                                </div>
                                            </div>
                                            <div className="app-switcher-item-text-container">
                                                <span
                                                    className="regular-link-text app-switcher-item-text">Order #{notification.orderNo}</span>
                                                <br/>
                                                <span className="small-body-text">{notification.message}</span>
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