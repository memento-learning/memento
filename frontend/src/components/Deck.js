import {
  useParams,
} from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  Typography, List, Row, Col, Button,
} from 'antd';
import { useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import deckApi from '../api/deck';
import ItemEditor from './ItemEditor';

const { Title } = Typography;

function Deck() {
  const { id: deckId } = useParams();
  const { data: deck } = useQuery(['deck', deckId], () => deckApi.getDeck(deckId), {
    initialData: { items: [] },
  });
  const [editMode, setEditMode] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: createDeckMutate } = useMutation(
    (payload) => deckApi.editDeckItems(deckId, payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['deck', deckId]);
        setEditMode(false);
      },
    },
  );
  const { items } = deck;

  if (!deck) {
    return null;
  }
  const { name, description } = deck;

  const onSave = (data, deleted) => {
    createDeckMutate({ ...data, deleted });
  };

  const renderItem = (item) => (
    [
      <List.Item>
        {item.question}
      </List.Item>,
      <List.Item>
        {item.answer}
      </List.Item>,
    ]
  );
  return (
    <div style={{ padding: '50px' }}>
      <Title>{name}</Title>
      <i>{description}</i>
      <div style={{ padding: '25px 0px' }}>
        <Button onClick={() => setEditMode(true)}>
          <EditOutlined />
          Edit
        </Button>
        <Row justify="center">
          {editMode ? (
            <Col span={8}>
              {' '}
              <ItemEditor initValues={items} onSave={onSave} />
            </Col>
          ) : (
            <Col span={12}>
              <List
                size="large"
                bordered
                dataSource={items}
                renderItem={renderItem}
                grid={{ gutter: 16, column: 2 }}
                header={(
                  <Row justify="center">
                    <Col span={4}><b>Question</b></Col>
                    <Col span={8} />
                    <Col span={4}><b>Answer</b></Col>
                  </Row>
                )}
              />
            </Col>
          )}
        </Row>
      </div>
    </div>
  );
}

export default Deck;
