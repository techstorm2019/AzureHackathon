import React, {Component} from 'react';
import ReactTable from "react-table";
import ShipmentData from "../../../constants/Shipment-data";
import ShipmentColumns from "./shiipment-columns";

class Shipment extends Component {
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
                                data={ShipmentData}
                                columns={ShipmentColumns}
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