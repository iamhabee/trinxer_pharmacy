import React, { useEffect, useState } from "react";
import { Table, Form, Button, Upload, Input, Modal, Space, Select, Pagination } from 'antd';
import { InboxOutlined, ExclamationCircleOutlined} from '@ant-design/icons'


import { connect } from "react-redux";
import { imageUrl } from "services/axios";
// components

const mapStateToProps =({dispatch, category, product}) =>({
  dispatch,
  categories:category.categories,
  products:product.products,
  loading:product.loading
})

const layout = {
  labelCol: {
    span: 9,
  },
  wrapperCol: {
    span: 14,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 9,
    span: 14,
  },
};

function ProductPage({dispatch, categories, products, loading}) {

  const [addModal, setAddModal] = useState(false)
  const [editProduct, setEditProduct] = useState(false)
  const [file, setFile] = useState("")
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
    fd.append('detail', val.detail)
    fd.append('name', val.name)
    fd.append('description', val.description)
    fd.append('categoryId', val.categoryId)
    fd.append('image', file);
    dispatch({
      type:'product/CREATE_PRODUCT',
      payload:fd
    })
    setFile("")
    setAddModal(false)
    form.resetFields()
  }

  const onFinishEdit = (val) => {
    const fd = new FormData();
    fd.append('detail', val.detail)
    fd.append('name', val.name)
    fd.append('description', val.description)
    fd.append('categoryId', val.categoryId)
    fd.append('productId', val.productId)
    fd.append('image', file);
    fd.append('imageUrl', val.imageUrl);
    dispatch({
      type:'product/UPDATE_PRODUCT',
      payload:fd
    })
    setFile("")
    setEditProduct(false)
    forms.resetFields()
  }

  const handleEdit = (value) =>{
    setEditProduct(true)
    forms.setFieldsValue({
      name: value.name,
      description: value.description,
      categoryId: value.categoryId,
      productId: value.productId,
      detail: value.detail,
      imageUrl: value.imageUrl,
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
      payload:{limit:20, offset:page * 20}
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

  const dummyRequest = ({onSuccess}) =>{
    setTimeout(()=>{
      onSuccess("ok");
    }, 0)
  }

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
                responsive={true}
                defaultCurrent={1}
                onChange={handlePagination}
                defaultPageSize={20}
              />
            </div>
          </div>
        </div>
        {/* Add Role modal start */}
        <Modal
          title="Create New Product"
          centered
          footer={null}
          onCancel={()=>setAddModal(false)}
          visible={addModal}
        >
          <div className="card">
            <div className="card-body">
              <Form form={form} onFinish={onFinish} {...layout}>
                <Form.Item label="Product Name" name="name" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="Product Description" name="description" rules={[{ required: true }]}>
                  <Input.TextArea />
                </Form.Item>
                <Form.Item label="Product Details" name="detail" rules={[{ required: true }]}>
                  <Input.TextArea />
                </Form.Item>
                <Form.Item label="Category Name" name="categoryId">
                  <Select
                    placeholder="Select Category Name"
                    allowClear
                  >
                    {categories.map(category => <Option key={category.categoryId} value={category.categoryId}>{category.name}</Option>)}
                  </Select>
                </Form.Item>
                <Form.Item label="Upload">
                  <Upload onChange={handleChange} customRequest={dummyRequest}>
                    <Button icon={<InboxOutlined />}>Upload Product Image</Button>
                  </Upload>
                </Form.Item>
                <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Create
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </Modal>
        {/* Add Role modal end */}

        {/* Update category modal start */}
        <Modal
          title="Update Product"
          centered
          footer={null} 
          onCancel={()=>setEditProduct(false)}
          visible={editProduct}
        >
          <div className="card">
            <div className="card-body">
              <Form form={forms} {...layout} onFinish={onFinishEdit}>
                <Form.Item label="Product Name" name="name" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="Product Description" name="description" rules={[{ required: true }]}>
                  <Input.TextArea />
                </Form.Item>
                <Form.Item label="Product Detail" name="detail" rules={[{ required: true }]}>
                  <Input.TextArea />
                </Form.Item>
                <Form.Item name="productId" hidden>
                  <Input />
                </Form.Item>
                <Form.Item name="imageUrl" hidden>
                  <Input />
                </Form.Item>
                <Form.Item label="Category" name="categoryId">
                  <Select
                    placeholder="Select Product Category"
                    allowClear
                  >
                    {categories.map(category => <Option key={category.categoryId} value={category.categoryId}>{category.name}</Option>)}
                  </Select>
                </Form.Item>
                <Form.Item label="Upload">
                  <Upload onChange={handleChange} customRequest={dummyRequest}>
                    <Button icon={<InboxOutlined />}>Upload Product Image</Button>
                  </Upload>
                </Form.Item>
                <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Update
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </Modal>
        {/* Update Role modal end */}

      </div>
    </>
  );
}

export default connect(mapStateToProps)(ProductPage)
