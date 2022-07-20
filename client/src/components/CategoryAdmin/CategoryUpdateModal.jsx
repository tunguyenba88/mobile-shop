import { Button, Form, Input, Modal, notification, Row, Space } from 'antd';
import React, { useState } from 'react';
import * as api from '../../api/categoryApi';

const CategoryUpdateModal = ({
  updateVisible,
  setUpdateVisible,
  userToken,
  setCategories,
  updateSlug,
  updateName,
}) => {
  const [updateLoading, setUpdateLoading] = useState(false);

  const onFinishUpdate = (values) => {
    setUpdateLoading(true);
    api
      .updateCategory(updateSlug, values.category.trim(), userToken)
      .then(() => {
        setUpdateLoading(false);
        api.getAllCategories().then((res) => {
          setCategories(
            res.data.map((category) => {
              return { ...category, key: category._id };
            })
          );
          notification.success({
            message: 'Cập nhật danh mục thành công',
            duration: 3,
          });
          setUpdateVisible(false);
        });
      })
      .catch((err) => {
        setUpdateLoading(false);
        notification.error({
          message: err.response.data.message,
          duration: 4,
        });
      });
  };
  return (
    <Modal
      visible={updateVisible}
      title='Cập nhật danh mục'
      onCancel={() => {
        setUpdateVisible(false);
      }}
      footer={null}
    >
      <Form
        onFinish={onFinishUpdate}
        fields={[{ name: 'category', value: updateName }]}
      >
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
          <Input />
        </Form.Item>
        <Row style={{ justifyContent: 'center', margin: '40px 0px 0px 0px' }}>
          <Space size='small'>
            <Button onClick={() => setUpdateVisible(false)}>Không</Button>
            <Button type='primary' htmlType='submit'>
              {updateLoading ? 'Chờ chút...' : 'Cập nhật'}
            </Button>
          </Space>
        </Row>
      </Form>
    </Modal>
  );
};

export default CategoryUpdateModal;
