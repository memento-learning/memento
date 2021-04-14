import { Col, Row } from 'antd';
import DeckCard from './DeckCard';

function DeckGrid({ list, columns = 3 }) {
  if (list.length === 0) {
    return (
      <i>No decks availible.</i>
    );
  }
  const cols = list.map(({ name, description, deck_id: deckId }) => (
    <Col key={deckId} span={24 / columns}>
      <DeckCard key={deckId} {...{ title: name, description, deck_id: deckId }} />
    </Col>
  ));
  return (
    <Row gutter={[16, 16]} type="flex">
      {cols}
    </Row>
  );
}
export default DeckGrid;
