import React, { useState } from "react";
import {Form, Input, Button, Card, Upload, Space} from 'antd'
import { connect } from "react-redux";
import { InboxOutlined} from '@ant-design/icons'
import { imageUrl } from "services/axios";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from 'html-to-draftjs';
import { convertToRaw, EditorState, ContentState } from "draft-js";

// components

const mapStateToProps =({dispatch, setting}) =>({
  dispatch,
  about:setting.about,
  contact:setting.contact,
  header:setting.header,
  whoWeAre:setting.whoWeAre,
  privateLabelling:setting.privateLabelling,
  socialResponsibility:setting.socialResponsibility,
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
const getHtml = editorState => draftToHtml(convertToRaw(editorState.getCurrentContent()));
function SettingsCard({dispatch, about, header, contact, loading, whoWeAre, privateLabelling, socialResponsibility}) {
  console.log(privateLabelling, socialResponsibility)
  const [form] = Form.useForm();
  const [editor, setEditor] = useState("")
  const [editWhoWeAre, setEditWhoWeAre] = useState(false)
  const [editLabelling, setEditLabelling] = useState(false)
  const [editResponsibility, setEditResponsibility] = useState(false)
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

  const onFinishUpdateWhoWeAre = (value) =>{
    const newValue = {
      id:value.id,
      who_we_are: getHtml(editor)
    }
		dispatch({
      type:"setting/UPDATE_WHO_WE_ARE",
      payload:newValue
    })
	}

  const onFinishUpdateLabelling = (value) =>{
    const newValue = {
      id:value.id,
      private_label: getHtml(editor)
    }
		dispatch({
      type:"setting/UPDATE_LABELLING",
      payload:newValue
    })
	}

  const onFinishUpdateResponsibility = (value) =>{
    const newValue = {
      id:value.id,
      social_res: getHtml(editor)
    }
		dispatch({
      type:"setting/UPDATE_RESPONSIBILITY",
      payload:newValue
    })
	}

  const handleEditHeaderState = (value) =>{
    setEditHeaderSetting(value)
  }

  const handleEditAboutState = (value) =>{
    setEditAboutSetting(value)
  }

  const handleEditWhoWeAreState = (state) =>{
    setEditWhoWeAre(state)
    if(whoWeAre.who_we_are){
      const blocksFromHtml = htmlToDraft(whoWeAre.who_we_are);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      setEditor(EditorState.createWithContent(contentState));
    }
  }

  const handleEditLabellingState = (state) =>{
    setEditLabelling(state)
    if(privateLabelling.private_labelling){
      const blocksFromHtml = htmlToDraft(privateLabelling.private_labelling);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      setEditor(EditorState.createWithContent(contentState));
    }
  }

  const handleEditResponsibilityState = (state) =>{
    setEditResponsibility(state)
    if(socialResponsibility.social_res){
      const blocksFromHtml = htmlToDraft(socialResponsibility.social_res);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      setEditor(EditorState.createWithContent(contentState));
    }
  }

  const handleEditContactState = (value) =>{
    setEditContactSetting(value)
  }

  const onEditorStateChange = editorState => {
    setEditor(editorState);
  };

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
                  <h3 className="text-blueGray-700 text-lg">About Us caption</h3>
                  <p className="text-blueGray-700 text-xl font-bold">{about.aboutUs}</p>
                  <h3 className="text-blueGray-700 text-lg">Our Value</h3>
                  <p className="text-blueGray-700 text-xl font-bold">{about.mission}</p>
                  <h3 className="text-blueGray-700 text-lg">Our Purpose</h3>
                  <p className="text-blueGray-700 text-xl font-bold">{about.vision}</p>
                </div>
                <div className="w-full lg:w-4/12 md:w-4/12">
                  <img alt="example" src={`${imageUrl}settings/${about.aboutImagePath}`}/>
                </div>
              </div>}
            </Card>
            
            {/* who we are */}
            <Card
              loading={loading}
              title="Who we are Content"
              extra={
                <button
                  className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={()=>handleEditWhoWeAreState(!editWhoWeAre)}
                >
                  <i className={`fas fa-${editWhoWeAre? "eye":"pencil-alt"} mr-2 text-sm text-blueGray-100`}></i>
                  {editWhoWeAre ? "View ":"Edit "}
                  Who we are
                </button>
              }>
              {editWhoWeAre?
              <Form
                onFinish={onFinishUpdateWhoWeAre}
                form={form}
                initialValues={{id:whoWeAre.id}}>
                <Form.Item name="who_we_are" label="Who We Are">
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
                <h3 className="text-blueGray-700 text-lg">Who We Are</h3>
                <p className="text-blueGray-700 text-xl font-bold" dangerouslySetInnerHTML={{__html: whoWeAre.who_we_are}} />
              </div>}
            </Card>

            {/* private labelling */}
            <Card
              loading={loading}
              title="Private Labelling Content"
              extra={
                <button
                  className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={()=>handleEditLabellingState(!editLabelling)}
                >
                  <i className={`fas fa-${editLabelling? "eye":"pencil-alt"} mr-2 text-sm text-blueGray-100`}></i>
                  {editLabelling ? "View ":"Edit "}
                  Private Labelling
                </button>
              }>
              {editLabelling?
              <Form
                onFinish={onFinishUpdateLabelling}
                form={form}
                initialValues={{id:privateLabelling.id}}>
                <Form.Item name="private_label" label="Private Label">
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
                <h3 className="text-blueGray-700 text-lg">Private Labelling </h3>
                <p className="text-blueGray-700 text-xl font-bold" dangerouslySetInnerHTML={{__html: privateLabelling.private_labelling}} />
              </div>}
            </Card>

            {/* social responsiblity */}
            <Card
              loading={loading}
              title="Social Responsibility Content"
              extra={
                <button
                  className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={()=>handleEditResponsibilityState(!editResponsibility)}
                >
                  <i className={`fas fa-${editResponsibility? "eye":"pencil-alt"} mr-2 text-sm text-blueGray-100`}></i>
                  {editResponsibility ? "View ":"Edit "}
                  Social Responsibility
                </button>
              }>
              {editResponsibility?
              <Form
                onFinish={onFinishUpdateResponsibility}
                form={form}
                initialValues={{id:socialResponsibility.id}}>
                <Form.Item name="social_res" label="Social Responsibility">
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
                <h3 className="text-blueGray-700 text-lg">Social Responsibility</h3>
                <p className="text-blueGray-700 text-xl font-bold" dangerouslySetInnerHTML={{__html: socialResponsibility.social_res}} />
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