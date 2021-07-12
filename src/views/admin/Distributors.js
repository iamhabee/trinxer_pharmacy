import React, { useEffect, useState } from "react";
import { Table, Form, Button, Input, Modal, Space } from 'antd';


import { connect } from "react-redux";
// components

const mapStateToProps =({dispatch, distributor}) =>({
  dispatch,
  distributors:distributor.distributors,
  loading:distributor.loading
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

function DistributorPage({dispatch, distributors, loading}) {

  const [addModal, setAddModal] = useState(false)
  const [editDistributor, setEditDistributor] = useState(false)
  const [form] = Form.useForm();
  const [forms] = Form.useForm();

  useEffect(() => {
    dispatch({
      type:"distributor/ALL_DISTRIBUTORS"
    })
    dispatch({
      type:"user/CURRENT_USER"
    })
  }, [])

  const onFinish = (val) => {
    dispatch({
      type:'distributor/CREATE_DISTRIBUTOR',
      payload:val
    })
    setAddModal(false)
    form.resetFields()
  }

  const onFinishEdit = (val) => {
    dispatch({
      type:'distributor/UPDATE_DISTRIBUTOR',
      payload:val
    })
    setEditDistributor(false)
    forms.resetFields()
  }

  const handleEdit = (value) =>{
    setEditDistributor(true)
    forms.setFieldsValue({
      name: value.name,
      address: value.address,
      contactName: value.contactName,
      contactPhone: value.contactPhone,
      distributorId: value.distributorId,
    })
  }

  const columns = [
    {
      title: 'Company Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Dist Address',
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
                <h6 className="text-blueGray-700 text-xl font-bold">All Distributors</h6>
                <button
                  className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={()=>setAddModal(true)}
                >
                  Create New Distributors
                </button>
              </div>
              <Table columns={columns} loading={loading} dataSource={distributors} rowKey="officeId" />
            </div>
          </div>
        </div>
        {/* Add Distributor modal start */}
        <Modal
          title="Create New Distributors"
          centered
          footer={null}
          onCancel={()=>setAddModal(false)}
          visible={addModal}
        >
          <div className="card">
            <div className="card-body">
              <Form form={form} onFinish={onFinish} {...layout}>
                <Form.Item label="Company Name" name="name" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="Dist Address" name="address" rules={[{ required: true }]}>
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
        {/* Add Distributor modal end */}

        {/* Update Distributor modal start */}
        <Modal
          title="Update Distributor"
          centered
          footer={null} 
          onCancel={()=>setEditDistributor(false)}
          visible={editDistributor}
        >
          <div className="card">
            <div className="card-body">
              <Form form={forms} {...layout} onFinish={onFinishEdit}>
                <Form.Item label="Company Name" name="name" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="Dist Address" name="address" rules={[{ required: true }]}>
                  <Input.TextArea />
                </Form.Item>
                <Form.Item label="Contact Name" name="contactName" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="Contact Number" name="contactPhone" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="distributorId" hidden>
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
        {/* Update Distributor modal end */}

      </div>
    </>
  );
}

export default connect(mapStateToProps)(DistributorPage)
