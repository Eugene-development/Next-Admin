import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useQuery } from '@apollo/client'
import { ALL_HEADS } from '@/apollo/query/head'
import Link from 'next/link'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export const MainHead = () => {
    const { loading, error, data } = useQuery(ALL_HEADS)

    if (loading) {
        return <h2>Loading...</h2>
    }

    if (error) {
        return <h2>Error...</h2>
    }

    if (data) {
        const { project } = data || {}
        // console.log(project)

      return (
            <AppLayout
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Заголовки
                    </h2>
                }>
                <Head>
                    <title>Заголовки</title>
                </Head>

                <p>123</p>

            </AppLayout>

      )

    }

}

export default MainHead;
