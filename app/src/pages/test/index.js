import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useLayoutEffect, useRef, useState } from 'react'
import { useAuth } from '@/hooks/auth'

import { useQuery } from '@apollo/client'
import { ALL_TEST } from '../../apollo/test.js'

const Test = () => {
    const { loading, error, data } = useQuery(ALL_TEST)
    console.log(data)

    const { user } = useAuth({ middleware: 'auth' })
    if (!user) {
        return <h2>Нет доступа!!!</h2>
    }

    if (loading) {
        return <h2>Loading...</h2>
    }

    if (error) {
        return <h2>Error...</h2>
    }

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Test
                </h2>
            }>
            <Head>
                <title>Тест</title>
            </Head>

            {true && <p>777</p>}

            <ul>
                {data.property.map((post, i) => (
                    <li key={i}>{post.value}</li>
                ))}
            </ul>
        </AppLayout>
    )
}

export default Test
