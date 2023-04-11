import { useAuth } from '@/hooks/auth'
import { useEffect, Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { useQuery, useReactiveVar, useMutation } from '@apollo/client'
import { ALL_PRODUCT, UPDATE_PRODUCT } from '@/apollo/query/product'
import { ALL_CATEGORY, ONE_CATEGORY } from '@/apollo/query/category'
import { is_visible_update_product } from '@/apollo/stores/visible'
import { current_id_product, current_value_product, current_parent_id_product, current_parent_value_product, current_id_product_price, current_value_product_price } from '@/apollo/stores/current'
import { useSlug } from "@/hooks/slug";
import { sortBy } from "lodash"

const UpdateItemProduct = () => {
    const { user } = useAuth({ middleware: 'guest' })
    const key = user.key

    const visibleForm = useReactiveVar(is_visible_update_product)
    const currentIdProduct = useReactiveVar(current_id_product)
    const currentIdPrice = useReactiveVar(current_id_product_price)
    const currentValuePrice = useReactiveVar(current_value_product_price)
    const currentValueProduct = useReactiveVar(current_value_product)
    const currentParentIdProduct = useReactiveVar(current_parent_id_product)
    const currentParentValueProduct = useReactiveVar(current_parent_value_product)

    const { data } = useQuery(ALL_CATEGORY, {variables: { key }})
    const [category, setCategory] = useState([])
    useEffect(() => {
        if (data) {
            const sortedCategory = sortBy(data.category, ['value']);
            setCategory(sortedCategory);
        }
    }, [data]);
    const [changedText, setText] = useState();
    const [changedPrice, setPrice] = useState();
    const [selectedParent, setSelectedParent] = useState();
    const parent = selectedParent ? selectedParent : currentParentIdProduct;
    // const text = changedText ? changedText : currentValueProduct;
    const text = changedText || currentValueProduct;

    const price = changedPrice ? changedPrice : currentValuePrice;
    // TODO: решить костыль (приходит Number, а ожидается строка)
    const stringPrice = _.toString(price);
    const handleParentChange = (e) => setSelectedParent((e.target.value));
    const { slugify } = useSlug();
    const handleUpdateProduct = (e) => {

        e.preventDefault();
        if (text.trim().length) {
        updateProduct({
            variables: {
            id: currentIdProduct,
            key,
            is_active: true,
            value: text,
            slug: slugify(text.translit()),
            parentableType: 'category',
            parentableId: Number(parent),
            updatePrice: { key: "1", id: currentIdPrice, value: stringPrice },
            },
        });
        setText('');
        }
    }
        const [updateProduct] = useMutation(UPDATE_PRODUCT, {
        refetchQueries: [
            { query: ONE_CATEGORY,
                variables: {key, id: parent}}
            ],
            // fetchPolicy: 'network-only'
        // fetchOptions: {
        //     headers: {
        //         'cache-control': 'no-cache'
        //     }
        // }
    });

    const cancelButtonRef = useRef(null)

  return (
    <>
        { data &&
            <Transition.Root show={visibleForm} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => is_visible_update_product(false)}>
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
                            Обновление продукта
                            </Dialog.Title>
                            <div className="mt-2">
                            <p className="text-sm text-gray-500">
                                Обновление действия необратимо. Будьте внимательны к заполнению полей и предварительно сверяйте данные с первоисточником.
                            </p>
                            </div>
                        </div>
                        </div>
                        <form onSubmit={handleUpdateProduct} className="space-y-8 divide-y divide-gray-200">

                            <div className="py-2">
                            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="parent" className="block text-sm font-medium text-gray-700">
                                        Изменить элемент каталога
                                    </label>
                                    <div className="mt-1">
                                        <select
                                            onChange={e => handleParentChange(e)}
                                            defaultValue={currentParentIdProduct}
                                            id="parent"
                                            name="parent"
                                            autoComplete="parent-name"
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            >
                                                {category.map((item, key) => {
                                                    return item.id == currentParentIdProduct ?
                                                        <option key={item.id} value={currentParentIdProduct}>{currentParentValueProduct}</option>
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
                                        defaultValue={currentValueProduct}
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
                                    <label htmlFor="value" className="block text-sm font-medium text-gray-700">
                                        Цена
                                    </label>
                                    <div className="mt-1">
                                        <input
                                        defaultValue={currentValuePrice}
                                        onChange={(e) => setPrice(e.target.value)}
                                        type="text"
                                        name="value"
                                        id="value"
                                        autoComplete="value"
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
                                onClick={() => is_visible_update_product(false)}
                                >
                                Обновить
                                </button>
                                <button
                                type="button"
                                className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                                onClick={() => is_visible_update_product(false)}
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

export default UpdateItemProduct
