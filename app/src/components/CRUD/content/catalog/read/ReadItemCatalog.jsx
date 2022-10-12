import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { useQuery, useReactiveVar } from '@apollo/client'
import { ONE_CATALOG } from '@/apollo/query/catalog'
import { is_visible_read } from '@/apollo/stores/visible'
import { current_value_catalog, current_id_catalog } from '@/apollo/stores/current'

const ReadItemCatalog = () => {
    const visibleForm = useReactiveVar(is_visible_read)
    const currentIdCatalog = useReactiveVar(current_id_catalog)
    const { loading, error, data } = useQuery(ONE_CATALOG,
        {
            variables: { id: currentIdCatalog },
            fetchPolicy: 'network-only'
        });
    const cancelButtonRef = useRef(null)
    const currentValueCatalog = useReactiveVar(current_value_catalog)

    if (loading) {
        return <h2>Loading...</h2>
    }

    if (error) {
        return <h2>Error...</h2>
    }

        // const created = new Date(data.catalog_one.created_at).toLocaleDateString("ru");
        // const updated = new Date(data.catalog_one.updated_at).toLocaleDateString("ru");
    return (
    <>
        { data &&
            <Transition.Root show={visibleForm} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => is_visible_read(false)}>
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                        <div>
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                            <CheckIcon className="h-6 w-6 text-purple-600" aria-hidden="true" />
                        </div>
                        <div className="mt-3 text-center sm:mt-5">
                            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                            Данные элемента каталога
                            </Dialog.Title>
                            <div className="mt-2">
                            <p className="text-sm text-gray-500">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius aliquam laudantium explicabo
                                pariatur iste dolorem animi vitae error totam. At sapiente aliquam accusamus facere veritatis.
                            </p>
                            </div>
                        </div>
                        </div>
                            <div className="py-2">
                            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                <div className="sm:col-span-6">
                                    <span className="block text-sm font-medium text-gray-700">
                                        Значение - "{currentValueCatalog}"
                                    </span>
                                </div>

                                <div className="sm:col-span-3">
                                    <span  className="block text-sm font-medium text-gray-700">
                                        Принадлежит элементу меню - "{data.catalog_one?.parent.value}"
                                    </span>
                                </div>

                                <div className="sm:col-span-6">
                                    <span className="block text-sm font-medium text-gray-700">
                                        Запись создана - {new Date(data.catalog_one?.created_at).toLocaleDateString("ru")}
                                    </span>
                                </div>
                                <div className="sm:col-span-6">
                                    <span className="block text-sm font-medium text-gray-700">
                                        Последнее изменение - {new Date(data.catalog_one?.updated_at).toLocaleDateString("ru")}
                                    </span>
                                </div>
                            </div>
                            </div>

                            <div className="mt-8 sm:mt-10">
                                <button
                                    type="button"
                                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                                    onClick={() => is_visible_read(false)}
                                    ref={cancelButtonRef}
                                    >
                                    Закрыть
                                </button>
                            </div>

                    </Dialog.Panel>
                    </Transition.Child>
                </div>
                </div>
            </Dialog>
            </Transition.Root>
        }
    </>
      )

}
export default ReadItemCatalog
