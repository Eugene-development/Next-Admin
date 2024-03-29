import { useAuth } from '@/hooks/auth'
import { useEffect, useRef, useState } from 'react'
import { useQuery,  useReactiveVar } from '@apollo/client'
import { ONE_CATEGORY } from '@/apollo/query/category'
import { is_visible_create_product, is_visible_read_product, is_visible_update_product, is_visible_delete_product } from '@/apollo/stores/visible'
import { current_value_product, current_value_product_price, current_id_product_price, current_value_product_unit, current_id_product, current_parent_id_product, current_parent_value_product, current_created_product, current_updated_product } from '@/apollo/stores/current'
import  Switch  from '@/components/UI/buttons/Switch'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const OneCategoryProducts = ({selectedCategoryId}) => {
    const { user } = useAuth({ middleware: 'guest' })
    const key = user?.key
    const { loading, error, data } = useQuery (ONE_CATEGORY, {variables: {key, id: selectedCategoryId}})
    const [categoryOne, setCategory] = useState()
    console.log(categoryOne)
    useEffect(() => {
        if (data) setCategory(data.category_one_id)
    }, [data]);

    const checkbox = useRef()
    const [checked, setChecked] = useState(false)
    const [indeterminate, setIndeterminate] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState([])

  useEffect(() => {
    if (data){
    const isIndeterminate = selectedProduct.length > 0 && selectedProduct.length < categoryOne.product.length
    setChecked(selectedProduct.length === categoryOne.product.length && selectedProduct.length > 0)
    setIndeterminate(isIndeterminate)
    checkbox.current.indeterminate = isIndeterminate
    }
  }, [selectedProduct])

  function toggleAll() {
    setSelectedProduct(checked || indeterminate ? [] : categoryOne.product)
    setChecked(!checked && !indeterminate)
    setIndeterminate(false)
  }

    if (loading) return <h2>Загрузка...</h2>
    if (error) return <h2>Error...</h2>

        return (

                <>
                {categoryOne &&
                                    <div className="mt-4 p-4 sm:p-6 lg:p-8">
                        <div className="sm:flex sm:items-center">
                            <div className="sm:flex-auto">
                            <h1 className="text-xl font-semibold text-gray-900">Раздел "Продукция"</h1>
                            <p className="mt-2 text-sm text-gray-700">
                                При изменении статуса элемента в неактивное положение, данные не будут отображаться на сайте.
                            </p>
                            </div>
                            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                            <button
                            onClick={() => {is_visible_create_product(true)} }
                                type="button"
                                className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-8 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto"
                            >
                                Добавить
                            </button>
                            </div>
                        </div>
                        <div className="mt-8 flex flex-col">
                            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                    {selectedProduct.length > 0 && (
                                        <div className="absolute top-0 left-12 flex h-12 items-center space-x-3 bg-gray-50 sm:left-16">
                                                    <button
                                                        onClick={() => {

                                                            }
                                                        }
                                                        type="button"
                                                        className="mx-2 inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-blue-500 bg-white hover:bg-blue-200 focus:outline-none border-blue-300 focus:shadow-outline-blue active:bg-blue-200 transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                                                        <svg
                                                            className="h-3 w-3  duration-150"
                                                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => {

                                                            }
                                                        }
                                                        type="button"
                                                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-red-500 bg-white hover:bg-red-200 focus:outline-none border-red-300 focus:shadow-outline-red active:bg-red-200 transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                                                        <svg
                                                            className="h-3 w-3  duration-150"
                                                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                        </svg>
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
                                                <th scope="col" className="min-w-[4rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900">
                                                №
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Значение
                                                </th>
                                                <th scope="col" className="px-3 ml-8 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Наличие
                                                </th>
                                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                                <span className="sr-only">Изменить</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                        {categoryOne.product.map((item, i) => (
                                            <tr key={item.id} className={selectedProduct.includes(item) ? 'bg-gray-50' : undefined}>
                                                <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                                                    {selectedProduct.includes(item) && (
                                                    <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
                                                    )}
                                                    <input
                                                    type="checkbox"
                                                    className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                                                    value={item.email}
                                                    checked={selectedProduct.includes(item)}
                                                    onChange={(e) =>
                                                        setSelectedProduct(
                                                        e.target.checked
                                                            ? [...selectedProduct, item]
                                                            : selectedProduct.filter((p) => p !== item)
                                                        )
                                                    }
                                                    />
                                                </td>
                                            <td
                                                className={classNames(
                                                'whitespace-nowrap py-4 pr-3 text-sm font-medium',
                                                selectedProduct.includes(item) ? 'text-indigo-600' : 'text-gray-900'
                                                )}
                                            >
                                                {i+1}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.value}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">

                                            <Switch is_active={item.is_active} id={item.id}/>

                                            </td>
                                                <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">

                                                    <button
                                                        onClick={() => {
                                                            is_visible_read_product(true)
                                                            current_value_product(item.value)
                                                            current_value_product_price(item?.price?.value)
                                                            current_value_product_unit(item?.unit?.value)
                                                            current_parent_value_product(categoryOne.parent.value)
                                                            current_created_product(item.created_at)
                                                            current_updated_product(item.updated_at)
                                                            }
                                                        }
                                                        type="button" className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-purple-500 bg-purple-50 hover:bg-purple-200 focus:outline-none focus:border-purple-300 focus:shadow-outline-purple active:bg-purple-200 transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                                                        <svg
                                                            className=" h-4 w-4  duration-150"
                                                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            is_visible_update_product(true)
                                                            current_id_product(item.id)
                                                            current_value_product(item.value)
                                                            current_value_product_price(item?.price?.value)
                                                            current_id_product_price(item?.price?.id)
                                                            current_parent_value_product(categoryOne.value)
                                                            current_parent_id_product(categoryOne.id)
                                                            }
                                                        }
                                                        type="button"
                                                        className="mx-2 inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-blue-500 bg-blue-50 hover:bg-blue-200 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-blue-200 transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                                                        <svg
                                                            className=" h-4 w-4  duration-150"
                                                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            is_visible_delete_product(true)
                                                            current_value_product(item.value)
                                                            current_id_product(item.id)
                                                            current_parent_id_product(categoryOne.id)
                                                            }
                                                        }
                                                        type="button"
                                                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-red-500 bg-red-50 hover:bg-red-200 focus:outline-none focus:border-red-300 focus:shadow-outline-red active:bg-red-200 transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                                                        <svg
                                                            className=" h-4 w-4  duration-150"
                                                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                        </svg>
                                                    </button>
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


                }

                </>

        )

}

export default OneCategoryProducts;
