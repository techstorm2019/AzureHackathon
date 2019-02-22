const BarChartOptions = {
    maintainAspectRatio: false,
    legend: {
        display: false
    },
    scales: {
        xAxes: [{
            gridLines: {
                zeroLineColor: '#8C8C8C',
                color: '#C6C6C6'
            },
            ticks: {
                fontColor: '#282828'
            }
        }],
        yAxes: [{
            gridLines: {
                zeroLineColor: '#8C8C8C',
                color: '#C6C6C6'
            },
            ticks: {
                fontColor: '#282828'
            }
        }]
    }
};

export default BarChartOptions;