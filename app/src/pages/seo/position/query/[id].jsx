import ChartQuery from '@/components/query/chartQuery'
import { useQuery } from '@apollo/client'
import { QUERIES } from '@/apollo/query/seo'


export const getServerSideProps = async ({params}) => {
    const id = params.id
  return {
    props: {id}
  }
}


export const Chart = ({id}) => {

    //TODO: получить данные одного запроса по id
        const { loading, error, data } = useQuery(QUERIES)
        // const { loading, error, data } = useQuery(QUERIES, {fetchPolicy: 'network-only'})
        // console.log(data)
        if (loading) {
        return <h2>Loading...</h2>
    }

    if (error) {
        return <h2>Error...</h2>
    }

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    if (data) {
            const { project } = data || {}
            console.log(project);

            const d = {
                project,
                id
            }

            return (
                <ChartQuery d={d} />
            )
    }
    }

export default Chart
