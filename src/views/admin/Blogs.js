import React, { useEffect, useState } from "react";
import { List, Avatar, Space, Card, Form, Upload, Button, Input, Drawer, Modal, Pagination } from 'antd';
import { InboxOutlined, MessageOutlined, EditOutlined, ShareAltOutlined, ExclamationCircleOutlined, EyeOutlined, DeleteOutlined} from '@ant-design/icons'

// import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { connect } from "react-redux";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from 'html-to-draftjs';
import { convertToRaw, EditorState, ContentState } from "draft-js";
import { imageUrl } from "services/axios";
// components

const mapStateToProps =({dispatch, blog}) =>({
  dispatch,
  blogs:blog.blogs,
  totalBlog:blog.totalBlog,
  loading:blog.loading
})
function BlogsPage({dispatch, blogs, loading, totalBlog}) {

  const getHtml = editorState => draftToHtml(convertToRaw(editorState.getCurrentContent()));
  const [editor, setEditor] = useState("")
  const [addModal, setAddModal] = useState(false)
  const [editPost, setEditPost] = useState(false)
  const [viewModal, setViewModal] = useState(false)
  const [content, setContent] = useState({})
  const [file, setFile] = useState("")
  const [form] = Form.useForm();
  const [forms] = Form.useForm();
	const {confirm} = Modal;

  useEffect(() => {
    dispatch({
      type:"blog/ALL_BLOGS",
      payload:{offset:0, limit:20}
    })
    dispatch({
      type:"user/CURRENT_USER"
    })
  }, [])

  const onFinish = (val) => {
    if(file !== ""){
        const fd = new FormData();
        fd.append('title', val.title)
        fd.append('description', val.description)
        fd.append('content', getHtml(editor))
        fd.append('image', file);
        dispatch({
          type:'blog/CREATE_BLOG',
          payload:fd
        })
        setFile("")
        setAddModal(false)
        setEditor("")
        form.resetFields()
    }
  }

  const onFinishEdit = (val) => {
    if(file !== ""){
        const fd = new FormData();
        fd.append('title', val.title)
        fd.append('description', val.description)
        fd.append('content', getHtml(editor))
        fd.append('image', file);
        fd.append('imagePath', val.imagePath);
        fd.append('blogPostId', val.blogPostId);
        dispatch({
          type:'blog/UPDATE_BLOG',
          payload:fd
        })
        setFile("")
        setEditPost(false)
        setEditor("")
        forms.resetFields()
    }
  }

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const handleChange = info => {
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>{
        setFile(info.file.originFileObj)
      });
    }
  };

  const dummyRequest = ({onSuccess}) =>{
    setTimeout(()=>{
      onSuccess("ok");
    }, 0)
  }

  const handleShowEdit =(value)=>{
    setEditPost(true)
    const blocksFromHtml = htmlToDraft(value.postContent);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    setEditor(EditorState.createWithContent(contentState));
    forms.setFieldsValue({
      title: value.postTitle,
      blogPostId:value.blogPostId,
      imagePath:value.imagePath,
      description:value.description,
    })
  }

  const handleView =(value) =>{
    setViewModal(true)
    setContent(value)
  }

  const onEditorStateChange = editorState => {
    setEditor(editorState);
  };

  const onFinishPublish = (id, status) =>{
    dispatch({
      type:"blog/PUBLISH_BLOG",
      payload:{id, status}
    })
  }

  const confirmActivateAction = (id, val) => {
    let status = val === "PUBLISHED"? "unPublish":"publish"
    confirm({
      title: `Are you sure want to ${status} this blog?`,
      icon: <ExclamationCircleOutlined />,
      content: 'Click Ok to continue',
      onOk() {
        onFinishPublish(id, status)
      },
      onCancel() {
      console.log('Cancel');
      },
    });
  }

  const confirmDelete = (id) => {
		confirm({
		  title: `Are you sure you want to delete this Post?`,
		  icon: <ExclamationCircleOutlined />,
		  content: 'Click Ok to continue',
		  onOk() {
			handleDelete(id)
		  },
		  onCancel() {
			console.log('Cancel');
		  },
		});
	}

  const handlePagination = (page, pageSize) =>{
    dispatch({
      type:"blog/ALL_BLOGS",
      payload:{offset:0, limit:20}
    })
  }

  const handleDelete = (id)=>{
    dispatch({
      type:"blog/DELETE_BLOG",
      payload:id
    })
  }

  const IconText = ({ icon, text }) => (
    <Space>
      {icon}
      {text}
    </Space>
  );

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <div className="relative flex flex-col px-5 min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-xl font-bold">Blog Posts</h6>
                <button
                  className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={()=>setAddModal(true)}
                >
                  Create New Blog Post
                </button>
              </div>
              <Card style={{marginTop: 16 }} loading={loading}>
                <List
                  itemLayout="vertical"
                  size="large"
                  pagination={false}
                  dataSource={blogs}
                  renderItem={item => (
                    <List.Item
                      key={item.blogPostId}
                      actions={[
                        <Button icon={<EditOutlined />} onClick={()=>handleShowEdit(item)} >Edit</Button>,
                        <Button icon={<ShareAltOutlined />} onClick={()=>confirmActivateAction(item.blogPostId, item.status)} >{item.status === "PUBLISHED"?"Unpublish":"Publish"}</Button>,
                        <Button icon={<EyeOutlined />} onClick={()=>handleView(item)} >View</Button>,
                        <Button icon={<DeleteOutlined />} onClick={()=>confirmDelete(item.blogPostId)} >Delete</Button>,
                        <IconText icon={<MessageOutlined />} text={item.Comments.length} key="list-vertical-message" />,
                      ]}
                      extra={
                        <img
                          width={272}
                          style={{height:200}}
                          alt="logo"
                          src={`${imageUrl}blog/${item.imagePath}`}
                        />
                      }
                    >
                      <List.Item.Meta
                        avatar={<Avatar className="uppercase" style={{ backgroundColor: '#f56a00'}}>{item.Author.firstName.slice(0,1)}</Avatar>}
                        title={<a href={item.href}>{item.postTitle}</a>}
                        description={<h3>{item.description.slice(0, 100)}</h3>}
                      />
                      {/* <div dangerouslySetInnerHTML={{__html: item.postContent}} /> */}
                      <h5 className="font-bold text-orange-500">
                        Posted By: {item.Author.firstName} {item.Author.lastName}
                        &nbsp; &nbsp;on <span>{new Date(item.createdAt).toDateString()}</span>
                      </h5>
                      <span className="font-bold lowercase">status: {item.status}</span>
                    </List.Item>
                  )}
                />
                <Pagination
                  total={totalBlog}
                  responsive={true}
                  defaultCurrent={1}
                  onChange={handlePagination}
                  defaultPageSize={20}
                />
              </Card>
            </div>
          </div>
        </div>
        {/* Add Blog modal start */}
        <Drawer
          title="Create New Blog"
          placement="right"
          width={500}
          closable={false}
          onClose={()=>setAddModal(false)}
          visible={addModal}
        >
          <div className="card">
            <div className="card-body">
              <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item label="Blog Title" name="title" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="Blog Description" name="description" rules={[{ required: true }]}>
                  <Input.TextArea  />
                </Form.Item>
                <Form.Item label="Blog Content" name="content" rules={[{ required: true }]}>
                  <Editor
                    editorState={editor}
                    editorClassName="px-3 border border-gray-1"
                    editorStyle={{
                        height: 200,
                        overflow:'auto',
                    }}
                    onEditorStateChange={onEditorStateChange}
                  />
                </Form.Item>
                <Form.Item >
                  <Upload onChange={handleChange} customRequest={dummyRequest} maxCount={1}>
                    <Button icon={<InboxOutlined />}>Upload Blog Image</Button>
                  </Upload>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Create
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </Drawer>
        {/* Add Blog modal end */}

        {/* Update Blog modal start */}
        <Drawer
          title="Update Blog"
          placement="right"
          width={500}
          closable={false}
          onClose={()=>setEditPost(false)}
          visible={editPost}
        >
          <div className="card">
            <div className="card-body">
              <Form form={forms} layout="vertical" onFinish={onFinishEdit}>
                <Form.Item name="blogPostId" hidden>
                  <Input />
                </Form.Item>
                <Form.Item name="imagePath" hidden>
                  <Input />
                </Form.Item>
                <Form.Item label="Blog Title" name="title" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="Blog Description" name="description" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="Blog Content" name="content">
                  <Editor
                    editorState={editor}
                    editorClassName="px-3 border border-gray-1"
                    editorStyle={{
                        height: 200,
                        overflow:'auto',
                    }}
                    onEditorStateChange={onEditorStateChange}
                  />
                </Form.Item>
                <Form.Item>
                  <Upload onChange={handleChange} customRequest={dummyRequest} maxCount={1}>
                    <Button icon={<InboxOutlined />}>Upload Blog Image</Button>
                  </Upload>
                </Form.Item>
                <Form.Item >
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Update
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </Drawer>
        {/* Update Blog modal end */}

        {/* View Blog COntent start */}
        <Modal
          title={content.postTitle}
          centered
          visible={viewModal}
          footer={null}
          onCancel={() => setViewModal(false)}
        >
          <p dangerouslySetInnerHTML={{__html: content.postContent}} />
        </Modal>
        {/* View Blog Content end */}
      </div>
    </>
  );
}

export default connect(mapStateToProps)(BlogsPage)
