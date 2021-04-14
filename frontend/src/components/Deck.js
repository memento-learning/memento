import {
  useParams,
} from 'react-router-dom';
// import { useState, useCallback } from 'react';
import {
  Typography,
} from 'antd';
import { useQuery } from 'react-query';
import deckApi from '../api/deck';

const { Title } = Typography;

function Deck() {
  const { id: deckId } = useParams();
  const { data: deck } = useQuery(['deck', deckId], () => deckApi.getDeck(deckId));
  const { name, description } = deck;
  if (!deck) {
    return null;
  }
  return (
    <div style={{ padding: '50px' }}>
      <Title>{name}</Title>
      <div style={{ padding: '25px 0px' }}>
        {description}
      </div>
    </div>
  );
}
export default Deck;
