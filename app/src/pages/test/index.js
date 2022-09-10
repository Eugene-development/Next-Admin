import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'



import { useQuery } from '@apollo/client'

import { ALL_TEST } from '../../apollo/test.js'

const Test = () => {
  const { loading, error, data } = useQuery(ALL_TEST);
//   console.log(data);

  if (loading) {
    return <h2>Loading...</h2>
  }

  if (error) {
    return <h2>Error...</h2>
  }

  return (
         <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Test
                </h2>
            }>

            <Head>
                <title>Тест</title>
            </Head>

                    <ul>
                    {data.property.map((post) => (
                        <li>{post.value}</li>
                    ))}
                    </ul>
        </AppLayout>

  );
};

export default Test;
