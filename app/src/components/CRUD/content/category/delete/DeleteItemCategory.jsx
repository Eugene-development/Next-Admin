import { key_project } from '@/apollo/stores/auth'
import { useReactiveVar, useMutation } from '@apollo/client'
import { ALL_CATEGORY, DELETE_CATEGORY } from '@/apollo/query/category'
import { useRef, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { is_visible_delete_category } from '@/apollo/stores/visible'
import { current_value_category, current_id_category } from '@/apollo/stores/current'


const DeleteItemCategory = () => {
    const key = useReactiveVar(key_project)
    const visibleForm = useReactiveVar(is_visible_delete_category)
    const currentValueCategory = useReactiveVar(current_value_category)
    const currentIDCategory = useReactiveVar(current_id_category)
    const [removeCategory, {error: removeError}] = useMutation(DELETE_CATEGORY, {
            refetchQueries: [
                {
                    query: ALL_CATEGORY,
                    variables: { key }
                }
            ],
      })
    const cancelButtonRef = useRef(null)

    return (
        <Transition.Root show={visibleForm} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => is_visible_delete_category(false)}>
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
                    <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                        Вы уверены?
                        </Dialog.Title>
                        <div className="mt-2">
                        <p className="text-sm text-gray-500">
                            Элемент каталога "<strong>{currentValueCategory}</strong>" будет удалён из базы данных. Если вы не уверены просто поменяйте переключателем статус элемента в таблице.
                        </p>
                        </div>
                    </div>
                    </div>
                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => {
                            removeCategory({variables: { id: currentIDCategory }}),
                            is_visible_delete_category(false)
                        }}
                    >
                        Удалить
                    </button>
                    <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                        onClick={() => is_visible_delete_category(false)}
                        ref={cancelButtonRef}
                    >
                        Отменить
                    </button>
                    </div>
                </Dialog.Panel>
                </Transition.Child>
            </div>
            </div>
        </Dialog>
        </Transition.Root>
    )
}

export default DeleteItemCategory
