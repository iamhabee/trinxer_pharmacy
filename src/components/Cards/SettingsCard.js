import React, { useState } from "react";
import {Form, Input, Button, Card, Upload, Space} from 'antd'
import { connect } from "react-redux";
import { InboxOutlined} from '@ant-design/icons'
import { imageUrl } from "services/axios";

// components

const mapStateToProps =({dispatch, setting}) =>({
  dispatch,
  about:setting.about,
  contact:setting.contact,
  header:setting.header,
  loading:setting.loading
})
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 10,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 10,
  },
};
function SettingsCard({dispatch, about, header, contact, loading}) {
  const [form] = Form.useForm();
  const [editAboutSetting, setEditAboutSetting] = useState(false)
  const [editContactSetting, setEditContactSetting] = useState(false)
  const [editHeaderSetting, setEditHeaderSetting] = useState(false)
  const [file, setFile] = useState("")

  const onFinishUpdateHeader = (value) =>{
    const fd = new FormData();
    fd.append('id', value.id)
    fd.append('text', value.text)
    fd.append('caption', value.caption)
    fd.append('image', file);
		dispatch({
      type:"setting/UPDATE_HEADER",
      payload:fd
    })
	}

  const onFinishUpdateAbout = (value) =>{
    const fd = new FormData();
    fd.append('id', value.id)
    fd.append('mission', value.mission)
    fd.append('vision', value.vision)
    fd.append('about', value.about)
    fd.append('aboutImagePath', value.aboutImagePath)
    fd.append('image', file);
		dispatch({
      type:"setting/UPDATE_ABOUT",
      payload:fd
    })
	}

  const onFinishUpdateContact = (value) =>{
		dispatch({
      type:"setting/UPDATE_CONTACT",
      payload:value
    })
	}

  const handleEditHeaderState = (value) =>{
    setEditHeaderSetting(value)
  }

  const handleEditAboutState = (value) =>{
    setEditAboutSetting(value)
  }

  const handleEditContactState = (value) =>{
    setEditContactSetting(value)
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

  return (
    <>
      <div className="relative flex flex-col px-5 min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Content Management Settings</h6>
          </div>
          <Space direction="vertical" style={{width:"100%"}}>
            <Card
              loading={loading}
              title="Home Header"
              extra={
                <button
                  className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={()=>handleEditHeaderState(!editHeaderSetting)}
                >
                  <i className={`fas fa-${editHeaderSetting? "eye":"pencil-alt"} mr-2 text-sm text-blueGray-100`}></i>
                  {editHeaderSetting ? "View ":"Edit "}
                  Home Content
                </button>
              }>
              {editHeaderSetting?
              <Form
                onFinish={onFinishUpdateHeader}
                form={form} {...layout}
                initialValues={{caption:header.headerCaption, text:header.headerText, id:"1"}}>
                <Form.Item name="caption" label="Header Caption">
                  <Input /> 
                </Form.Item>
                <Form.Item name="text" label="Header Text">
                  <Input />
                </Form.Item>
                <Form.Item name="id" hidden>
                  <Input />
                </Form.Item>
                <Form.Item label="Upload Image">
                  <Upload onChange={handleChange} customRequest={dummyRequest}>
                    <Button icon={<InboxOutlined />}>Upload Image</Button>
                  </Upload>
                </Form.Item>
                <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Update
                  </Button>
                </Form.Item>
              </Form>:
              <div className="flex flex-wrap">
                <div className="w-full lg:w-4/12 md:w-4/12">
                  <img alt="example" src={`${imageUrl}settings/${header.headerImagePath}`}/>
                </div>
                <div className="w-full lg:w-8/12 md:w-8/12">
                  <h3 className="text-blueGray-700 text-lg">Header Caption</h3>
                  <p className="text-blueGray-700 text-xl font-bold">{header.headerCaption}</p>
                  <h3 className="text-blueGray-700 text-lg">Header Text</h3>
                  <p className="text-blueGray-700 text-xl font-bold">{header.headerText}</p>
                </div>
              </div>}
            </Card>
            <Card
              loading={loading}
              title="About Us Content"
              extra={
                <button
                  className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={()=>handleEditAboutState(!editAboutSetting)}
                >
                  <i className={`fas fa-${editAboutSetting? "eye":"pencil-alt"} mr-2 text-sm text-blueGray-100`}></i>
                  {editAboutSetting ? "View ":"Edit "}
                  About Content
                </button>
              }>
              {editAboutSetting?
              <Form
                onFinish={onFinishUpdateAbout}
                form={form} {...layout}
                initialValues={{about:about.aboutUs, mission:about.mission, vision:about.vision, aboutImagePath:about.aboutImagePath, id:"1"}}>
                <Form.Item name="about" label="About Us">
                  <Input.TextArea /> 
                </Form.Item>
                <Form.Item name="mission" label="Our Value">
                  <Input.TextArea />
                </Form.Item>
                <Form.Item name="vision" label="Our Purpose">
                  <Input.TextArea />
                </Form.Item>
                <Form.Item name="aboutImagePath" hidden>
                  <Input />
                </Form.Item>
                <Form.Item name="id" hidden>
                  <Input />
                </Form.Item>
                <Form.Item label="Upload Image">
                  <Upload onChange={handleChange} customRequest={dummyRequest}>
                    <Button icon={<InboxOutlined />}>Upload Image</Button>
                  </Upload>
                </Form.Item>
                <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Update
                  </Button>
                </Form.Item>
              </Form>:
              <div className="flex flex-wrap">
                <div className="w-full lg:w-8/12 md:w-8/12">
                  <h3 className="text-blueGray-700 text-lg">About Us</h3>
                  <p className="text-blueGray-700 text-xl font-bold">{about.aboutUs}</p>
                  <h3 className="text-blueGray-700 text-lg">Our Mission</h3>
                  <p className="text-blueGray-700 text-xl font-bold">{about.mission}</p>
                  <h3 className="text-blueGray-700 text-lg">Our Vision</h3>
                  <p className="text-blueGray-700 text-xl font-bold">{about.vision}</p>
                </div>
                <div className="w-full lg:w-4/12 md:w-4/12">
                  <img alt="example" src={`${imageUrl}settings/${about.aboutImagePath}`}/>
                </div>
              </div>}
            </Card>
            <Card
              loading={loading}
              title="Contact Us Content"
              extra={
                <button
                  className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={()=>handleEditContactState(!editContactSetting)}
                >
                  <i className={`fas fa-${editContactSetting? "eye":"pencil-alt"} mr-2 text-sm text-blueGray-100`}></i>
                  {editContactSetting ? "View ":"Edit "}
                  Contact Details
                </button>
              }>
              {editContactSetting?
              <Form
                onFinish={onFinishUpdateContact}
                form={form} {...layout}
                initialValues={{email:contact.contactEmail, address:contact.contactAddress, name:contact.contactName, phone:about.contactPhone, id:"1"}}>
                <Form.Item name="name" label="Contact Name">
                  <Input />
                </Form.Item>
                <Form.Item name="email" label="E-mail">
                  <Input /> 
                </Form.Item>
                <Form.Item name="address" label="Address">
                  <Input />
                </Form.Item>
                <Form.Item name="phone" label="Phone">
                  <Input />
                </Form.Item>
                <Form.Item name="id" hidden>
                  <Input />
                </Form.Item>
                <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Update
                  </Button>
                </Form.Item>
              </Form>:
              <div>
                <h3 className="text-blueGray-700 text-lg">Contact Name</h3>
                <p className="text-blueGray-700 text-xl font-bold">{contact.contactName}</p>
                <h3 className="text-blueGray-700 text-lg">Contact Email</h3>
                <p className="text-blueGray-700 text-xl font-bold">{contact.contactEmail}</p>
                <h3 className="text-blueGray-700 text-lg">COntact Address</h3>
                <p className="text-blueGray-700 text-xl font-bold">{contact.contactAddress}</p>
                <h3 className="text-blueGray-700 text-lg">Contact Phone Number</h3>
                <p className="text-blueGray-700 text-xl font-bold">{contact.contactPhone}</p>
              </div>}
            </Card>
          </Space>
        </div>
      </div>
    </>
  );
}

export default connect(mapStateToProps)(SettingsCard)