import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useQuery } from '@apollo/client'
import Link from 'next/link'

const queries = [
    {
        id: 1,
        value: 'купить что-то',
        position: 8,
    },
    {
        id: 1,
        value: 'купить что-то',
        position: 8,
    },
    {
        id: 1,
        value: 'купить что-то',
        position: 8,
    },
    {
        id: 1,
        value: 'купить что-то',
        position: 8,
    },
    {
        id: 1,
        value: 'купить что-то',
        position: 8,
    },
    {
        id: 1,
        value: 'купить что-то',
        position: 8,
    },
    // More queries...
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Example() {
    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Запросы
                </h2>
            }>
            <Head>
                <title>Запросы</title>
            </Head>
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-xl font-semibold text-gray-900">
                            Users
                        </h1>
                        <p className="mt-2 text-sm text-gray-700">
                            A list of all the users in your account including
                            their name, title, email and role.
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
                            Add user
                        </button>
                    </div>
                </div>
                <div className="mt-8 flex flex-col">
                    <div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle">
                            <div className="shadow-sm ring-1 ring-black ring-opacity-5">
                                <table
                                    className="min-w-full border-separate"
                                    style={{ borderSpacing: 0 }}>
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8">
                                                №
                                            </th>
                                            <th
                                                scope="col"
                                                className="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell">
                                                Запрос
                                            </th>
                                            <th
                                                scope="col"
                                                className="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell">
                                                Позиция
                                            </th>
                                            <th
                                                scope="col"
                                                className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter">
                                                ?
                                            </th>
                                            <th
                                                scope="col"
                                                className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pr-4 pl-3 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8">
                                                <span className="sr-only">
                                                    Edit
                                                </span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        {queries.map((query, personIdx) => (
                                            <tr key={query.email}>
                                                <td
                                                    className={classNames(
                                                        personIdx !==
                                                            queries.length - 1
                                                            ? 'border-b border-gray-200'
                                                            : '',
                                                        'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8',
                                                    )}>
                                                    {query.id}
                                                </td>
                                                <td
                                                    className={classNames(
                                                        personIdx !==
                                                            queries.length - 1
                                                            ? 'border-b border-gray-200'
                                                            : '',
                                                        'whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden sm:table-cell',
                                                    )}>
                                                    {query.value}
                                                </td>
                                                <td
                                                    className={classNames(
                                                        personIdx !==
                                                            queries.length - 1
                                                            ? 'border-b border-gray-200'
                                                            : '',
                                                        'whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden lg:table-cell',
                                                    )}>
                                                    {query.position}
                                                </td>
                                                <td
                                                    className={classNames(
                                                        personIdx !==
                                                            queries.length - 1
                                                            ? 'border-b border-gray-200'
                                                            : '',
                                                        'whitespace-nowrap px-3 py-4 text-sm text-gray-500',
                                                    )}>
                                                    {query.role}
                                                </td>
                                                <td
                                                    className={classNames(
                                                        personIdx !==
                                                            queries.length - 1
                                                            ? 'border-b border-gray-200'
                                                            : '',
                                                        'relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-6 lg:pr-8',
                                                    )}>
                                                    <Link
                                                        href="/seo/position/query/1"
                                                        // disabled={
                                                        //     plan.isCurrent
                                                        // }
                                                    >
                                                        <a className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30">
                                                            Подробно
                                                        </a>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
