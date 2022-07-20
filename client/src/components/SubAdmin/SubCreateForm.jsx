import { Button, Form, Input, notification, Row, Select } from 'antd';
import React, { useState } from 'react';

const SubCreateForm = ({
  subCategoryApi,
  categories,
  setLoading,
  userToken,
  loading,
}) => {
  const [form] = Form.useForm();
  const [name, setName] = useState('');
  const onFinish = (values) => {
    setLoading(true);
    subCategoryApi
      .createSubCategory(
        values.sub.trimEnd().trimStart(),
        values.category,
        userToken
      )
      .then((res) => {
        console.log(res);
        setLoading(false);
        notification.success({
          message: `${values.sub} được tạo thành công`,
          duration: 2,
        });
        form.resetFields();
      })
      .catch((err) => {
        setLoading(false);
        notification.error({
          message: err.response.data.message,
          duration: 4,
        });
      });
  };
  return (
    <Form onFinish={onFinish} form={form}>
      <Row className='justify-content-between'>
        <Form.Item
          name='category'
          style={{
            display: 'inline-block',
            width: '30%',
          }}
          rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
        >
          <Select allowClear placeholder='Chọn danh mục'>
            {categories.map((c, id) => {
              return (
                <Select.Option key={id} value={c._id}>
                  {c.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item
          name='sub'
          style={{
            display: 'inline-block',
            width: '69%',
          }}
          rules={[{ required: true, message: 'Vui lòng nhập danh mục con' }]}
        >
          <Input
            placeholder='Danh mục con'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Item>
      </Row>
      <Form.Item>
        <Button type='primary' htmlType='submit'>
          {loading ? 'Chờ chút...' : 'Tạo'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SubCreateForm;
