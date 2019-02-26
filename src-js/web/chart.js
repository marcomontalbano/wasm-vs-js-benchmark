
import { runBenchmark } from './utility';

import Chart from 'chart.js';

const _createChart = (canvas, name) => {
    return new Chart(canvas, {
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
                text: name
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
}

const _chart_addData = (chart, label, value) => {
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

const _runBenchmark = (payload, chart, times = 5) => {
    return runBenchmark(payload, times,
        value => {
            _chart_addData(chart, `${value.workerName.toUpperCase()} Benchmark`, value.performance.measure.duration.toFixed(2));
            console.log(value);
            return value;
        }
    ).then(value => {
        console.log(value);
    });
}

export const createBenchmarkChart = payload => {

    let element_chartContainer = document.createElement('a');
    element_chartContainer.id = `method--${payload.method}`;
    element_chartContainer.classList.add('chart-container');

    let element_chartCanvas = document.createElement('canvas');
    let chart = _createChart(element_chartCanvas, `${payload.method}(${payload.args.join(', ')})`);

    element_chartContainer.appendChild(element_chartCanvas);
    document.getElementById('root').appendChild(element_chartContainer);

    return () => {
        return _runBenchmark(payload, chart);
    };
}
