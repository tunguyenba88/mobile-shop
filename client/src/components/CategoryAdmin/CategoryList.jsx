import { Modal, notification, Space, Table } from 'antd';
import React, { useState } from 'react';
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import * as api from '../../api/categoryApi';
import CategoryUpdateModal from './CategoryUpdateModal';

const CategoryList = ({
  loadingCat,
  categories,
  setCategories,
  keyword,
  setUpdateName,
  setUpdateSlug,
  userToken,
  updateName,
  updateSlug,
}) => {
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);

  const deleteHandler = (name, slug) => {
    api
      .deleteCategory(slug, userToken)
      .then(() => {
        api.getAllCategories().then((res) => {
          setCategories(res.data);
          notification.success({
            message: `${name} đã xóa thành công`,
            duration: 2,
          });
          setDeleteVisible(false);
        });
      })
      .catch((err) => {
        notification.error({
          message: err.response.data.message,
          duration: 4,
        });
        setDeleteVisible(false);
      });
  };
  const showDeleteModal = (name, slug) => {
    Modal.confirm({
      title: 'Bạn có muốn xóa danh mục này?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Xóa',
      cancelText: 'Không',
      onOk: () => {
        deleteHandler(name, slug);
      },
      visible: deleteVisible,
      onCancel: () => {
        setDeleteVisible(false);
      },
    });
  };

  const columns = [
    { title: 'Danh mục', dataIndex: 'name', key: 'name' },
    { title: 'Slug', dataIndex: 'slug', key: 'slug' },
    {
      title: 'Action',
      key: 'action',
      render: (_text, record) => {
        return (
          <Space>
            <EditOutlined
              onClick={() => {
                setUpdateName(record.name);
                setUpdateSlug(record.slug);
                setUpdateVisible(true);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                setDeleteVisible(true);
                showDeleteModal(record.name, record.slug);
              }}
            />
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Table
        size='middle'
        columns={columns}
        dataSource={categories.filter((c) =>
          c.name.toLowerCase().includes(keyword)
        )}
        scroll={{ x: 450 }}
        loading={loadingCat}
        pagination={{ position: ['bottomCenter'], pageSize: 5 }}
      />
      <CategoryUpdateModal
        updateVisible={updateVisible}
        setUpdateVisible={setUpdateVisible}
        userToken={userToken}
        setCategories={setCategories}
        updateName={updateName}
        updateSlug={updateSlug}
      />
    </>
  );
};

export default CategoryList;
