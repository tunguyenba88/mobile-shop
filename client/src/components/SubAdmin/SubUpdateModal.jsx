import {
  Button,
  Form,
  Input,
  Modal,
  notification,
  Row,
  Select,
  Space,
} from 'antd';
import * as subCategoryApi from '../../api/subCategoryApi';
import React, { useState } from 'react';
import LoadingButton from '../LoadingButton';

const SubUpdateModal = ({
  updateVisible,
  setUpdateVisible,
  userToken,
  selectedSlug,
  setSub,
  selectedCategory,
  selectedSub,
  categories,
}) => {
  const [updateLoading, setUpdateLoading] = useState(false);

  const onFinishUpdate = (values) => {
    setUpdateLoading(true);
    subCategoryApi
      .updateSubCategory(
        selectedSlug,
        values.sub,
        values.category,
        selectedCategory,
        userToken
      )
      .then((_res) => {
        notification.success({
          message: 'Cập nhật thành công',
          duration: 3,
        });
        setUpdateLoading(false);
        setUpdateVisible(false);
        subCategoryApi.getAllSubCategories().then((res) =>
          setSub(
            res.data.map((sub) => {
              return {
                ...sub,
                key: sub._id,
                categorySlug: sub.parent.slug,
                categoryName: sub.parent.name,
                categoryId: sub.parent._id,
              };
            })
          )
        );
      })
      .catch((err) => {
        setUpdateLoading(false);
        notification.error({
          message: err.response.data.message,
          duration: 4,
        });
      });
    setUpdateVisible(false);
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
        fields={[
          { name: 'category', value: selectedCategory },
          { name: 'sub', value: selectedSub },
        ]}
      >
        <Form.Item name='category'>
          <Select placeholder='Chọn danh mục'>
            {categories.map((c, id) => {
              return (
                <Select.Option key={id} value={c.slug}>
                  {c.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          name='sub'
          rules={[
            { required: true, message: 'Vui lòng nhập tên danh mục con' },
            {
              min: 3,
              max: 32,
              message: 'Danh mục con phải có từ 3 đến 32 ký tự',
            },
          ]}
        >
          <Input placeholder='Danh mục con' type='text' />
        </Form.Item>
        <Row style={{ justifyContent: 'center', margin: '40px 0px 0px 0px' }}>
          <Space size='small'>
            <Button onClick={() => setUpdateVisible(false)}>Không</Button>
            <LoadingButton loading={updateLoading} type='update' />
          </Space>
        </Row>
      </Form>
    </Modal>
  );
};

export default SubUpdateModal;
