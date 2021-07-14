import React, {useState} from "react";
import PropTypes from "prop-types";
import { Input, Modal, Button, Form, Avatar,Upload, Skeleton, Result, Select, Image} from 'antd';
import { ExclamationCircleOutlined, SmileOutlined } from '@ant-design/icons';
import { InboxOutlined} from '@ant-design/icons'
// components

import TableDropdown from "components/Dropdowns/TableDropdown.js";
import { connect } from "react-redux";
import { imageUrl } from "services/axios";

const mapStateToProps = ({dispatch, admin, role}) =>({
  dispatch,
  data:admin.admins,
  loading:admin.loading,
  roles:role.roles,
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

function AdminTable({ color, data, loading, dispatch, roles }) {

  const [showEdit, setShowEdit] = useState(false)
  const [showAdd, setShowAdd] = useState(false)
  const [form] = Form.useForm();
	const {confirm} = Modal;
  const {Option} = Select
  const [file, setFile] = useState("")
  
  const handleEdit = (value) =>{
    setShowEdit(true)
    form.setFieldsValue({
      email: value.email,
      firstName: value.firstName,
      lastName: value.lastName,
      middleName: value.middleName,
      adminId: value.adminId,
      roleId:value.roleId,
      imageUrl:value.image
    })
  }

  const onFinishEdit = (value) =>{
    const fd = new FormData();
    fd.append('adminId', value.adminId)
    fd.append('roleId', value.roleId)
    fd.append('lastName', value.lastName)
    fd.append('firstName', value.firstName)
    fd.append('middleName', value.middleName)
    fd.append('imageUrl', value.imageUrl)
    fd.append('image', file);
		dispatch({
      type:"admin/UPDATE_ADMIN",
      payload:fd
    })
		setShowEdit(false)
    setFile("")
	}

  const onFinishAdd = (value) =>{
    const fd = new FormData();
    fd.append('roleId', value.roleId)
    fd.append('lastName', value.lastName)
    fd.append('firstName', value.firstName)
    fd.append('middleName', value.middleName)
    fd.append('email', value.email)
    fd.append('password', value.password)
    fd.append('image', file);
		dispatch({
      type:"admin/CREATE_ADMIN",
      payload:fd
    })
		setShowAdd(false)
	}

  const onFinishDelete = (value) =>{
		dispatch({
      type:"admin/DELETE_ADMIN",
      payload:value
    })
	}

  const onFinishActivate = (id, status) =>{
		dispatch({
      type:"admin/ACTIVATE_ADMIN",
      payload:{id, status}
    })
	}

  const confirmDeleteAction = (id) => {
		confirm({
		  title: `Are you sure want to delete this admin?`,
		  icon: <ExclamationCircleOutlined />,
		  content: 'Click Ok to continue',
		  onOk() {
      onFinishDelete(id)
		  },
		  onCancel() {
			console.log('Cancel');
		  },
		});
	}

  const confirmActivateAction = (id, val) => {
    let status = val === "ACTIVE"? "suspend":"activate"
		confirm({
		  title: `Are you sure want to ${status} this admin?`,
		  icon: <ExclamationCircleOutlined />,
		  content: 'Click Ok to continue',
		  onOk() {
      onFinishActivate(id, status)
		  },
		  onCancel() {
			console.log('Cancel');
		  },
		});
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
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="text-center flex justify-between">
            <h3
              className={
                "font-semibold text-lg " +
                (color === "light" ? "text-blueGray-700" : "text-white")
              }
            >
              Admin/Staff List
            </h3>
            <button
              className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={()=>setShowAdd(true)}
            >
            Create Admin
            </button>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          {loading && <Skeleton active />}
          {!loading && data.length === 0 ?
            <Result
              icon={<SmileOutlined />}
              title="Ooops there are currently no admin, click button below to create a new admin"
              extra={<Button type="primary" >Create Admin</Button>}
            />:
            <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Staff Names
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Email
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >Role</th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Status
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Created At
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                ></th>
              </tr>
            </thead>
            <tbody>
              {data.map
              ( datum =>(
              <tr key={datum.adminId}>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                  <Avatar src={<Image src={`${imageUrl}admin/${datum.image}`} />} />{" "}
                  <span
                    className={
                      "ml-3 font-bold " +
                      +(color === "light" ? "text-blueGray-600" : "text-white")
                    }
                  >
                    {datum.firstName} {datum.lastName}
                  </span>
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4">
                  {datum.email}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4">
                  {datum.Role.roleName}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4">
                  <i className={`fas fa-circle text-${datum.AdminAuth.status === "PENDING"?"orange":datum.AdminAuth.status==="SUSPENDED"?"red":"blueGray"}-500 mr-2`}></i> {datum && datum.AdminAuth.status}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4">
                  <div className="flex">
                    {new Date(datum.createdAt).toDateString()}
                  </div>
                </td>
                {/* <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <div className="flex items-center">
                    <span className="mr-2">{datum && datum.admin.status}</span>
                    <div className="relative w-full">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                        <div
                          style={{ width: "60%" }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                        ></div>
                      </div>
                    </div>
                  </div>
                </td> */}
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                  <TableDropdown
                    handleEdit={()=>handleEdit(datum)}
                    handleDelete={()=>confirmDeleteAction(datum.adminId)}
                    handleActivate={()=>confirmActivateAction(datum.adminId, datum.AdminAuth.status)}
                    status={datum && datum.AdminAuth.status}
                  />
                </td>
              </tr>))}
            </tbody>
          </table>}
        </div>
      </div>

      {/* edit admin */}
      <Modal
        title="Edit Admin"
        style={{ top: 20 }}
        visible={showEdit}
        centered
        footer={null} 
        onCancel={() => setShowEdit(false)}
      >
        <Form onFinish={onFinishEdit} form={form} {...layout}>
          <Form.Item name="roleId" label="Select Role">
            <Select
              placeholder="Select Role"
              allowClear
            >
              {roles.map(role => <Option key={role.roleId} value={role.roleId}>{role.roleName}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item name="email" hidden>
            <Input /> 
          </Form.Item>
          <Form.Item name="firstName" label="First Name">
            <Input />
          </Form.Item>
          <Form.Item name="lastName" label="Last Name">
            <Input />
          </Form.Item>
          <Form.Item name="middleName" label="Middle Name">
            <Input />
          </Form.Item>
          <Form.Item name="adminId" hidden>
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
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" loading={loading}>
                Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Add new admin */}
      <Modal
        title="Create New Admin"
        style={{ top: 20 }}
        visible={showAdd}
        centered
        footer={null} 
        onCancel={() => setShowAdd(false)}
      >
        <Form onFinish={onFinishAdd} {...layout}>
          <Form.Item name="roleId" label="Select Role">
            <Select
              placeholder="Select Role"
              allowClear
            >
              {roles.map(role => <Option key={role.roleId} value={role.roleId}>{role.roleName}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item name="email" label="E-mail">
            <Input /> 
          </Form.Item>
          <Form.Item name="firstName" label="First Name">
            <Input />
          </Form.Item>
          <Form.Item name="lastName" label="Last Name">
            <Input />
          </Form.Item>
          <Form.Item name="middleName" label="Middle Name">
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <Input type="password" />
          </Form.Item>
          <Form.Item label="Upload Image">
            <Upload onChange={handleChange} customRequest={dummyRequest}>
              <Button icon={<InboxOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" loading={loading}>
                Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

AdminTable.defaultProps = {
  color: "light",
};

AdminTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};

export default connect(mapStateToProps)(AdminTable)