import { key_project } from '@/apollo/stores/auth'
import { useAuth } from '@/hooks/auth'

import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { useQuery, useReactiveVar, useMutation } from '@apollo/client'
import { ALL_CATEGORY, UPDATE_CATEGORY } from '@/apollo/query/category'
import { ALL_RUBRIC } from '@/apollo/query/rubric'
import { is_visible_update_category } from '@/apollo/stores/visible'
import { current_seoTitle_category, current_seoDescription_category, current_id_category, current_value_category, current_parent_id_category, current_parent_value_category } from '@/apollo/stores/current'
import { useSlug } from "@/hooks/slug";

const UpdateItemCategory = () => {
    const { user } = useAuth({ middleware: 'guest' })
    const key = user.key

    const visibleForm = useReactiveVar(is_visible_update_category)

    const currentSeoTitleCategory = useReactiveVar(current_seoTitle_category)
    const currentSeoDescriptionCategory = useReactiveVar(current_seoDescription_category)
    const currentIdCategory = useReactiveVar(current_id_category)
    const currentValueCategory = useReactiveVar(current_value_category)
    const currentParentIdCategory = useReactiveVar(current_parent_id_category)
    const currentParentValueCategory = useReactiveVar(current_parent_value_category)

    const { data } = useQuery(ALL_RUBRIC, {variables: { key }})
    const [changedText, setText] = useState();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [selectedParent, setSelectedParent] = useState();
    const parent = selectedParent ? selectedParent : currentParentIdCategory;
    const text = changedText ? changedText : currentValueCategory;

    const handleParentChange = (e) => setSelectedParent((e.target.value));
    const { slugify } = useSlug();
    const handleUpdateCategory = (e) => {
        e.preventDefault();
        if (text.trim().length) {
        updateCategory({
            variables: {
            id: currentIdCategory,
            key,
            is_active: true,
            value: text,
            slug: slugify(text.translit()),
            parentableType: 'rubric',
            parentableId: Number(parent),
            },
        });
        setText('');
        }
    }
        const [updateCategory] = useMutation(UPDATE_CATEGORY, {
        refetchQueries: [
        { query: ALL_CATEGORY,
            variables: { key }}
        ],
    });

    const cancelButtonRef = useRef(null)

  return (
    <>
        { data &&
            <Transition.Root show={visibleForm} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => is_visible_update_category(false)}>
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
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                            <CheckIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                        </div>
                        <div className="mt-3 text-center sm:mt-5">
                            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                            Обновление элемента рубрик
                            </Dialog.Title>
                            <div className="mt-2">
                            <p className="text-sm text-gray-500">
                                Обновление действия необратимо. Будьте внимательны к заполнению полей и предварительно сверяйте данные с первоисточником.
                            </p>
                            </div>
                        </div>
                        </div>
                        <form onSubmit={handleUpdateCategory} className="space-y-8 divide-y divide-gray-200">

                            <div className="py-2">
                                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="parent" className="block text-sm font-medium text-gray-700">
                                            Изменить элемент каталога
                                        </label>
                                        <div className="mt-1">
                                            <select
                                                onChange={e => handleParentChange(e)}
                                                defaultValue={currentParentIdCategory}
                                                id="parent"
                                                name="parent"
                                                autoComplete="parent-name"
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                >
                                                    {data.rubric.map((item, key) => {
                                                        return item.id == currentParentIdCategory ?
                                                            <option key={item.id} value={currentParentIdCategory}>{currentParentValueCategory}</option>
                                                            :
                                                            <option key={item.id} value={item.id}>{item.value}</option>
                                                    }
                                                        )}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-6">
                                        <label htmlFor="value" className="block text-sm font-medium text-gray-700">
                                            Значение
                                        </label>
                                        <div className="mt-1">
                                            <input
                                            defaultValue={currentValueCategory}
                                            onChange={(e) => setText(e.target.value)}
                                            type="text"
                                            name="value"
                                            id="value"
                                            autoComplete="value"
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-6">
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                            Title
                                        </label>
                                        <div className="mt-1">
                                            <input
                                            defaultValue={currentSeoTitleCategory}
                                            onChange={(e) => setTitle(e.target.value)}
                                            type="text"
                                            name="title"
                                            id="title"
                                            autoComplete="title"
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-6">
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                            Description
                                        </label>
                                        <div className="mt-1">
                                            <input
                                            defaultValue={currentSeoDescriptionCategory}
                                            onChange={(e) => setDescription(e.target.value)}
                                            type="text"
                                            name="description"
                                            id="description"
                                            autoComplete="description"
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 sm:mt-10 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                <button
                                type="submit"
                                className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                                onClick={() => is_visible_update_category(false)}
                                >
                                Обновить
                                </button>
                                <button
                                type="button"
                                className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                                onClick={() => is_visible_update_category(false)}
                                ref={cancelButtonRef}
                                >
                                Отменить
                                </button>
                            </div>

                        </form>
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

export default UpdateItemCategory
