import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {Form, Input, Button} from 'antd'
import { imageUrl } from "services/axios";
// import Navbar from "components/Navbars/AuthNavbar.js";
// import Footer from "components/Footers/Footer.js";

const mapStateToProps =({dispatch, user}) =>({
  dispatch,
  profile:user.profile,
  loading:user.loading
})

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 6,
    span: 16,
  },
};

function Profile({dispatch, profile, loading}) {

  const [editState, setEditState] = useState(true)
  const [form] = Form.useForm();
  useEffect(() => {
    dispatch({
      type:"user/CURRENT_USER"
    })
  }, [])

  const handleEditState = (value) =>{
    setEditState(value)
  }

  const onFinishUpdate = (value) =>{
		dispatch({
      type:"user/UPDATE_PROFILE",
      payload:value
    })
	}

  return (
    <>
      <div className="flex flex-wrap mt-20">
        <div className="w-full mb-12 px-4">
          <div className="relative flex flex-col px-5 min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="relative">
                    <img
                      alt="..."
                      src={`${imageUrl}admin/${profile.image}`}
                      className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div className="py-6 px-3 mt-32 sm:mt-0">
                    <button
                      className="bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={()=>handleEditState(!editState)}
                    >
                      <i className={`fas fa-${editState? "pencil-alt":"eye"} mr-2 text-sm text-blueGray-100`}></i>
                      {editState ? "Edit":"View"}
                    </button>
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    {/* <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        {profile.BlogPosts && profile.BlogPosts.length}
                      </span>
                      <span className="text-sm text-blueGray-400">
                        Post
                      </span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        0
                      </span>
                      <span className="text-sm text-blueGray-400">
                        Comments
                      </span>
                    </div> */}
                  </div>
                </div>
              </div>
              {editState ?
              <div className="text-center mt-5">
                <h5 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                  {profile.firstName && profile.firstName} {profile.lastName}
                </h5>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold">
                  <i className="fas fa-envelope mr-2 text-lg text-blueGray-400"></i>{" "}
                  {profile.email}
                </div>
                <div className="mb-2 text-blueGray-600 mt-3 text-md font-bold uppercase">
                    <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                    {profile.Role && profile.Role.roleName}
                  </div>
                  <div className="mb-2 text-blueGray-600 text-md font-bold">
                    {/* <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i> */}
                    {profile.Role && profile.Role.roleDescription}
                  </div>
              </div>:
              <div className="text-center mt-12">
                <Form
                  onFinish={onFinishUpdate}
                  form={form} {...layout}
                  initialValues={{email:profile.email, firstName:profile.firstName, lastName:profile.lastName, middleName:profile.middleName}}>
                  <Form.Item name="email" label="E-mail">
                    <Input /> 
                  </Form.Item>
                  <Form.Item name="firstName" label="First Name">
                    <Input />
                  </Form.Item>
                  <Form.Item name="lastName" label="Last Name">
                    <Input />
                  </Form.Item>
                  <Form.Item name="midlleName" label="Middle Name">
                    <Input />
                  </Form.Item>
                  <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                      Update
                    </Button>
                  </Form.Item>
                </Form>
              </div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default connect(mapStateToProps)(Profile)
