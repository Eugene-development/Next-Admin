import ChartQuery from '@/components/query/chartQuery'


export const getServerSideProps = async ({params}) => {
    const id = params.id
  return {
    props: {id}
  }
}


export const App = ({id}) => {

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <ChartQuery id={id} />
    )
}

export default App
