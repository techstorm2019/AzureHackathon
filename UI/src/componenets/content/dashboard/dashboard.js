import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';
import BarChartOptions from "../../../constants/BarChart-options";
import DoughNut from "./doughnut-chart";
import BarData from "../../../constants/BarChart-data";

class Dashboard extends Component {

    componentWillMount() {

    }

    render() {
        return (
            <div>
                <div className="grid-wrapper">
                    <div className="col-30">
                        <h3 className="title-blue-underline">Delivered shipment</h3>
                        <div>
                            <DoughNut/>
                        </div>
                    </div>
                    <div className="col-70">
                        <h3 className="title-blue-underline">Shipment status</h3>
                        <div>
                            <Bar data={BarData}
                                 width={512}
                                 height={256}
                                 options={BarChartOptions}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;