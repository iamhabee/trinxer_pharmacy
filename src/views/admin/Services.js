import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { List, Avatar, Button, Input, Modal, Form } from 'antd';

const mapStateToProps =({dispatch, service}) =>({
  dispatch,
  services:service.services,
  loading:service.loading
})

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

function ServicesPage({dispatch, loading, services}) {
  const [addModal, setAddModal] = useState(false)
  const [editRole, setEditRole] = useState(false)
  const [form] = Form.useForm();
  const [forms] = Form.useForm();
  useEffect(() => {
    dispatch({
      type:"user/CURRENT_USER"
    })
    dispatch({
      type:"service/ALL_SERVICES"
    })
  }, [])

  const onFinish = (val) => {
    dispatch({
      type:'service/CREATE_SERVICE',
      payload:val
    })
    setAddModal(false)
    form.resetFields()
  }

  const onFinishEdit = (val) => {
    dispatch({
      type:'service/UPDATE_SERVICE',
      payload:val
    })
    setEditRole(false)
    forms.resetFields()
  }

  const handleEdit = (value) =>{
    setEditRole(true)
    forms.setFieldsValue({
      name: value.serviceName,
      description: value.serviceDescription,
      serviceId: value.serviceId
    })
  }

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <div className="relative flex flex-col px-5 min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-xl font-bold">Our Services</h6>
                <button
                  className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={()=>setAddModal(true)}
                >
                  Create New Service
                </button>
              </div>
              <List
                loading={loading}
                itemLayout="horizontal"
                dataSource={services}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar style={{backgroundColor:"orange"}}>{item.serviceName.slice(0,1)}</Avatar>}
                      title={<a href="#" onClick={()=>handleEdit(item)}>{item.serviceName}</a>}
                      description={item.serviceDescription}
                    />
                  </List.Item>
                )}
              />
            </div>
          </div>
        </div>
        {/* Add Role modal start */}
        <Modal
          title="Create Service"
          centered
          footer={null} 
          onCancel={()=>setAddModal(false)}
          visible={addModal}
        >
          <div className="card">
            <div className="card-body">
              <Form form={form} onFinish={onFinish} {...layout}>
                <Form.Item label="Service Name" name="name" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="Service Description" name="description" rules={[{ required: true }]}>
                  <Input.TextArea  />
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
        {/* Add service modal end */}

        {/* Update service modal start */}
        <Modal
          title="Update Service"
          centered
          footer={null} 
          onCancel={()=>setEditRole(false)}
          visible={editRole}
        >
          <div className="card">
            <div className="card-body">
              <Form form={forms} {...layout} onFinish={onFinishEdit}>
                <Form.Item label="Service Name" name="name" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="Service Description" name="description" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="serviceId" hidden>
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
        {/* Update Role modal end */}
      </div>
    </>
  );
}

export default connect(mapStateToProps)(ServicesPage)
