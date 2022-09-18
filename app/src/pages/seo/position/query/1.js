import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useQuery } from '@apollo/client'
import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'
import Link from 'next/link'

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

        const position = [5, 8, 3, 77, 24, 12, 15]

        const labels = [
            'Сегодня',
            'Вчера',
            'Неделю назад',
            'Месяц назад',
            'Три месяца назад',
            'Шесть месяцев назад',
            'Год назад',
        ]
        const data = {
            labels: labels,
            datasets: [
                {
                    backgroundColor: gradient,
                    label: 'орбита-строй.рф',
                    data: position,
                    fill: true,
                    borderWidth: 3,
                    borderColor: colors.purple.default,
                    lineTension: 0.2,
                    pointBackgroundColor: colors.purple.default,
                    pointRadius: 3,
                    padding: 800,
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

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    return (
        <div className="m-8">
            {/* TODO разъединить */}
            <div className="mx-auto flex items-center justify-between px-8">
                <span>Запрос</span>
                <Link href="/seo/position/queries">
                    <a className="text-red-800">Закрыть</a>
                </Link>
            </div>

            <canvas id="myChart" ref={canvasEl} height="100" />
        </div>
    )
}
