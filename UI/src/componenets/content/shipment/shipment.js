import React, {Component} from 'react';
import ReactTable from "react-table";
import ShipmentColumns from "./shiipment-columns";
import FetchHeader from "../../../constants/Fetch-header";
import RestCheck from "../../../constants/REST-check";
import API from "../../../constants/API-config";
import {ModalScreen} from 'damco-components';

class Shipment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            selectedStatus: 1,
            selectedOrder: {},
            shipmentStatus: [],
            shipmentData: [],
            selectedRows: [],
            selectAll: 0,
            columns: [
                {
                    id: "checkbox",
                    accessor: "",
                    className: "-checkbox",
                    Cell: ({original}) => {
                        return (
                            <input
                                type="radio"
                                name={"rowOption"}
                                className="checkbox"
                                checked={this.state.selectedRows.includes(original) === true}
                                onChange={(event) => this.selectRow(event, original)}
                            />
                        );
                    },
                    sortable: false,
                    width: 45
                }, ...ShipmentColumns
            ]
        }
    }

    componentWillMount() {
        fetch(API.GET_SHIPMENT_STATUS_LIST, {
            headers: FetchHeader,
            credentials: 'same-origin'
        }).then((response) => {
            return RestCheck(response);
        }).then((responseJSON) => {
            this.setState({
                shipmentStatus: responseJSON
            }, () => {
                this.getOrders();
            });
        }).catch((error) => {
            console.log(error);
        });
    }

    handleChange = (event) => {
        const state = this.state;
        state[event.target.name] = event.target.value;
        this.setState(state);
    };

    getOrders = () => {
        fetch(API.GET_ORDERS + "?userID=" + sessionStorage.getItem('currentUser'), {
            headers: FetchHeader,
            credentials: 'same-origin'
        }).then((response) => {
            return RestCheck(response);
        }).then((responseJSON) => {
            this.setState({
                shipmentData: responseJSON
            });
        }).catch((error) => {
            console.log(error);
        });
    };

    selectRow = (event, original) => {
        this.setState({
            selectedRows: [original]
        });
        this.removeSelected();
        let parent = event.target.parentNode.parentNode.parentNode;
        if (event.target.checked) {
            parent.classList.add("-selected");
        } else {
            parent.classList.remove("-selected");
        }
    };

    removeSelected = () => {
        let table = document.getElementsByClassName('local-inv');
        let checkboxRows = table.length > 0 ? table[0].getElementsByClassName('rt-tr-group') : document.getElementsByClassName('rt-tr-group');

        for (let i = 0; i < checkboxRows.length; i++) {
            if (checkboxRows[i].classList.contains('-selected')) checkboxRows[i].classList.remove('-selected');
        }
    };

    hideContextRibbon = () => {
        this.setState({
            selectedRows: []
        }, () => {
            this.removeSelected()
        });
    };

    showModal = () => {
        this.setState({
            showModal: true,
        });
    };

    closeModal = () => {
        this.setState({
            showModal: false
        });
    };

    editOrder = () => {
        fetch(API.GET_ORDER + "?orderID=" + this.state.selectedRows[0].ID, {
            headers: FetchHeader,
            credentials: 'same-origin'
        }).then((response) => {
            return RestCheck(response);
        }).then((responseJSON) => {
            this.setState({
                selectedOrder: responseJSON.Order,
                selectedStatus: responseJSON.OrderShipmentStatusList.filter((status) => status.IsCurrentStatus === true)[0].ShipmentStatusID
            }, () => {
                console.log(this.state.selectedStatus);
                this.showModal();
            });
        }).catch((error) => {
            console.log(error);
        });
    };

    updateOrderStatus = () => {
        const orderID = this.state.selectedOrder.ID;
        const shipmentStatusID = this.state.selectedStatus;
        const notes = this.state.StatusNote;

        fetch(API.POST_UPDATE_ORDER_STATUS, {
            method: 'POST',
            headers: FetchHeader,
            credentials: 'same-origin',
            body: JSON.stringify({orderID, shipmentStatusID, notes})
        }).then((response) => {
            return RestCheck(response);
        }).then((responseJSON) => {
            this.getOrders();
            this.closeModal();
            this.loadNotifications();
        }).catch((error) => {
            console.log(error);
        });
    };

    loadNotifications = () => {
        this.props.hubConnection
            .invoke('LoadNotificationOnUpdateOrder', this.state.selectedOrder.ID)
            .then(() => {
                console.log('After shipment status update : LoadNotificationOnUpdateOrder called')
            })
            .catch(err => console.error(err, 'Error to call LoadNotificationOnUpdateOrder : after update status'));
    };

    render() {
        return (
            <div>
                {
                    (this.state.showModal) ?
                        <ModalScreen modalType={"s"} title={"Modal title"}
                                     closeMethod={this.closeModal}
                                     primaryMethod={this.updateOrderStatus} primaryButtonTitle={"Update"}
                                     secondaryMethod={this.closeModal} secondaryButtonTitle={"Close"}>
                            <div className={"grid-wrapper"}>
                                <div className={"col-100"}>
                                    <div className="form-group">
                                        <label>Shipment status</label>
                                        <select name={"selectedStatus"} className="form-control"
                                                value={this.state.selectedStatus} onChange={this.handleChange}>
                                            <option/>
                                            {
                                                (this.state.shipmentStatus.length > 0) ?
                                                    this.state.shipmentStatus.map(function (obj) {
                                                        return <option key={'status' + obj.ID}
                                                                       value={obj.ID}>{obj.Status}</option>
                                                    })
                                                    :
                                                    <option/>
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Shipment status</label>
                                        <textarea className="form-control" name={"StatusNote"}
                                              value={this.state.StatusNote}
                                              onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </ModalScreen>
                        :
                        ""
                }
                <div className="header-group profile-template">
                    <ul className="page-title-group">
                        <li className="no-margin"/>
                        <li>
                            <h1>{
                              (this.state.shipmentData.length > 0) ?
                                    this.state.shipmentData[0].Customer
                                  : "Customer name"
                            }</h1>
                        </li>
                    </ul>
                </div>
                <br/>
                <section className="page-container">
                    <div className={"grid-wrapper"}>
                        <div className={"data-table-container"}>
                            {
                                (this.state.selectedRows.length > 0) ?
                                    <div className={"grid-toolbar context-ribbon"}>
                                        <div className="button-group context-left" role="group"
                                             aria-label="Action buttons">
                                            <button type="button" className="button button-context"
                                                    onClick={this.editOrder}>Update status
                                            </button>
                                        </div>
                                        <div className={"context-right"}>
                                                    <span
                                                        className={"selected-count"}>{this.state.selectedRows.length} selected</span>
                                            <button type="button" className="button button-context"
                                                    onClick={this.hideContextRibbon}>Cancel
                                            </button>
                                        </div>
                                    </div>
                                    :
                                    ""
                            }
                            <ReactTable
                                data={this.state.shipmentData}
                                columns={this.state.columns}
                                minRows={1}
                                showPagination={true}
                                sortable={false}
                                className={"data-table local-inv"}
                                onExpandedChange={(newExpanded, index, event, expanded) => {
                                    /*console.log(newExpanded)*/
                                }}
                            />
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Shipment;