import {
  Input, Button, Form, Space,
} from 'antd';
import { useState } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { useForm } = Form;

function ItemEditor({ initValues, onSave }) {
  const [updated, setUpdated] = useState({});
  const [deleted, setDeleted] = useState([]);
  const [form] = useForm();

  const handleValueChange = ({ items: changedItems }, { items: allItems }) => {
    changedItems.map(
      (elem, idx) => (
        elem && allItems[idx].item_id
          ? setUpdated({ ...updated, [allItems[idx].item_id]: true }) : null
      ),
    );
  };

  const onFinish = (data) => onSave(data, updated, deleted);
  const onRemove = (remove, name) => () => {
    const { item_id: itemId } = form.getFieldValue(['items', name]) || {};
    if (itemId) {
      setDeleted(deleted.concat([itemId]));
    }
    remove(name);
  };

  return (
    <Form form={form} name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off" onValuesChange={handleValueChange}>
      <Form.List name="items" initialValue={initValues}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({
              key, name, fieldKey, ...restField
            }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'question']}
                  fieldKey={[fieldKey, 'question']}
                  rules={[{ required: true, message: 'Enter the question' }]}
                >
                  <TextArea autoSize />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'answer']}
                  fieldKey={[fieldKey, 'answer']}
                  rules={[{ required: true, message: 'Enter an answer' }]}
                >
                  <TextArea autoSize />
                </Form.Item>
                <MinusCircleOutlined onClick={onRemove(remove, name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
export default ItemEditor;
