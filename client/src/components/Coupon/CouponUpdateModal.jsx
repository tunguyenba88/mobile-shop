import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  notification,
  Row,
  Space,
} from 'antd';
import React from 'react';
import LoadingButton from '../LoadingButton';
import * as couponApi from '../../api/couponApi';

const CouponUpdateModal = ({
  updateVisible,
  setUpdateVisible,
  selectedName,
  selectedDiscount,
  selectedExpireIn,
  couponId,
  token,
  updateLoading,
  setUpdateLoading,
}) => {
  const onFinishUpdate = async (values) => {
    const { name, expireIn, discount } = values;
    setUpdateLoading(true);
    try {
      await couponApi.updateCoupon(name, expireIn, discount, couponId, token);
      setUpdateLoading(false);
      setUpdateVisible(false);
      notification.success({ message: 'Cập nhật thành công', duration: 3 });
    } catch (error) {
      setUpdateLoading(false);
      notification.error({ message: error.response.data.message, duration: 4 });
    }
  };
  return (
    <Modal
      visible={updateVisible}
      title='Cập nhật thẻ giảm giá'
      onCancel={() => {
        setUpdateVisible(false);
      }}
      footer={null}
    >
      <Form
        onFinish={onFinishUpdate}
        layout='vertical'
        // wrapperCol={{ md: { span: 12 } }}
        fields={[
          { name: 'name', value: selectedName },
          { name: 'discount', value: selectedDiscount },
          { name: 'expireIn', value: selectedExpireIn },
        ]}
      >
        <Form.Item label='Mã giảm giá' name='name'>
          <Input placeholder='mã giảm giá' type='text' />
        </Form.Item>
        <Form.Item
          label='Discount % ( 0-100% )'
          name='discount'
          rules={[{ required: true }]}
        >
          <Input placeholder='discount' type='text' />
        </Form.Item>
        <Form.Item
          label='Ngày hết hạn'
          name='expireIn'
          rules={[{ required: true }]}
        >
          <DatePicker format='DD/MM/YYYY' />
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

export default CouponUpdateModal;
