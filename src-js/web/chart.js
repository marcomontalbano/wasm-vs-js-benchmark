// @ts-check

import { runBenchmark } from './utility';

import { Chart } from 'chart.js/auto';

const _createChart = (canvas, name, times) => {
    return new Chart(canvas, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'JS Benchmark',
                    data: [],
                    fill: false,
                    backgroundColor: '#fdf8d2',
                    borderColor: '#f7df1e',
                    tension: 0.1,
                    animation: {
                        duration: 0
                    },
                },
                {
                    label: 'RS Benchmark',
                    data: [],
                    fill: false,
                    backgroundColor: '#e0e6fa',
                    borderColor: '#6884e8',
                    tension: 0.1,
                    animation: {
                        duration: 0
                    },
                }
            ]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: name
                },
                tooltip: {
                    mode: 'nearest',
                    intersect: false,
                },
            },
            responsive: true,
            hover: {
                mode: 'nearest',
                intersect: true,
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Index'
                    }
                },
                y: {
                    beginAtZero: true,
                    display: true,
                    suggestedMin: 0,
                    suggestedMax: 1000,
                    title: {
                        display: true,
                        text: 'ms'
                    }
                }
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

const _runBenchmark = (payload, chart, times) => {
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
    const times = 5

    let element_chartContainer = document.createElement('a');
    element_chartContainer.id = `method--${payload.method}`;
    element_chartContainer.classList.add('chart-container');

    let element_chartCanvas = document.createElement('canvas');
    let chart = _createChart(element_chartCanvas, `${payload.method}(${payload.args.join(', ')})`, times);

    element_chartContainer.appendChild(element_chartCanvas);
    const root = document.getElementById('root')
    if (root != null) {
        root.appendChild(element_chartContainer);
    }

    return () => {
        return _runBenchmark(payload, chart, times);
    };
}
