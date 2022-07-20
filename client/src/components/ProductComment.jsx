import {
  Avatar,
  Button,
  Comment,
  Divider,
  Form,
  Input,
  List,
  notification,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import avatar from '../images/avatar.png';
import * as commentApi from '../api/commentApi';
import moment from 'moment';

const Editor = ({ onChange, onSubmit, submitting, value, user }) => {
  return (
    <>
      <Form.Item>
        <Input.TextArea
          disabled={user ? false : true}
          rows={4}
          onChange={onChange}
          value={value}
        />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType='submit'
          loading={submitting}
          onClick={onSubmit}
          type='primary'
        >
          {user ? 'Bình luận' : <Link to='/login'>Đăng nhập để đánh giá</Link>}
        </Button>
      </Form.Item>
    </>
  );
};

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} đánh giá`}
    pagination={{ pageSize: 5 }}
    itemLayout='horizontal'
    renderItem={(props) => {
      return <Comment {...props} />;
    }}
  />
);

const ProductComment = ({ user, product, params }) => {
  const [comment, setComment] = useState({
    cmtList: [],
    submitting: false,
    value: '',
  });

  const handleChange = (e) => {
    setComment({ ...comment, value: e.target.value });
  };

  const handleSubmit = () => {
    if (!comment.value) {
      return;
    }
    setComment({ ...comment, submitting: true });
    commentApi
      .cmtSp(product._id, comment.value, user.token)
      .then((res) => {
        setComment({
          ...comment,
          value: '',
          submitting: false,
          cmtList: res.data.map((cmt) => {
            return {
              author: cmt.user.email,
              avatar: cmt.user.avatar || avatar,
              content: cmt.comment,
              datetime: moment(cmt.createdAt).format('DD-MM-YYYY, HH:mm:ss'),
            };
          }),
        });
      })
      .catch((err) => {
        notification.error({ message: err.response.data.message, duration: 4 });
        setComment({ ...comment, submitting: false });
      });
  };

  useEffect(() => {
    commentApi.listCmtByProductId(params.slug).then((res) => {
      setComment({
        ...comment,
        cmtList: res.data.map((cmt) => {
          return {
            author: cmt.user.email,
            avatar: !cmt.user.avatar ? avatar : cmt.user.avatar,
            content: cmt.comment,
            datetime: moment(cmt.createdAt).format('DD-MM-YYYY, HH:mm:ss'),
          };
        }),
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <>
      <Divider orientation='left'>
        <h4>Đánh giá sản phẩm</h4>
      </Divider>
      {comment.cmtList.length > 0 && <CommentList comments={comment.cmtList} />}

      <Comment
        avatar={<Avatar src={(user && user.avatar) || avatar} alt='avatar' />}
        content={
          <Editor
            user={user}
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={comment.submitting}
            value={comment.value}
          />
        }
      />
    </>
  );
};

export default ProductComment;
