import Navigation from '@/components/Layouts/Navigation'
import { useAuth } from '@/hooks/auth'
import { Disclosure } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import ApplicationLogo from '@/components/ApplicationLogo'

import {
    Bars3BottomLeftIcon,
    BellIcon,
    CalendarIcon,
    ChartBarIcon,
    FolderIcon,
    HomeIcon,
    InboxIcon,
    UsersIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'

const navigation = [
    { name: 'Дашборд', icon: HomeIcon, current: true, href: '/dashboard' },
    {
        name: 'Контент',
        icon: UsersIcon,
        current: false,
        children: [
            { name: 'Меню', href: '#' },
            { name: 'Рубрика', href: '#' },
            { name: 'Категория', href: '#' },
            { name: 'Товар', href: '#' },
        ],
    },
    {
        name: 'SEO',
        icon: FolderIcon,
        current: false,
        children: [
            { name: 'Запросы', href: '#' },
            { name: 'Конкуренты', href: '#' },
        ],
    },
    {
        name: 'Продажи',
        icon: CalendarIcon,
        current: false,
        children: [{ name: 'Заказы', href: '#' }],
    },
    {
        name: 'Партнёры',
        icon: InboxIcon,
        current: false,
        children: [
            { name: 'Дзержинск', href: '#' },
            { name: 'Нижний Новгород', href: '#' },
        ],
    },
]
const userNavigation = [
    { name: 'Ваш профиль', href: '#' },
    { name: 'Документация', href: '#' },
    { name: 'Настройки', href: '#' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const AppLayout = ({ header, children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { user } = useAuth({ middleware: 'auth' })
    const { logout } = useAuth()

    if (!user) {
        return <h2>Нет доступа!!!</h2>
    }

    return (
        <>
            {/*
        This example requires updating your template:

        ```
        <html class="h-full">
        <body class="h-full">
        ```
      */}
            <div>
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-40"
                        onClose={setSidebarOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0">
                            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full">
                                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pb-4 ">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0">
                                        <div className="absolute top-0 right-0 -mr-12 pt-2">
                                            <button
                                                type="button"
                                                className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                                onClick={() =>
                                                    setSidebarOpen(false)
                                                }>
                                                <span className="sr-only">
                                                    Close sidebar
                                                </span>
                                                <XMarkIcon
                                                    className="h-6 w-6 text-white"
                                                    aria-hidden="true"
                                                />
                                            </button>
                                        </div>
                                    </Transition.Child>

                                    <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white pt-5 pb-4">
                                        <div className="flex flex-shrink-0 items-center px-4">
                                            <ApplicationLogo className="w-auto h-8 sm:h-12 fill-current" />
                                        </div>
                                        <div className="mt-5 flex flex-grow flex-col">
                                            <nav
                                                className="flex-1 space-y-1 bg-white px-2"
                                                aria-label="Sidebar">
                                                {navigation.map(item =>
                                                    !item.children ? (
                                                        <div key={item.name}>
                                                            <a
                                                                href="/"
                                                                className={classNames(
                                                                    item.current
                                                                        ? 'bg-gray-100 text-gray-900'
                                                                        : 'bg-white text-gray-800 hover:bg-gray-50 hover:text-gray-900',
                                                                    'group w-full flex items-center pl-2 py-2 text-sm font-medium rounded-md',
                                                                )}>
                                                                <item.icon
                                                                    className={classNames(
                                                                        item.current
                                                                            ? 'text-gray-900'
                                                                            : 'text-gray-800 group-hover:text-gray-800',
                                                                        'mr-3 flex-shrink-0 h-6 w-6',
                                                                    )}
                                                                    aria-hidden="true"
                                                                />
                                                                {item.name}
                                                            </a>
                                                        </div>
                                                    ) : (
                                                        <Disclosure
                                                            as="div"
                                                            key={item.name}
                                                            className="space-y-1">
                                                            {({ open }) => (
                                                                <>
                                                                    <Disclosure.Button
                                                                        className={classNames(
                                                                            item.current
                                                                                ? 'bg-gray-100 text-gray-900'
                                                                                : 'bg-white text-gray-800 hover:bg-gray-50 hover:text-gray-900',
                                                                            'group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500',
                                                                        )}>
                                                                        <item.icon
                                                                            className="mr-3 h-6 w-6 flex-shrink-0 text-gray-700 group-hover:text-gray-800"
                                                                            aria-hidden="true"
                                                                        />
                                                                        <span className="flex-1">
                                                                            {
                                                                                item.name
                                                                            }
                                                                        </span>
                                                                        <svg
                                                                            className={classNames(
                                                                                open
                                                                                    ? 'text-gray-800 rotate-90'
                                                                                    : 'text-gray-800',
                                                                                'ml-3 h-5 w-5 flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-gray-700',
                                                                            )}
                                                                            viewBox="0 0 20 20"
                                                                            aria-hidden="true">
                                                                            <path
                                                                                d="M6 6L14 10L6 14V6Z"
                                                                                fill="currentColor"
                                                                            />
                                                                        </svg>
                                                                    </Disclosure.Button>
                                                                    <Disclosure.Panel className="space-y-1">
                                                                        {item.children.map(
                                                                            subItem => (
                                                                                <Disclosure.Button
                                                                                    key={
                                                                                        subItem.name
                                                                                    }
                                                                                    as="a"
                                                                                    href={
                                                                                        subItem.href
                                                                                    }
                                                                                    className="group flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                                                                                    {
                                                                                        subItem.name
                                                                                    }
                                                                                </Disclosure.Button>
                                                                            ),
                                                                        )}
                                                                    </Disclosure.Panel>
                                                                </>
                                                            )}
                                                        </Disclosure>
                                                    ),
                                                )}
                                            </nav>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                            <div className="w-14 flex-shrink-0">
                                {/* Dummy element to force sidebar to shrink to fit close icon */}
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>

                <div className="mx-4">
                    <div className="mx-auto flex max-w-full flex-col xl:px-0">
                        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white">
                            <button
                                type="button"
                                className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                                onClick={() => setSidebarOpen(true)}>
                                <span className="sr-only">Open sidebar</span>
                                <Bars3BottomLeftIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                />
                            </button>
                            <div className="flex flex-1 justify-between px-4">
                                <div className="flex flex-1">
                                    <form
                                        className="flex w-full"
                                        action="#"
                                        method="GET">
                                        <label
                                            htmlFor="search-field"
                                            className="sr-only">
                                            Search
                                        </label>
                                        <div className="relative w-full text-gray-700 focus-within:text-gray-600">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                                                <MagnifyingGlassIcon
                                                    className="h-5 w-5"
                                                    aria-hidden="true"
                                                />
                                            </div>
                                            <input
                                                id="search-field"
                                                className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
                                                placeholder="Поиск"
                                                type="search"
                                                name="search"
                                            />
                                        </div>
                                    </form>
                                </div>
                                <div className="ml-4 flex items-center">
                                    <button
                                        type="button"
                                        className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                        <span className="sr-only">
                                            View notifications
                                        </span>
                                        <BellIcon
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    </button>

                                    {/* Profile dropdown */}
                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <Menu.Button className="flex max-w-xs items-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                                <span className="sr-only">
                                                    Open user menu
                                                </span>
                                                <img
                                                    className="h-8 w-8 rounded-full"
                                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                    alt=""
                                                />
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95">
                                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                {userNavigation.map(item => (
                                                    <Menu.Item key={item.name}>
                                                        {({ active }) => (
                                                            <a
                                                                href={item.href}
                                                                className={classNames(
                                                                    active
                                                                        ? 'bg-gray-100'
                                                                        : '',
                                                                    'block py-2 px-4 text-sm text-gray-700',
                                                                )}>
                                                                {item.name}
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                ))}
                                                <button
                                                    className=" w-full text-left block hover:bg-gray-100 py-2 px-4 text-sm text-gray-700"
                                                    onClick={logout}>
                                                    Выйти
                                                </button>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
                        </div>

                        <main className="flex-1">
                            <div className="py-0">
                                <div className="min-h-screen bg-gray-50">
                                    <Navigation user={user} />

                                    {/* Page Heading */}
                                    {/* <header className="bg-white ">
                                        <div className="max-w-full mx-auto py-4 px-4 sm:px-6 lg:px-8">
                                            {header}
                                        </div>
                                    </header> */}

                                    {/* Page Content */}
                                    <main>{children}</main>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AppLayout
