import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useQuery } from '@apollo/client'
import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'

const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
}

export default function App() {
    const canvasEl = useRef(null)

    const colors = {
        purple: {
            default: 'rgba(149, 76, 233, 1)',
            half: 'rgba(149, 76, 233, 0.5)',
            quarter: 'rgba(149, 76, 233, 0.25)',
            zero: 'rgba(149, 76, 233, 0)',
        },
        indigo: {
            default: 'rgba(80, 102, 120, 1)',
            quarter: 'rgba(80, 102, 120, 0.25)',
        },
    }

    useEffect(() => {
        const ctx = canvasEl.current.getContext('2d')
        // const ctx = document.getElementById("myChart");

        const gradient = ctx.createLinearGradient(0, 16, 0, 600)
        gradient.addColorStop(0, colors.purple.half)
        gradient.addColorStop(0.65, colors.purple.quarter)
        gradient.addColorStop(1, colors.purple.zero)

        const weight = [5, 8, 3, 77, 24, 12]

        const labels = [
            'Week 1',
            'Week 2',
            'Week 3',
            'Week 4',
            'Week 5',
            'Week 6',
            'Week 7',
            'Week 8',
            'Week 9',
            'Week 10',
        ]
        const data = {
            labels: labels,
            datasets: [
                {
                    backgroundColor: gradient,
                    label: 'My First Dataset',
                    data: weight,
                    fill: true,
                    borderWidth: 2,
                    borderColor: colors.purple.default,
                    lineTension: 0.2,
                    pointBackgroundColor: colors.purple.default,
                    pointRadius: 3,
                },
            ],
        }
        const config = {
            type: 'line',
            data: data,
        }
        const myLineChart = new Chart(ctx, config)

        return function cleanup() {
            myLineChart.destroy()
        }
    })

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Тест4
                </h2>
            }>
            <Head>
                <title>Тест4</title>
            </Head>
            <div>
                <h2>Bar Example (custom size)</h2>
                <Bar
                    data={data}
                    width={400}
                    height={200}
                    options={{
                        maintainAspectRatio: false,
                    }}
                />
            </div>
        </AppLayout>
    )
}
