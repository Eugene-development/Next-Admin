import React from 'react'
import 'chart.js/auto'
import { Line } from 'react-chartjs-2'
import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40],
        },
    ],
}

export default () => (
    <AppLayout
        header={
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                Запрос
            </h2>
        }>
        <Head>
            <title>Запрос</title>
        </Head>

        <div className="">
            <h2>Line Example</h2>
            <Line data={data} width={400} height={150} />
        </div>
    </AppLayout>
)
