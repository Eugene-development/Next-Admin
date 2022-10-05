import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useQuery } from '@apollo/client'
import { ALL_HEADS } from '@/apollo/query/head'
import { useLayoutEffect, useRef, useState } from 'react'

const people = [
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
  },
  // More people...
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function MainHead() {
    const { loading, error, data } = useQuery(ALL_HEADS)
  const checkbox = useRef()
  const [checked, setChecked] = useState(false)
  const [indeterminate, setIndeterminate] = useState(false)
  const [selectedPeople, setSelectedPeople] = useState([])

//   useLayoutEffect(() => {
//     const isIndeterminate = selectedPeople.length > 0 && selectedPeople.length < people.length
//     setChecked(selectedPeople.length === people.length)
//     setIndeterminate(isIndeterminate)
//     checkbox.current.indeterminate = isIndeterminate
//   }, [selectedPeople])

  function toggleAll() {
    setSelectedPeople(checked || indeterminate ? [] : people)
    setChecked(!checked && !indeterminate)
    setIndeterminate(false)
  }

  if (loading) {
        return <h2>Loading...</h2>
    }

    if (error) {
        return <h2>Error...</h2>
    }

    if (data) {
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

                <div className="mt-4 p-4 sm:p-6 lg:p-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Заголовки каталога</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the users in your account including their name, title, email and role.
                    </p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                    >
                        Добавить
                    </button>
                    </div>
                </div>
                <div className="mt-8 flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        {selectedPeople.length > 0 && (
                            <div className="absolute top-0 left-12 flex h-12 items-center space-x-3 bg-gray-50 sm:left-16">
                            <button
                                type="button"
                                className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                            >
                                Bulk edit
                            </button>
                            <button
                                type="button"
                                className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                            >
                                Delete all
                            </button>
                            </div>
                        )}
                        <table className="min-w-full table-fixed divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="relative w-12 px-6 sm:w-16 sm:px-8">
                                <input
                                    type="checkbox"
                                    className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                                    ref={checkbox}
                                    checked={checked}
                                    onChange={toggleAll}
                                />
                                </th>
                                <th scope="col" className="min-w-[1rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900">
                                №
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Значение
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Статус
                                </th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                <span className="sr-only">Изменить</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                            {data.head.map((person, i) => (
                                <tr key={i} className={selectedPeople.includes(person) ? 'bg-gray-50' : undefined}>
                                <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                                    {selectedPeople.includes(person) && (
                                    <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
                                    )}
                                    <input
                                    type="checkbox"
                                    className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                                    value={person.email}
                                    checked={selectedPeople.includes(person)}
                                    onChange={(e) =>
                                        setSelectedPeople(
                                        e.target.checked
                                            ? [...selectedPeople, person]
                                            : selectedPeople.filter((p) => p !== person)
                                        )
                                    }
                                    />
                                </td>
                                <td
                                    className={classNames(
                                    'whitespace-nowrap py-4 pr-3 text-sm font-medium',
                                    selectedPeople.includes(person) ? 'text-indigo-600' : 'text-gray-900'
                                    )}
                                >
                                    {i+1}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.value}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.email}</td>
                                <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                    Edit<span className="sr-only">, {person.name}</span>
                                    </a>
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
}
