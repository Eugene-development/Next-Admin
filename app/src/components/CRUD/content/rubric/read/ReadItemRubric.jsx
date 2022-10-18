import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { useReactiveVar } from '@apollo/client'
import { is_visible_read_rubric } from '@/apollo/stores/visible'
import { current_value_rubric, current_parent_value_rubric, current_created_rubric, current_updated_rubric } from '@/apollo/stores/current'

const ReadItemRubric = () => {
    const visibleForm = useReactiveVar(is_visible_read_rubric)
    const currentValueRubric = useReactiveVar(current_value_rubric)
    const currentParentValueRubric = useReactiveVar(current_parent_value_rubric)
    const currentCreatedRubric = useReactiveVar(current_created_rubric)
    const currentUpdatedRubric = useReactiveVar(current_updated_rubric)
    const cancelButtonRef = useRef(null)

    return (
        <>
            <Transition.Root show={visibleForm} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => is_visible_read_rubric(false)}>
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
                            Данные элемента рубрики
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
                            <div className="mt-6 grid grid-cols-1 gap-y-6 ">
                                <div className="">
                                    <span className="block text-sm font-medium text-gray-700">
                                        Значение - "{currentValueRubric}"
                                    </span>
                                </div>

                                <div className="">
                                    <span  className="block text-sm font-medium text-gray-700">
                                        Принадлежит элементу меню - "{currentParentValueRubric}"
                                    </span>
                                </div>

                                <div className="">
                                    <span className="block text-sm font-medium text-gray-700">
                                        Запись создана - {new Date(currentCreatedRubric).toLocaleDateString("ru")}
                                    </span>
                                </div>
                                <div className="">
                                    <span className="block text-sm font-medium text-gray-700">
                                        Последнее изменение - {new Date(currentUpdatedRubric).toLocaleDateString("ru")}
                                    </span>
                                </div>
                            </div>
                            </div>

                            <div className="mt-8 sm:mt-10">
                                <button
                                    type="button"
                                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                                    onClick={() => is_visible_read_rubric(false)}
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
        </>
      )

}
export default ReadItemRubric
