import {

  useParams,
} from 'react-router-dom';

function Deck() {
  const { id } = useParams();
  return (

    <h1>
      Deck with ID:
      {' '}
      {id}
    </h1>
  );
}
export default Deck;
