import { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography, Button, Modal, Form, Input, Alert,
} from 'antd';
import { selectDecks, loadDecks } from '../reducers/deckSlice';
import DeckGrid from './DeckGrid';
import deckApi from '../api/deck';

const { Title } = Typography;

function MyDecks() {
  const decks = useSelector(selectDecks) || [];
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalFlash, setModalFlash] = useState(null);
  const [form] = Form.useForm();

  const onSubmit = useCallback(async (formData) => {
    try {
      await deckApi.createDeck(formData.name, formData.description);
      setModalVisible(false);
      form.resetFields();
      dispatch(loadDecks());
    } catch (err) {
      setModalFlash({ message: 'Cannot create deck.' });
    }
  }, [form, dispatch]);

  const onCancel = useCallback(() => {
    setModalVisible(false);
    form.resetFields();
  }, [form]);

  useEffect(() => {
    dispatch(loadDecks());
  }, [dispatch]);

  const flash = <Alert message={modalFlash ? modalFlash.message : ''} type="error" />;

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
          {modalFlash ? flash : null}
        </Form>
      </Modal>
      <div style={{ padding: '25px 0px' }}><DeckGrid list={decks} /></div>

    </div>
  );
}

export default MyDecks;
