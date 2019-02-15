
import { benchmarkWorker } from './js/webworker/worker';

import Chart from 'chart.js';

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
                backgroundColor: '#ffccd7',
                borderColor: '#ff6183',
            },
            {
                label: 'RS Benchmark',
                data: [],
                fill: false,
                backgroundColor: '#d1eafa',
                borderColor: '#37a3eb',
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


const times = 5;
benchmarkWorker({
    method: 'get_primes',
    args: [100000]
},
    times,
    value => {
        chart_addData(myChart, `${value.data.worker.toUpperCase()} Benchmark`, value.performance.measure.duration);
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
            chart_addData(myChart, `${value.data.worker.toUpperCase()} Benchmark`, value.performance.measure.duration);
            console.log(`cycle ${value.data.worker}`, value)
        }
    ).then(value => {
        console.log(`done`, value);
    });
});
