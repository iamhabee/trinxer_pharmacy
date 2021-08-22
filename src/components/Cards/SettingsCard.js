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
    span: 6,
  },
  wrapperCol: {
    span: 12,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 6,
    span: 12,
  },
};
const getHtml = editorState => draftToHtml(convertToRaw(editorState.getCurrentContent()));
function SettingsCard({dispatch, about, header, contact, loading, whoWeAre, privateLabelling, socialResponsibility}) {
  const [form] = Form.useForm();
  const [editor1, setEditor1] = useState("")
  const [editor2, setEditor2] = useState("")
  const [editor3, setEditor3] = useState("")
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
    fd.append('headerImagePath', value.imagePath);
		dispatch({
      type:"setting/UPDATE_HEADER",
      payload:fd
    })
    setFile("")
	}

  const onFinishUpdateAbout = (value) =>{
    const fd = new FormData();
    fd.append('id', value.id)
    fd.append('mission', getHtml(editor1))
    fd.append('vision', "")
    fd.append('about', value.about)
    fd.append('aboutImagePath', value.aboutImagePath)
    fd.append('image', file);
		dispatch({
      type:"setting/UPDATE_ABOUT",
      payload:fd
    })
    setFile("")
	}

  const onFinishUpdateContact = (value) =>{
    const fd = new FormData();
    fd.append('id', value.id)
    fd.append('name', value.name)
    fd.append('email', value.email)
    fd.append('address', value.address)
    fd.append('phone', value.phone)
    fd.append('facebook', value.facebook)
    fd.append('instagram', value.instagram)
    fd.append('twitter', value.twitter)
    fd.append('linkedIn', value.linkedIn)
    fd.append('imageUrl', value.imageUrl)
    fd.append('image', file);
		dispatch({
      type:"setting/UPDATE_CONTACT",
      payload:fd
    })
    setFile("")
	}

  const onFinishUpdateWhoWeAre = (value) =>{
    const fd = new FormData();
    fd.append('id', value.id)
    fd.append('description', "")
    fd.append('who_we_are', getHtml(editor))
    fd.append('image', file);
    fd.append('imageUrl', value.imageUrl);
		dispatch({
      type:"setting/UPDATE_WHO_WE_ARE",
      payload:fd
    })
    setFile("")
	}

  const onFinishUpdateLabelling = (value) =>{
    const fd = new FormData();
    fd.append('id', value.id)
    fd.append('imageUrl', value.imageUrl)
    fd.append('description', value.description)
    fd.append('private_video_url', value.private_video_url)
    fd.append('private_label', getHtml(editor2))
    fd.append('image', file);
		dispatch({
      type:"setting/UPDATE_LABELLING",
      payload:fd
    })
    setFile("")
	}

  const onFinishUpdateResponsibility = (value) =>{
    const fd = new FormData();
    fd.append('id', value.id)
    fd.append('imageUrl', value.imageUrl)
    fd.append('description', value.description)
    fd.append('social_res', getHtml(editor3))
    fd.append('image', file);
		dispatch({
      type:"setting/UPDATE_RESPONSIBILITY",
      payload:fd
    })
    setFile("")
	}

  const handleEditHeaderState = (value) =>{
    setEditHeaderSetting(value)
  }

  const handleEditAboutState = (value) =>{
    setEditAboutSetting(value)
    if(about.mission){
      const blocksFromHtml = htmlToDraft(about.mission);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      setEditor1(EditorState.createWithContent(contentState));
    }
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
      setEditor2(EditorState.createWithContent(contentState));
    }
  }

  const handleEditResponsibilityState = (state) =>{
    setEditResponsibility(state)
    if(socialResponsibility.social_res){
      const blocksFromHtml = htmlToDraft(socialResponsibility.social_res);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      setEditor3(EditorState.createWithContent(contentState));
    }
  }

  const handleEditContactState = (value) =>{
    setEditContactSetting(value)
  }

  const onEditorStateChange = editorState => {
    setEditor(editorState);
  };
  const onEditorAboutStateChange = editorState => {
    setEditor1(editorState);
  };
  const onEditorLabelStateChange = editorState => {
    setEditor2(editorState);
  };
  const onEditorResponsibiltyStateChange = editorState => {
    setEditor3(editorState);
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
                {...layout}
                initialValues={{caption:header.headerCaption, text:header.headerText, id:"1", imagePath:header.headerImagePath}}>
                <Form.Item name="caption" label="Header Caption">
                  <Input /> 
                </Form.Item>
                <Form.Item name="text" label="Header Text">
                  <Input />
                </Form.Item>
                <Form.Item name="id" hidden>
                  <Input />
                </Form.Item>
                <Form.Item name="imagePath" hidden>
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
              <div>
                  <img alt="image" style={{height:200}} src={`${imageUrl}settings/${header.headerImagePath}`}/>
                  <h3 className="text-blueGray-700 text-xl font-bold">Header Caption</h3>
                  <p className="text-blueGray-700 text-sm">{header.headerCaption}</p>
                  <h3 className="text-blueGray-700 text-xl font-bold">Header Text</h3>
                  <p className="text-blueGray-700 text-sm capitalize">{header.headerText}</p>
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
                initialValues={{about:about.aboutUs, mission:about.mission, vision:about.vision, aboutImagePath:about.aboutImagePath, id:"1"}}>
                <Form.Item name="about" label="About Us">
                  <Input.TextArea /> 
                </Form.Item>
                <Form.Item name="mission" label="Purpose and Value">
                  <Editor
                    editorState={editor1}
                    editorClassName="px-3 border border-gray-1"
                    editorStyle={{
                        height: 200,
                        overflow:'auto',
                    }}
                    onEditorStateChange={onEditorAboutStateChange}
                  />
                </Form.Item>
                {/* <Form.Item name="vision" label="Our Purpose">
                  <Input.TextArea />
                </Form.Item> */}
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
                <Form.Item >
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Update
                  </Button>
                </Form.Item>
              </Form>:
              <div>
                  <img alt="example" style={{height:200}} src={`${imageUrl}settings/${about.aboutImagePath}`}/>
                  <h3 className="text-blueGray-700 text-xl font-bold mt-5">About Us caption</h3>
                  <p className="text-blueGray-700 text-sm">{about.aboutUs}</p>
                  <div className="text-blueGray-700 text-sm mt-5" dangerouslySetInnerHTML={{__html: about.mission}}/>
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
                initialValues={{id:whoWeAre.id, imageUrl:whoWeAre.who_we_are_image}}>
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
                <Form.Item name="imageUrl" hidden>
                  <Input />
                </Form.Item>
                <Form.Item label="Upload Image">
                  <Upload onChange={handleChange} customRequest={dummyRequest}>
                    <Button icon={<InboxOutlined />}>Upload Image</Button>
                  </Upload>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Update
                  </Button>
                </Form.Item>
              </Form>:
              <div>
                <img alt="image" style={{height:200}} src={`${imageUrl}settings/${whoWeAre.who_we_are_image}`}/>
                <p className="text-blueGray-700 text-sm" dangerouslySetInnerHTML={{__html: whoWeAre.who_we_are}} />
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
                initialValues={{id:privateLabelling.id, description:privateLabelling.private_labelling_description, imageUrl:privateLabelling.private_labelling_image, private_video_url:privateLabelling.private_video_url}}>
                <Form.Item name="private_label" label="Private Label">
                  <Editor
                    editorState={editor2}
                    editorClassName="px-3 border border-gray-1"
                    editorStyle={{
                        height: 200,
                        overflow:'auto',
                    }}
                    onEditorStateChange={onEditorLabelStateChange}
                  />
                </Form.Item>
                <Form.Item name="description" label="Short description">
                  <Input />
                </Form.Item>
                <Form.Item name="private_video_url" label="Video Url">
                  <Input />
                </Form.Item>
                <Form.Item name="imageUrl" hidden>
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
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Update
                  </Button>
                </Form.Item>
              </Form>:
              <div>
                <img alt="image" style={{height:200}} src={`${imageUrl}settings/${privateLabelling.private_labelling_image}`} className="mb-5"/>
                <iframe width="250" height="200" src={`https://www.youtube.com/embed/${privateLabelling.private_video_url}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <h3 className="text-blueGray-700 text-xl font-bold">Short Description</h3>
                <p className="text-blueGray-700 text-sm">{privateLabelling.private_labelling_description}</p>
                <h3 className="text-blueGray-700 text-xl font-bold">Private Labelling </h3>
                <p className="text-blueGray-700 text-sm" dangerouslySetInnerHTML={{__html: privateLabelling.private_labelling}} />
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
                initialValues={{id:socialResponsibility.id, description:socialResponsibility.social_res_description, imageUrl:socialResponsibility.social_res_image}}>
                <Form.Item name="social_res" label="Social Responsibility">
                  <Editor
                    editorState={editor3}
                    editorClassName="px-3 border border-gray-1"
                    editorStyle={{
                        height: 200,
                        overflow:'auto',
                    }}
                    onEditorStateChange={onEditorResponsibiltyStateChange}
                  />
                </Form.Item>
                <Form.Item name="description" label="Short description">
                  <Input />
                </Form.Item>
                <Form.Item name="id" hidden>
                  <Input />
                </Form.Item>
                <Form.Item name="imageUrl" hidden>
                  <Input />
                </Form.Item>
                <Form.Item label="Upload Image">
                  <Upload onChange={handleChange} customRequest={dummyRequest}>
                    <Button icon={<InboxOutlined />}>Upload Image</Button>
                  </Upload>
                </Form.Item>
                <Form.Item >
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Update
                  </Button>
                </Form.Item>
              </Form>:
              <div>
                <img alt="image" style={{height:200}} src={`${imageUrl}settings/${socialResponsibility.social_res_image}`}/>
                <h3 className="text-blueGray-700 text-xl font-bold">Short Description</h3>
                <p className="text-blueGray-700 text-sm">{socialResponsibility.social_res_description}</p>
                <h3 className="text-blueGray-700 text-xl font-bold">Social Responsibility</h3>
                <p className="text-blueGray-700 text-sm" dangerouslySetInnerHTML={{__html: socialResponsibility.social_res}} />
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
                initialValues={{email:contact.contactEmail, address:contact.contactAddress, name:contact.contactName, phone:contact.contactPhone, id:"1", imageUrl:contact.contactImage, facebook:contact.facebook, twitter:contact.twitter, instagram:contact.instagram, linkedIn:contact.linkedIn}}>
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
                <Form.Item name="facebook" label="Facebook url">
                  <Input />
                </Form.Item>
                <Form.Item name="twitter" label="Twitter url">
                  <Input />
                </Form.Item>
                <Form.Item name="instagram" label="Instagram url">
                  <Input />
                </Form.Item>
                <Form.Item name="linkedIn" label="Linkedin url">
                  <Input />
                </Form.Item>
                <Form.Item name="id" hidden>
                  <Input />
                </Form.Item>
                <Form.Item name="imageUrl" hidden>
                  <Input />
                </Form.Item>
                <Form.Item label="Upload Image">
                  <Upload onChange={handleChange} customRequest={dummyRequest}>
                    <Button icon={<InboxOutlined />}>Upload Image</Button>
                  </Upload>
                </Form.Item>
                <Form.Item >
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Update
                  </Button>
                </Form.Item>
              </Form>:
              <div>
                <img alt="image" style={{height:200}} src={`${imageUrl}settings/${contact.contact_image}`}/>
                <h3 className="text-blueGray-700 text-xl font-bold">Contact Name</h3>
                <p className="text-blueGray-700 text-sm">{contact.contactName}</p>
                <h3 className="text-blueGray-700 text-xl font-bold">Contact Email</h3>
                <p className="text-blueGray-700 text-sm">{contact.contactEmail}</p>
                <h3 className="text-blueGray-700 text-xl font-bold">COntact Address</h3>
                <p className="text-blueGray-700 text-sm">{contact.contactAddress}</p>
                <h3 className="text-blueGray-700 text-xl font-bold">Contact Phone Number</h3>
                <p className="text-blueGray-700 text-sm">{contact.contactPhone}</p>
                <h3 className="text-blueGray-700 text-xl font-bold">Social Media</h3>
                <a target="_blank" href={contact.facebook}><i className="fab fa-facebook-square"></i>Facebook</a>&nbsp; &nbsp;
                <a target="_blank" href={contact.twitter}><i className="fab fa-twitter"></i> Twitter</a>&nbsp; &nbsp;
                <a target="_blank" href={contact.linkedIn}><i className="fab fa-linkedin"></i>linkedin</a>&nbsp; &nbsp;
                <a target="_blank" href={contact.instagram}><i className="fab fa-instagram"></i>instagram</a>
              </div>}
            </Card>
          </Space>
        </div>
      </div>
    </>
  );
}

export default connect(mapStateToProps)(SettingsCard)