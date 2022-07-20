import { Modal, notification, Space, Table } from 'antd';
import React, { useState } from 'react';
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import * as subCategoryApi from '../../api/subCategoryApi';
import SubUpdateModal from './SubUpdateModal';

const SubList = ({
  loadingSub,
  sub,
  keyword,
  categories,
  selectedCategory,
  setSelectedCategory,
  setSelectedSub,
  setSelectedSlug,
  userToken,
  setSub,
  selectedSub,
  selectedSlug,
}) => {
  const [updateVisible, setUpdateVisible] = useState(false);

  const deleteHandler = (name, slug) => {
    subCategoryApi
      .deleteSubCategory(slug, userToken)
      .then(() => {
        subCategoryApi.getAllSubCategories().then((res) => {
          setSub(res.data);
          notification.success({
            message: `${name} đã xóa thành công`,
            duration: 2,
          });
        });
      })
      .catch((err) => {
        notification.error({
          message: err.response.data.message,
          duration: 4,
        });
      });
  };
  const showDeleteModal = (name, slug) => {
    Modal.confirm({
      title: 'Bạn muốn xóa không',
      icon: <ExclamationCircleOutlined />,
      okText: 'Xóa',
      cancelText: 'Không',
      onOk: () => {
        deleteHandler(name, slug);
      },
    });
  };

  const columns = [
    { title: 'Danh mục con', dataIndex: 'name', key: 'name' },
    { title: 'Danh mục', dataIndex: 'categoryName', key: 'categoryName' },
    {
      title: 'Action',
      key: 'action',
      render: (_text, record) => {
        return (
          <Space>
            <EditOutlined
              onClick={() => {
                setSelectedCategory(record.categorySlug);
                setSelectedSub(record.name);
                setSelectedSlug(record.slug);
                setUpdateVisible(true);
              }}
            />
            <DeleteOutlined
              onClick={() => {
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
        dataSource={sub.filter((s) => s.name.toLowerCase().includes(keyword))}
        scroll={{ x: 450 }}
        loading={loadingSub}
        pagination={{
          position: ['bottomCenter'],
          pageSize: 10,
        }}
      />
      <SubUpdateModal
        categories={categories}
        selectedCategory={selectedCategory}
        selectedSlug={selectedSlug}
        selectedSub={selectedSub}
        setUpdateVisible={setUpdateVisible}
        userToken={userToken}
        setSub={setSub}
        updateVisible={updateVisible}
      />
    </>
  );
};

export default SubList;
