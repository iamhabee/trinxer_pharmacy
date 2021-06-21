import React, { useEffect, useState } from "react";
import { Comment, Avatar, List, Modal } from 'antd';
// import moment from 'moment';
import { connect } from "react-redux";
// components

const mapStateToProps =({dispatch, message}) =>({
  dispatch,
  messages:message.messages,
  loading:message.loading
})
function MessagePage({dispatch, messages, loading}) {

  const [viewModal, setViewModal] = useState(false)
  const [content, setContent] = useState({})

  useEffect(() => {
    dispatch({
      type:"user/CURRENT_USER"
    })
    dispatch({
      type:"message/ALL_MESSAGES",
      payload:{limit:10, offset:0}
    })
  }, [])

  const handleChange = (e) =>{
    const {value} = e.target
    dispatch({
      type:"message/SEARCH_MESSAGE",
      payload:value
    })
  }

  const handleView =(value) =>{
    setViewModal(true)
    setContent(value)
  }


  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <div className="relative flex flex-col px-5 min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-xl font-bold">All Messges</h6>
                <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
                  <div className="relative flex w-full flex-wrap items-stretch">
                    <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                      <i className="fas fa-search"></i>
                    </span>
                    <input
                      onChange={handleChange}
                      type="text"
                      placeholder="Search here..."
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
                    />
                  </div>
                </form>
              </div>
              <List
                className="comment-list"
                loading={loading}
                // header={`${data.length} replies`}
                itemLayout="horizontal"
                dataSource={messages}
                renderItem={item => (
                  <li style={{cursor:"pointer"}} onClick={()=>handleView(item)}>
                    <Comment
                      actions={item.actions}
                      author={
                        <div>
                        <p>{item.senderName}</p>
                        <p>{item.senderEmail}</p>
                        <p>{item.senderPhoneNumber}</p>
                        </div>}
                      avatar={<Avatar style={{backgroundColor:"orange"}}>A</Avatar>}
                      content={item.senderMessage.slice(0, 30)}
                    />
                  </li>
                )}
              />
            </div>
          </div>
        </div>
        {/* View Blog COntent start */}
        <Modal
          title={content.senderName}
          centered
          visible={viewModal}
          footer={null}
          onCancel={() => setViewModal(false)}
        >
          <p >
            {content.senderMessage}
          </p>
        </Modal>
        {/* View Blog Content end */}
      </div>
    </>
  );
}

export default connect(mapStateToProps)(MessagePage)
