import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Modal, notification, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import * as couponApi from '../../api/couponApi';
import moment from 'moment';
import CouponUpdateModal from './CouponUpdateModal';
import { useCookies } from 'react-cookie';

const CouponList = ({ createLoading }) => {
  const [cookie] = useCookies(['user']);

  const [couponList, setCouponList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [couponId, setCouponId] = useState('');
  const [updateVisible, setUpdateVisible] = useState(false);
  const [selectedName, setSelectedName] = useState('');
  const [selectedDiscount, setSelectedDiscount] = useState('');
  const [selectedExpireIn, setSelectedExpireIn] = useState('');
  const loadCoupon = () => {
    setLoading(true);
    couponApi.getCoupons().then((res) => {
      setCouponList(
        res.data.map((item) => {
          return {
            key: item._id,
            discount: item.discount,
            name: item.name,
            expireIn: moment(item.expireIn).format('DD/MM/YYYY'),
          };
        })
      );
      setLoading(false);
    });
  };
  useEffect(() => {
    loadCoupon();
  }, []);
  useEffect(() => {
    if (!createLoading || !updateLoading || !deleteLoading) {
      loadCoupon();
    }
  }, [createLoading, updateLoading, deleteLoading]);

  const deleteHandler = (couponId) => {
    setDeleteLoading(true);
    couponApi
      .removeCoupon(couponId, cookie.user.token)
      .then((_res) => {
        setDeleteLoading(false);
        notification.success({
          message: 'Deleted successfully',
          duration: 2,
        });
      })
      .catch((err) => {
        setDeleteLoading(false);
        notification.error({ message: err.response.data.message, duration: 4 });
      });
  };

  const showDeleteModal = (couponId) => {
    Modal.confirm({
      title: 'Bạn muốn xóa không',
      icon: <ExclamationCircleOutlined />,
      okText: 'Xóa',
      cancelText: 'Không',
      onOk: () => {
        deleteHandler(couponId);
      },
    });
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
      sorter: (a, b) => a.discount - b.discount,
      render: (discount) => <span>{discount} %</span>,
    },
    {
      title: 'Expire Day',
      dataIndex: 'expireIn',
      key: 'expireIn',
      sorter: (a, b) =>
        new Date(a.expireIn).getTime() - new Date(b.expireIn).getTime(),
      showSorterTooltip: false,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_text, record) => {
        return (
          <Space size='middle'>
            <EditOutlined
              onClick={() => {
                setCouponId(record.key);
                setUpdateVisible(true);
                setSelectedName(record.name);
                setSelectedDiscount(record.discount);
                setSelectedExpireIn(moment(record.expireIn, 'DD/MM/YYYY'));
              }}
            />
            <DeleteOutlined
              onClick={() => {
                showDeleteModal(record.key);
              }}
            />
          </Space>
        );
      },
    },
  ];

  return (
    <div>
      <Table
        size='middle'
        columns={columns}
        dataSource={couponList}
        scroll={{ x: 450 }}
        loading={loading}
        pagination={{
          position: ['bottomCenter'],
          pageSize: 5,
        }}
      />
      <CouponUpdateModal
        selectedDiscount={selectedDiscount}
        selectedExpireIn={selectedExpireIn}
        selectedName={selectedName}
        updateVisible={updateVisible}
        setUpdateVisible={setUpdateVisible}
        token={cookie.user.token}
        couponId={couponId}
        updateLoading={updateLoading}
        setUpdateLoading={setUpdateLoading}
      />
    </div>
  );
};

export default CouponList;
