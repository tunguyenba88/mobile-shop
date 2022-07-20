import {
  Badge,
  Button,
  Col,
  Form,
  Modal,
  notification,
  Row,
  Select,
  Space,
  Table,
  Tooltip,
} from 'antd';
import React, { useEffect, useState } from 'react';
import AdminNav from '../../components/AdminNav';
import * as orderApi from '../../api/orderApi';
import _ from 'lodash';
import moment from 'moment';
import { useCookies } from 'react-cookie';
import { formatPrice } from '../../utils/formatPrice';
import { Link } from 'react-router-dom';
import { EditOutlined } from '@ant-design/icons';

const statusArr = [
  'Not process',
  'Processing',
  'Dispatch',
  'Cancelled',
  'Completed',
];

const AdminDashboard = () => {
  const [cookies] = useCookies(['user']);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedOrder, setSelectedOrder] = useState('');

  const loadUserOrders = async () => {
    try {
      setLoading(true);
      const { data } = await orderApi.listOrder(cookies.user.token);

      setOrders(
        data.map((item) => {
          return {
            key: item._id,
            orderId: item._id,
            total: _.sumBy(item.products, (p) => p.count * p.product.price),
            method: item.paymentIntent.payment_method_types[0],
            status: item.paymentIntent.status,
            createdAt: moment(item.paymentIntent.created * 1000).format(
              'DD/MM/YYYY, HH:mm:ss'
            ),
            orderStatus: item.orderStatus,
            user: item.orderedBy,
          };
        })
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      notification.error({ message: error.response.data.message, duration: 4 });
    }
  };

  useEffect(() => {
    loadUserOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFinishUpdate = async (values) => {
    try {
      setUpdateLoading(true);

      await orderApi.updateOrderStatus(
        cookies.user.token,
        selectedOrder,
        values.status
      );

      notification.success({
        message: 'Cập nhật thành công',
        duration: 3,
      });
      setVisible(false);
      setUpdateLoading(false);
      loadUserOrders();
    } catch (error) {
      setUpdateLoading(false);
      notification.error({ message: error.response.data.message, duration: 4 });
    }
  };

  const orderColumns = [
    {
      title: 'Mã đơn',
      dataIndex: 'orderId',
      key: 'orderId',
      render: (text, record) => {
        return (
          <Link
            className='hover-link'
            to={`/user/order/${record.orderId}`}
            state={{ from: 'admin' }}
          >
            {text}
          </Link>
        );
      },
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'total',
      key: 'total',
      render: (text) => formatPrice(text),
    },
    { title: 'Payment method', dataIndex: 'method', key: 'method' },
    { title: 'Payment status', dataIndex: 'status', key: 'status' },
    { title: 'Ngày tạo', dataIndex: 'createdAt', key: 'createdAt' },
    {
      title: 'Order status',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      render: (text) => {
        return <Badge count={text} />;
      },
    },
    {
      title: 'Khách hàng',
      key: 'customer',
      dataIndex: 'user',
      render: (text) => {
        return (
          <Tooltip
            title={
              <Space direction='vertical' size='small'>
                <span>Tên: {text.name}</span>
                <span>SDT: {text.sdt}</span>
                <span>Đ/C: {text.address}</span>
              </Space>
            }
          >
            {text.name}
          </Tooltip>
        );
      },
    },
    {
      key: 'action',
      render: (_text, record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                setSelectedStatus(record.orderStatus);
                setSelectedOrder(record.orderId);
                setVisible(true);
              }}
            />
          </>
        );
      },
    },
  ];

  return (
    <Row
      style={{
        padding: '1.5rem 0',
        backgroundColor: 'rgb(245, 248, 253)',
        minHeight: '90vh',
      }}
    >
      <AdminNav selectedKey='dashboard' />
      <Col
        sm={24}
        xs={24}
        md={20}
        style={{ padding: '0 24px', minHeight: 280 }}
      >
        <Table
          columns={orderColumns}
          dataSource={orders}
          scroll={{ x: 450 }}
          loading={loading}
          pagination={{
            position: ['bottomCenter'],
            pageSize: 10,
          }}
        />
      </Col>
      <Modal
        title='Cập nhật trạng thái đơn hàng'
        visible={visible}
        footer={null}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <Form
          fields={[{ name: 'status', value: selectedStatus }]}
          onFinish={onFinishUpdate}
        >
          <Form.Item
            name='status'
            rules={[
              { required: true, message: 'Vui lòng xác nhận trạng thái' },
            ]}
          >
            <Select>
              {statusArr.map((el, id) => {
                return (
                  <Select.Option key={id} value={el}>
                    {el}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Row style={{ justifyContent: 'center', margin: '40px 0px 0px 0px' }}>
            <Space size='small'>
              <Button onClick={() => setVisible(false)}>Không</Button>
              <Button type='primary' htmlType='submit' loading={updateLoading}>
                Cập nhật
              </Button>
            </Space>
          </Row>
        </Form>
      </Modal>
    </Row>
  );
};

export default AdminDashboard;
