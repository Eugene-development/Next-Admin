import { key_project } from '@/apollo/stores/auth'
import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useAuth } from '@/hooks/auth'
import Greetings from '@/components/dashboard/greetings'


const Dashboard = () => {
    const { user } = useAuth({ middleware: 'auth' })
    key_project(user?.key)

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Дашборд
                </h2>
            }>
            <Head>
                <title>Dashboard</title>
            </Head>

            <Greetings name={user?.name} />

        </AppLayout>
    )
}

export default Dashboard
