import { useState, useCallback } from 'react';
import {
  Typography, Button, Modal, Form, Input, Alert,
} from 'antd';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import DeckGrid from './DeckGrid';
import deckApi from '../api/deck';

const { Title } = Typography;

function MyDecks() {
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  const queryClient = useQueryClient();
  const { data: decks } = useQuery('userDecks', deckApi.getDecks, {
    initialData: [],
  });

  const { mutate: createDeckMutate, isError: createDeckError } = useMutation(
    deckApi.createDeck,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('userDecks');
        form.resetFields();
        setModalVisible(false);
      },
    },
  );

  const onSubmit = (formData) => createDeckMutate(formData);

  const onCancel = useCallback(() => {
    setModalVisible(false);
    form.resetFields();
  }, [form]);

  const flash = <Alert message={createDeckError ? 'Error creating deck!' : ''} type="error" />;

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };

  return (
    <div style={{ padding: '50px' }}>
      <Title>My Decks</Title>
      <Button type="primary" onClick={() => setModalVisible(true)}>Create</Button>
      <Modal
        title="Create Deck"
        centered
        visible={modalVisible}
        onOk={form.submit}
        onCancel={onCancel}
        okText="Create"
      >
        {' '}
        <Form
          {...layout}
          form={form}
          onFinish={onSubmit}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please add a name.',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: 'Please add a description.',
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          {createDeckError ? flash : null}
        </Form>
      </Modal>
      <div style={{ padding: '25px 0px' }}><DeckGrid list={decks || []} /></div>

    </div>
  );
}

export default MyDecks;
