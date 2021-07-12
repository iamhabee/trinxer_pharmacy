import React, { useEffect, useState } from "react";
import { Table, Form, Button, Input, Modal, Space } from 'antd';


import { connect } from "react-redux";
// components

const mapStateToProps =({dispatch, office}) =>({
  dispatch,
  offices:office.offices,
  loading:office.loading
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

function OfficePage({dispatch, offices, loading}) {

  const [addModal, setAddModal] = useState(false)
  const [editOffice, setEditOffice] = useState(false)
  const [form] = Form.useForm();
  const [forms] = Form.useForm();

  useEffect(() => {
    dispatch({
      type:"office/ALL_OFFICES"
    })
    dispatch({
      type:"user/CURRENT_USER"
    })
  }, [])

  const onFinish = (val) => {
    dispatch({
      type:'office/CREATE_OFFICE',
      payload:val
    })
    setAddModal(false)
    form.resetFields()
  }

  const onFinishEdit = (val) => {
    dispatch({
      type:'office/UPDATE_OFFICE',
      payload:val
    })
    setEditOffice(false)
    forms.resetFields()
  }

  const handleEdit = (value) =>{
    setEditOffice(true)
    forms.setFieldsValue({
      officeName: value.officeName,
      address: value.address,
      contactName: value.contactName,
      contactPhone: value.contactPhone,
      officeId: value.officeId,
    })
  }

  const columns = [
    {
      title: 'Office Name',
      dataIndex: 'officeName',
      key: 'officeName',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Office Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Contact Name',
      dataIndex: 'contactName',
      key: 'contactName',
    },
    {
      title: 'Contact Phone',
      dataIndex: 'contactPhone',
      key: 'contactPhone',
    },
    {
      title: 'Created Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: text => new Date(text).toDateString(),
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

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <div className="relative flex flex-col px-5 min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-xl font-bold">All Offices</h6>
                <button
                  className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={()=>setAddModal(true)}
                >
                  Create New Office
                </button>
              </div>
              <Table columns={columns} loading={loading} dataSource={offices} rowKey="officeId" />
            </div>
          </div>
        </div>
        {/* Add Office modal start */}
        <Modal
          title="Create New Office"
          centered
          footer={null}
          onCancel={()=>setAddModal(false)}
          visible={addModal}
        >
          <div className="card">
            <div className="card-body">
              <Form form={form} onFinish={onFinish} {...layout}>
                <Form.Item label="Office Name" name="officeName" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="Office Address" name="address" rules={[{ required: true }]}>
                  <Input.TextArea />
                </Form.Item>
                <Form.Item label="Contact Name" name="contactName" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="Contact Number" name="contactPhone" rules={[{ required: true }]}>
                  <Input />
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
        {/* Add Office modal end */}

        {/* Update Office modal start */}
        <Modal
          title="Update Office"
          centered
          footer={null} 
          onCancel={()=>setEditOffice(false)}
          visible={editOffice}
        >
          <div className="card">
            <div className="card-body">
              <Form form={forms} {...layout} onFinish={onFinishEdit}>
                <Form.Item label="Office Name" name="officeName" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="Office Address" name="address" rules={[{ required: true }]}>
                  <Input.TextArea />
                </Form.Item>
                <Form.Item label="Contact Name" name="contactName" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="Contact Number" name="contactPhone" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="oficeId" hidden>
                  <Input />
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
        {/* Update Office modal end */}

      </div>
    </>
  );
}

export default connect(mapStateToProps)(OfficePage)
