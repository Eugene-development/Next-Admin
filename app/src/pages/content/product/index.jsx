import { useAuth } from '@/hooks/auth'
import { useEffect, useRef, useState } from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useQuery,  useReactiveVar } from '@apollo/client'
import { PRODUCT_PRICE } from '@/apollo/query/product'
import { ALL_CATEGORY, ONE_CATEGORY } from '@/apollo/query/category'
import OneCategoryProducts from '@/components/Elements/product/OneCategoryProducts'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


    // const { user } = useAuth({ middleware: 'guest' })
    // const key = user?.key
    // // const { loading, error, data } = useQuery(PRODUCT_PRICE, {variables: { key }, fetchPolicy: 'network-only'})

    // const { loading, error, data: dataCategory } = useQuery(ALL_CATEGORY, {variables: { key }})
    // const [selectedCategoryId, setSelectedCategoryId] = useState();
    // const handleCategoryChange = (e) => setSelectedCategoryId(([e.target.value]));

    // const [selectedOneCategory, setSelectedOneCategoryId] = useState();

    // const { loading: load, error: e, data } = useQuery(ONE_CATEGORY, {
    //     variables: {
    //         key,
    //         id: selectedCategoryId
    //         },
    //     fetchPolicy: 'network-only'});


export default function Product() {
    const { user } = useAuth({ middleware: 'guest' })
    const key = user.key
    
    const { loading, error, data } = useQuery(PRODUCT_PRICE, {variables: { key }, fetchPolicy: 'network-only'})
    const { data: dataCategory } = useQuery(ALL_CATEGORY, {variables: { key }})

    const [selectedCategoryId, setSelectedCategoryId] = useState();
    // const [selectedCategory, setSelectedCategory] = useState([]);
    // const [newData, setnewData] = useState([]);
    const handleCategoryChange = (e) => {

        // const { loading, error, data } = useQuery (ONE_CATEGORY, {variables: {key, id: (e.target.value)}})
        // console.log(data);
        setSelectedCategoryId((e.target.value));
        // const newData = data.product.filter(p => p.parent?.id == e.target.value);

        // setnewData(newData);
    }


  if (loading) <h2>Загрузка...</h2>
  if (error) <h2>Error...</h2>
        return (
            <>
                 <AppLayout
                            header={
                                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                                    Продукция
                                </h2>
                            }>
                            <Head>
                                <title>Продукция</title>
                            </Head>


{ dataCategory &&
                            <div className="sm:col-span-3">
                                    <label htmlFor="parent" className="block text-sm font-medium text-gray-700">
                                        Выберите категорию
                                    </label>
                                    <div className="mt-1">
                                        <select
                                        onChange={e => handleCategoryChange(e)}
                                        defaultValue={'DEFAULT'}
                                        id="parent"
                                        name="parent"
                                        autoComplete="parent-name"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        >
                                            <option value="DEFAULT" disabled hidden>Выбрать</option>
                                            {dataCategory.category.map((item, key) => <option key={item.id} value={item.id}>{item.value}</option>)}
                                        </select>
                                    </div>
                                </div>

}

{selectedCategoryId &&
    <OneCategoryProducts selectedCategoryId={selectedCategoryId}/>
}

                </AppLayout>

            </>
        )
}
