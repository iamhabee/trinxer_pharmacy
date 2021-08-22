import React, { useEffect, useState } from "react";
import { Table, Form, Button, Upload, Input, Modal, Space, Select, Pagination } from 'antd';
import { InboxOutlined, ExclamationCircleOutlined} from '@ant-design/icons'


import { connect } from "react-redux";
import { imageUrl } from "services/axios";
import { convertToRaw, EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from 'html-to-draftjs';
// components

const mapStateToProps =({dispatch, category, product}) =>({
  dispatch,
  categories:category.categories,
  products:product.products,
  totalProduct:product.totalProduct,
  loading:product.loading
})


const getHtml = editorState => draftToHtml(convertToRaw(editorState.getCurrentContent()));
function ProductPage({dispatch, categories, products, loading, totalProduct}) {

  const [addModal, setAddModal] = useState(false)
  const [editProduct, setEditProduct] = useState(false)
  const [editor, setEditor] = useState("")
  const [file, setFile] = useState("")
  const [pdfFile, setPdfFile] = useState("")
  const [form] = Form.useForm();
  const [forms] = Form.useForm();
  const {Option} = Select
	const {confirm} = Modal;

  useEffect(() => {
    dispatch({
      type:"category/ALL_CATEGORIES"
    })
    dispatch({
      type:"product/ALL_PRODUCTS",
      payload:{limit:20, offset:0}
    })
    dispatch({
      type:"user/CURRENT_USER"
    })
  }, [])

  const onFinish = (val) => {
    const fd = new FormData();
    fd.append('detail', getHtml(editor))
    fd.append('name', val.name)
    fd.append('description', val.description)
    fd.append('categoryId', val.categoryId)
    fd.append('image', file);
    fd.append('file', pdfFile);
    dispatch({
      type:'product/CREATE_PRODUCT',
      payload:fd
    })
    setFile("")
    setPdfFile("")
    setEditor("")
    setAddModal(false)
    form.resetFields()
  }

  const onFinishEdit = (val) => {
    const fd = new FormData();
    fd.append('detail', getHtml(editor))
    fd.append('name', val.name)
    fd.append('description', val.description)
    fd.append('categoryId', val.categoryId)
    fd.append('productId', val.productId)
    fd.append('image', file);
    fd.append('imageUrl', val.imageUrl);
    fd.append('pdfFile', pdfFile);
    fd.append('fileUrl', val.fileUrl);
    dispatch({
      type:'product/UPDATE_PRODUCT',
      payload:fd
    })
    setFile("")
    setPdfFile("")
    setEditor("")
    setEditProduct(false)
    forms.resetFields()
  }

  const handleEdit = (value) =>{
    setEditProduct(true)
    if(value.detail){
      const blocksFromHtml = htmlToDraft(value.detail);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      setEditor(EditorState.createWithContent(contentState));
    }
    forms.setFieldsValue({
      name: value.name,
      description: value.description,
      categoryId: value.categoryId,
      productId: value.productId,
      detail: value.detail,
      imageUrl: value.imageUrl,
      fileUrl:value.fileUrl
    })
  }

  const confirmAction = (id) => {
		confirm({
		  title: `Are you sure you want to delete this product?`,
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

  const handleDelete = (id) =>{
    dispatch({
      type:'product/DELETE_PRODUCT',
      payload:id
    })
  }

  const handlePagination = (page, pageSize) =>{
    dispatch({
      type:"product/ALL_PRODUCTS",
      payload:{limit:20, offset:(page-1 )* 20}
    })
  }

  const columns = [
    {
      title: 'Image',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: text => <img style={{height:80, width:80}} src={`${imageUrl}products/${text}`} alt={text} />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Action',
      dataIndex: 'productId',
      key: 'productId',
      render: (id, record) => (
        <Space size="middle">
          <Button type="ghost" onClick={()=>handleEdit(record)}>Edit </Button>
          <Button type="danger" onClick={()=>confirmAction(id)}>Delete</Button>
        </Space>
      ),
    },
  ];

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

  const handleChangePdf = info => {
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>{
        setPdfFile(info.file.originFileObj)
      });
    }
  };

  const dummyRequest = ({onSuccess}) =>{
    setTimeout(()=>{
      onSuccess("ok");
    }, 0)
  }

  const onEditorStateChange = editorState => {
    setEditor(editorState);
  };

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <div className="relative flex flex-col px-5 min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-xl font-bold">All Products</h6>
                <button
                  className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={()=>setAddModal(true)}
                >
                  Create New Product
                </button>
              </div>
              <Table columns={columns} loading={loading} pagination={false} dataSource={products} rowKey="productId" />
              <Pagination
                total={totalProduct}
                responsive={true}
                defaultCurrent={1}
                onChange={handlePagination}
                defaultPageSize={20}
              />
            </div>
          </div>
        </div>
        {/* Add product modal start */}
        <Modal
          title="Create New Product"
          centered
          footer={null}
          onCancel={()=>setAddModal(false)}
          visible={addModal}
        >
          <div className="card">
            <div className="card-body">
              <Form form={form} onFinish={onFinish}>
                <Form.Item name="name" rules={[{ required: true }]}>
                  <Input placeholder="Product Name"/>
                </Form.Item>
                <Form.Item name="description" rules={[{ required: true }]}>
                  <Input.TextArea placeholder="Product Description" />
                </Form.Item>
                <Form.Item name="detail" rules={[{ required: true }]}>
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
                <Form.Item name="categoryId" rules={[{ required: true }]}>
                  <Select
                    placeholder="Select Category Name"
                    allowClear
                  >
                    {categories.map(category => <Option key={category.categoryId} value={category.categoryId}>{category.name}</Option>)}
                  </Select>
                </Form.Item>
                <Form.Item rules={[{ required: true }]}>
                  <Upload onChange={handleChange} customRequest={dummyRequest}>
                    <Button icon={<InboxOutlined />}>Upload Product Image</Button>
                  </Upload>
                </Form.Item>
                <Form.Item >
                  <Upload onChange={handleChangePdf} customRequest={dummyRequest}>
                    <Button icon={<InboxOutlined />}>Upload pdf file</Button>
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
        </Modal>
        {/* Add product modal end */}

        {/* Update product modal start */}
        <Modal
          title="Update Product"
          centered
          footer={null} 
          onCancel={()=>setEditProduct(false)}
          visible={editProduct}
        >
          <div className="card">
            <div className="card-body">
              <Form form={forms} onFinish={onFinishEdit}>
                <Form.Item name="name" rules={[{ required: true }]}>
                  <Input placeholder="Product Name" />
                </Form.Item>
                <Form.Item name="description" rules={[{ required: true }]}>
                  <Input.TextArea placeholder="Product Description" />
                </Form.Item>
                <Form.Item name="detail" rules={[{ required: true }]}>
                  <Editor
                    placeholder="Product Detail" 
                    editorState={editor}
                    editorClassName="px-3 border border-gray-1"
                    editorStyle={{
                        height: 200,
                        overflow:'auto',
                    }}
                    onEditorStateChange={onEditorStateChange}
                  />
                </Form.Item>
                <Form.Item name="productId" hidden>
                  <Input />
                </Form.Item>
                <Form.Item name="imageUrl" hidden>
                  <Input />
                </Form.Item>
                <Form.Item name="fileUrl" hidden>
                  <Input />
                </Form.Item>
                <Form.Item name="categoryId">
                  <Select
                    placeholder="Select Product Category"
                    allowClear
                  >
                    {categories.map(category => <Option key={category.categoryId} value={category.categoryId}>{category.name}</Option>)}
                  </Select>
                </Form.Item>
                <Form.Item >
                  <Upload onChange={handleChange} customRequest={dummyRequest}>
                    <Button icon={<InboxOutlined />}>Upload Product Image</Button>
                  </Upload>
                </Form.Item>
                <Form.Item >
                  <Upload onChange={handleChangePdf} customRequest={dummyRequest}>
                    <Button icon={<InboxOutlined />}>Upload pdf file</Button>
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
        </Modal>
        {/* Update product modal end */}

      </div>
    </>
  );
}

export default connect(mapStateToProps)(ProductPage)
