import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useAuth } from '@/hooks/auth'

const Dashboard = () => {
    const { user } = useAuth({ middleware: 'auth' })
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

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-gray-50 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 border-b border-gray-200">
                            {user?.name}, вы успешно авторизовались.
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default Dashboard
