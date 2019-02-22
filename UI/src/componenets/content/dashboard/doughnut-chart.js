import React, {Component} from 'react';
import {Doughnut, Chart} from 'react-chartjs-2';

/* Add extension for doughnut chart center text */
Chart.pluginService.register({
    beforeDraw: function (chart) {
        if (chart.config.options.elements.center) {
            //Get ctx from string
            let ctx = chart.chart.ctx;

            //Get options from the center object in options
            let centerConfig = chart.config.options.elements.center;
            let fontStyle = centerConfig.fontStyle || 'Arial';
            let txt = centerConfig.text;
            let color = centerConfig.color || '#000';
            let sidePadding = centerConfig.sidePadding || 20;
            let sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2);
            //Start with a base font of 30px
            ctx.font = "30px " + fontStyle;

            //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
            let stringWidth = ctx.measureText(txt).width;
            let elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

            // Find out how much the font can grow in width.
            let widthRatio = elementWidth / stringWidth;
            let newFontSize = Math.floor(30 * widthRatio);
            let elementHeight = (chart.innerRadius * 2);

            // Pick a new font size so it will not be larger than the height of label.
            let fontSizeToUse = Math.min(newFontSize, elementHeight);

            //Set font settings to draw it correctly.
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            let centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
            let centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2) + 4;
            ctx.font = fontSizeToUse + "px " + fontStyle;
            ctx.fillStyle = color;

            //Draw text in center
            ctx.fillText(txt, centerX, centerY);
        }
    }
});

const doughnutData = {
    labels: ['Progress', 'Pending'],
    datasets: [{
        data: [75, 25],
        backgroundColor: [
            '#64B2D4',
            '#C3C3C3'
        ],
        hoverBackgroundColor: [
            '#64B2D4',
            '#C3C3C3'
        ]
    }]
};

class DoughNut extends Component{
    render(){
        return(
            <Doughnut data={doughnutData}
                      width={512}
                      height={256}
                      options={{
                          maintainAspectRatio: false,
                          elements: {
                              center: {
                                  text: '75%',
                                  color: '#282828', // Default is #000000
                                  fontStyle: 'Arial', // Default is Arial
                                  sidePadding: 20 // Defualt is 20 (as a percentage)
                              }
                          },
                          legend: {
                              labels: {
                                  fontColor: '#282828'
                              },
                              position: 'bottom'
                          }
                      }}
            />
        );
    }
}

export default DoughNut;