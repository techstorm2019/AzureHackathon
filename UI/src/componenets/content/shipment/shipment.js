import React, {Component} from 'react';
import ReactTable from "react-table";
import ShipmentColumns from "./shiipment-columns";
import FetchHeader from "../../../constants/Fetch-header";
import RestCheck from "../../../constants/REST-check";
import API from "../../../constants/API-config";

class Shipment extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
                                type="checkbox"
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
        fetch(API.GET_ORDERS, {
            headers: FetchHeader,
            credentials: 'same-origin'
        }).then((response) => {
            return RestCheck(response);
        }).then((responseJSON) => {
            if(typeof responseJSON.carrier === "undefined") {
                throw Error("Invalid response");
            }else {
                this.setState({
                    shipmentData: responseJSON
                });
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    selectRow = (event, original) => {
        if (event.target.checked) {
            this.setState({
                selectedRows: [...this.state.selectedRows, original]
            }, () => {
                //this.updateSelectAll();
            });
        }
        else {
            const toDelete = new Set([original]);
            let newArr = this.state.selectedRows.filter(obj => !toDelete.has(obj));
            this.setState({
                selectedRows: newArr
            }, () => {
                //this.updateSelectAll();
            });
        }

        let parent = event.target.parentNode.parentNode.parentNode;
        if (event.target.checked) {
            parent.classList.add("-selected");
        }
        else {
            parent.classList.remove("-selected");
        }
    };

    render() {
        return (
            <div>
                <div className="header-group profile-template">
                    <ul className="page-title-group">
                        <li className="no-margin"/>
                        <li>
                            <h1>Customer Name</h1>
                        </li>
                    </ul>
                </div>
                <br/>
                <section className="page-container">
                    <div className={"grid-wrapper"}>
                        <div className={"data-table-container"}>
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