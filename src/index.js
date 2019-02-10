
import { benchmarkWorker } from './js/webworker/worker';

import Chart from 'chart.js';

const colors = {
    red:         'hsl(347, 100%, 69%)',
    red_light:   'hsl(347, 100%, 90%)',
    orange:  'rgb(255, 159, 64)',
    yellow:  'rgb(255, 205, 86)',
    green:   'rgb(75, 192, 192)',
    blue:    'hsl(204, 82%, 57%)',
    blue_light:    'hsl(204, 82%, 90%)',
    purple:  'rgb(153, 102, 255)',
    grey:    'rgb(201, 203, 207)'
};

var ctx = document.getElementById('myChart');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                label: 'JS Benchmark',
                data: [],
                fill: false,
                backgroundColor: colors.red_light,
                borderColor: colors.red,
            },
            {
                label: 'RS Benchmark',
                data: [],
                fill: false,
                backgroundColor: colors.blue_light,
                borderColor: colors.blue,
            }
        ]
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'get_primes(100000)'
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true,
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Index'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'ms'
                }
            }]
        }
    }
});

const chart_addData = (chart, label, value) => {
    chart.data.datasets.forEach((dataset) => {
        if (dataset.label === label) {
            dataset.data.push(value);
        }
    });

    const dataLength = chart.data.datasets.reduce((p, c) => {
        return p < c.data.length ? c.data.length : p
    }, 0);

    if (dataLength > chart.data.labels.length) {
        chart.data.labels.push(chart.data.labels.length +1);
    }

    chart.update();
}

window.chart = myChart;

const times = 3;
benchmarkWorker({
    method: 'get_primes',
    args: [100000]
},
    times,
    value => {
        chart_addData(myChart, `${value.data.worker.toUpperCase()} Benchmark`, value.executionTime);
        console.log(`cycle ${value.data.worker}`, value)
    }
).then(value => {
    console.log(`done`, value);
});


document.getElementById('addData').addEventListener('click', () => {
    benchmarkWorker({
        method: 'get_primes',
        args: [100000]
    },
        1,
        value => {
            chart_addData(myChart, `${value.data.worker.toUpperCase()} Benchmark`, value.executionTime);
            console.log(`cycle ${value.data.worker}`, value)
        }
    ).then(value => {
        console.log(`done`, value);
    });
});
