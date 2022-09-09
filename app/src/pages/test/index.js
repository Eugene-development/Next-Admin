import { useQuery } from '@apollo/client'

import { ALL_TEST } from '../../apollo/test.js'

const Test = () => {
  const { loading, error, data } = useQuery(ALL_TEST);
  console.log(data.property[0].value);

  if (error) {
    return <h2>Error...</h2>
  }

  return (
    <ul>
      {data.property.map((post) => (
        <li>{post.value}</li>
      ))}
    </ul>
  );
};

export default Test;
