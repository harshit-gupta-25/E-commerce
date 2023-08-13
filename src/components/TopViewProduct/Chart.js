import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './Chart.css';

const Chart = (props) => {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                align: 'center',
                labels: {
                    font:{
                        size: 15,
                        weight: 'bold'
                    }
                }
            }
        }
    }

    const data = {
        labels: props.data.map(product => `product${product.id}`),
        datasets: [
            {
                label: 'Views',
                data: props.data.map(product => product.views),
                backgroundColor: 'rgba(75,192,192,1)',
                maxBarThickness: 40,
                
            }
        ]
    }


    return (
        <div className="chart">
            <Bar options={options} data={data} />
        </div>
    )
}

export default Chart;