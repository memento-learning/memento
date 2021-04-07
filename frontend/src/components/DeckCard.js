import { Card } from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = Card;
const DeckCard = ({ title, description, deck_id: deckId }) => (
  <Link to={`/deck/${deckId}`}>
    <Card
      style={{
      }}
      actions={[
      ]}
      hoverable
    >
      <Meta
        title={title}
        description={description}
      />
    </Card>

  </Link>

);
export default DeckCard;
