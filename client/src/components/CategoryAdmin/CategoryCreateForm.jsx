import { Form, Input, notification } from 'antd';
import React from 'react';
import * as api from '../../api/categoryApi';
import LoadingButton from '../LoadingButton';

const CategoryCreateForm = ({ setKeyword, userToken, setLoading, loading }) => {
  const [form] = Form.useForm();
  const onFinishCreate = (values) => {
    setLoading(true);
    setKeyword('');
    api
      .createCategory(values.category.trim(), userToken)
      .then((_res) => {
        setLoading(false);
        notification.success({
          message: `${values.category.trim()} được tạo thành công`,
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
    <Form onFinish={onFinishCreate} form={form}>
      <Form.Item
        name='category'
        rules={[
          { required: true, message: 'Vui lòng nhập tên danh mục' },
          {
            min: 3,
            max: 32,
            message: 'Danh mục phải có từ 3 đến 32 ký tự',
          },
        ]}
      >
        <Input placeholder='Danh mục' allowClear />
      </Form.Item>
      <Form.Item>
        <LoadingButton type='create' loading={loading} />
      </Form.Item>
    </Form>
  );
};

export default CategoryCreateForm;
