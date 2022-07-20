import { DatePicker, Form, Input, notification } from 'antd';
import React from 'react';
import LoadingButton from '../LoadingButton';
import * as couponApi from '../../api/couponApi';
import { useCookies } from 'react-cookie';

const CouponCreateForm = ({ setCreateLoading, createLoading }) => {
  const [form] = Form.useForm();
  const [cookie] = useCookies(['user']);
  const onFinish = (values) => {
    setCreateLoading(true);
    const { name, expire, discount } = values;
    couponApi
      .createCoupon(name, expire, discount, cookie.user.token)
      .then((res) => {
        console.log(res);
        form.resetFields();
        setCreateLoading(false);
      })
      .catch((err) => {
        setCreateLoading(false);
        notification.error({
          message: err.response.data.message,
          duration: 4,
        });
      });
  };
  return (
    <Form
      layout='vertical'
      wrapperCol={{ md: { span: 12 } }}
      onFinish={onFinish}
    >
      <Form.Item label='Mã giảm giá' name='name' rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label='Discount % ( 0-100% )'
        name='discount'
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='Ngày hết hạn'
        name='expire'
        rules={[{ required: true }]}
      >
        <DatePicker format='DD/MM/YYYY' />
      </Form.Item>
      <Form.Item>
        <LoadingButton loading={createLoading} type='create' />
      </Form.Item>
    </Form>
  );
};

export default CouponCreateForm;
