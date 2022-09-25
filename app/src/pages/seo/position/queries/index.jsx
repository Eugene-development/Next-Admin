import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useQuery } from '@apollo/client'
import { QUERIES } from '@/apollo/query/seo'
import Link from 'next/link'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

// export const getStaticProps = async () => {
//     const { data } = useQuery(QUERIES)
//     console.log(data)
//     const { seoquery } = data
//     return {
//         props: { data },
//     }
// }

export const Queries = () => {
    const { loading, error, data } = useQuery(QUERIES)
    if (loading) {
        return <h2>Loading...</h2>
    }

    if (error) {
        return <h2>Error...</h2>
    }

    if (data) {
        const { project } = data || {}
        // console.log(seoquery)

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

                <div className="mt-4 p-4 sm:p-6 lg:p-8">
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <h1 className="text-xl font-semibold text-gray-900">
                                SEO
                            </h1>
                            <p className="mt-2 text-sm text-gray-700">
                                Сайт {project[0].value}
                            </p>
                        </div>

                        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
                                Добавить запрос
                            </button>
                        </div>
                    </div>

                    <div className="mt-12 flex flex-col">
                        <div className=" -mx-4 sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle">
                                <div className="shadow-sm ring-1 ring-black ring-opacity-5">
                                    <table
                                        className="min-w-full border-separate"
                                        style={{ borderSpacing: 0 }}>
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-bold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8">
                                                    №
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-bold text-gray-900 backdrop-blur backdrop-filter sm:table-cell">
                                                    Запрос
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-bold text-gray-900 backdrop-blur backdrop-filter lg:table-cell">
                                                    Yandex
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-bold text-gray-900 backdrop-blur backdrop-filter lg:table-cell">
                                                    Google
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-bold text-gray-900 backdrop-blur backdrop-filter">
                                                    Частотность
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pr-4 pl-3 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8">
                                                    <span className="sr-only">
                                                        Подробно
                                                    </span>
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody className="bg-white">
                                            {project[0].seoquery?.map(
                                                (query, i) => (
                                                    <tr key={i}>
                                                        <td
                                                            className={classNames(
                                                                i !==
                                                                    query.length -
                                                                        1
                                                                    ? 'border-b border-gray-200'
                                                                    : '',
                                                                'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8',
                                                            )}>
                                                            {i+1}
                                                        </td>




                                                            <td key={i}
                                                                className={classNames(
                                                                    i !== query.length - 1
                                                                        ? 'border-b border-gray-200'
                                                                        : '',
                                                                    'whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden lg:table-cell',
                                                                )}>
                                                                    {query?.value}
                                                            </td>



                                                        {/* TODO: для гугла через цикл td с условием если яндекс или гугл */}

                                                        {query.resource.map(
                                                            (item, j) => (

                                                        <td key={j}
                                                            className={classNames(
                                                                i !==
                                                                    query.length -
                                                                        1
                                                                    ? 'border-b border-gray-200'
                                                                    : '',
                                                                'whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden sm:table-cell',
                                                            )}>

                                                                {item.position.at(-1).value == 0 ? "-" : item.position.at(-1).value }
                                                               {/* ({item.position.at(0).value == 0 || 'undefined' ?  "-" : item.position.at(0).value }) */}
                                                        </td>


                                                            )
                                                        )}





                                                        {/* <td
                                                            className={classNames(
                                                                i !==
                                                                    query.length -
                                                                        1
                                                                    ? 'border-b border-gray-200'
                                                                    : '',
                                                                'whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden sm:table-cell',
                                                            )}>
                                                                {query?.resource[0].position.at(-1).value}
                                                        </td> */}






                                                        <td
                                                            className={classNames(
                                                                i !==
                                                                    query.length -
                                                                        1
                                                                    ? 'border-b border-gray-200'
                                                                    : '',
                                                                'whitespace-nowrap px-3 py-4 text-sm text-gray-500',
                                                            )}> -
                                                        </td>

                                                        <td
                                                            className={classNames(
                                                                i !==
                                                                    query.length -
                                                                        1
                                                                    ? 'border-b border-gray-200'
                                                                    : '',
                                                                'relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-6 lg:pr-8',
                                                            )}>
                                                            <Link
                                                                href={`/seo/position/query/${query.id}`}
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
                                                ),
                                            )}
                                        </tbody>
                                        {/* <tbody className="bg-white">
                                            {data.seoquery.map(
                                                (query, i) => (
                                                    <tr key={i}>
                                                        <td
                                                            className={classNames(
                                                                i !==
                                                                    queries.length -
                                                                        1
                                                                    ? 'border-b border-gray-200'
                                                                    : '',
                                                                'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8',
                                                            )}>
                                                            {i+1}
                                                        </td>
                                                        <td
                                                            className={classNames(
                                                                i !==
                                                                    queries.length -
                                                                        1
                                                                    ? 'border-b border-gray-200'
                                                                    : '',
                                                                'whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden sm:table-cell',
                                                            )}>
                                                            {query.value}
                                                        </td>


                                                        {query.resource.map((item, i) => (
                                                        <td
                                                        key={i}
                                                            className={classNames( i !== queries.length - 1
                                                                    ? 'border-b border-gray-200'
                                                                    : '',
                                                                'whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden lg:table-cell',
                                                            )}>
                                                                {item.position[item.position.length - 1].value}
                                                        </td>
                                                        ))}

                                                        <td
                                                            className={classNames(
                                                                i !==
                                                                    queries.length -
                                                                        1
                                                                    ? 'border-b border-gray-200'
                                                                    : '',
                                                                'whitespace-nowrap px-3 py-4 text-sm text-gray-500',
                                                            )}>
                                                        </td>
                                                        <td
                                                            className={classNames(
                                                                i !==
                                                                    queries.length -
                                                                        1
                                                                    ? 'border-b border-gray-200'
                                                                    : '',
                                                                'relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-6 lg:pr-8',
                                                            )}>
                                                            <Link
                                                                href={`/seo/position/query/${query.id}`}
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
                                                ),
                                            )}
                                        </tbody> */}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AppLayout>
        )
    }
}

export default Queries;
