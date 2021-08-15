import React, { useEffect, useState } from "react";
import { Table, Form, Button, Input, Modal, Space, Switch, Select } from 'antd';

import { connect } from "react-redux";
// components

const mapStateToProps =({dispatch, category}) =>({
  dispatch,
  categories:category.categories,
  parentCategories:category.parentCategories,
  loading:category.loading
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

function CategoryPage({dispatch, categories, parentCategories, loading}) {

  const [addModal, setAddModal] = useState(false)
  const [editCategory, setEditCategory] = useState(false)
  const [createParentCat, setCreateParentCat] = useState(true)
  const [createParentCatEdit, setCreateParentCatEdit] = useState(false)
  const [form] = Form.useForm();
  const [forms] = Form.useForm();
  const {Option} = Select

  useEffect(() => {
    dispatch({
      type:"category/ALL_CATEGORIES"
    })
    dispatch({
      type:"category/PARENT_CATEGORIES"
    })
    dispatch({
      type:"user/CURRENT_USER"
    })
  }, [])

  const onFinish = (val) => {
    dispatch({
      type:'category/CREATE_CATEGORY',
      payload:val
    })
    setAddModal(false)
    setCreateParentCat(true)
    form.resetFields()
  }

  const onFinishEdit = (val) => {
    const value = {
      name: val.name,
      description: val.description,
      categoryId: val.categoryId,
      parentCategoryId: val.parentCategoryId? val.parentCategoryId:null,
    }
    dispatch({
      type:'category/UPDATE_CATEGORY',
      payload:value
    })
    setEditCategory(false)
    setCreateParentCatEdit(false)
    forms.resetFields()
  }

  const handleEdit = (value) =>{
    setEditCategory(true)
    console.log(value.parentCategoryId)
    if(value.parentCategoryId) {
      setCreateParentCatEdit(true)
    }
    forms.setFieldsValue({
      name: value.name,
      description: value.description,
      categoryId: value.categoryId,
      parentCategoryId: value.parentCategoryId,
    })
  }

  const columns = [
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
      title: 'Type',
      dataIndex: 'parentCategoryId',
      key: 'parentCategoryId',
      render: text => <p>{text? "Sub Category":"Parent Category"}</p>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="ghost" onClick={()=>handleEdit(record)}>Edit </Button>
          {/* <Button type="danger">Delete</Button> */}
        </Space>
      ),
    },
  ];

  const handleChange = (val) =>{
    setCreateParentCat(val)
  }

  const handleChangeEdit = (val) =>{
    setCreateParentCatEdit(val)
  }


  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <div className="relative flex flex-col px-5 min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-xl font-bold">All CAtegories</h6>
                <button
                  className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={()=>setAddModal(true)}
                >
                  Create New Category
                </button>
              </div>
              <Table columns={columns} loading={loading} dataSource={categories} pagination={false} rowKey="categoryId" />
            </div>
          </div>
        </div>
        {/* Add Role modal start */}
        <Modal
          title="Create New Category"
          centered
          footer={null}
          onCancel={()=>setAddModal(false)}
          visible={addModal}
        >
          <div className="card">
            <div className="card-body">
              <Form form={form} onFinish={onFinish} {...layout}>
                <Form.Item label="Category Name" name="name" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="Category Description" name="description" rules={[{ required: true }]}>
                  <Input.TextArea />
                </Form.Item>
                <Form.Item label="Parent Category" hidden={createParentCat} name="parentId">
                  <Select
                    placeholder="Select Parent Category"
                    allowClear
                  >
                    {parentCategories.map(category => <Option key={category.categoryId} value={category.categoryId}>{category.name}</Option>)}
                  </Select>
                </Form.Item>
                <Form.Item label="Create Sub Category">
                  <Switch onChange={()=>handleChange(!createParentCat)} />
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
          title="Update Category"
          centered
          footer={null} 
          onCancel={()=>setEditCategory(false)}
          visible={editCategory}
        >
          <div className="card">
            <div className="card-body">
              <Form form={forms} {...layout} onFinish={onFinishEdit}>
                <Form.Item label="Category Name" name="name" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="Category Description" name="description" rules={[{ required: true }]}>
                  <Input.TextArea />
                </Form.Item>
                <Form.Item name="categoryId" hidden>
                  <Input />
                </Form.Item>
                <Form.Item label="Parent Category" hidden={createParentCatEdit} name="parentCategoryId">
                  <Select
                    placeholder="Select Parent Category"
                    allowClear
                  >
                    {parentCategories.map(category => <Option key={category.categoryId} value={category.categoryId}>{category.name}</Option>)}
                  </Select>
                </Form.Item>
                <Form.Item label="Create Sub Category">
                  <Switch defaultChecked={!createParentCatEdit} onChange={()=>handleChangeEdit(!createParentCatEdit)} />
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

export default connect(mapStateToProps)(CategoryPage)
