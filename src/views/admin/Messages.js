import React, { useEffect } from "react";
import { Comment, Tooltip, List } from 'antd';
// import moment from 'moment';
import { connect } from "react-redux";
// components

const mapStateToProps =({dispatch, message}) =>({
  dispatch,
  messages:message.messages,
  loading:message.loading
})
function MessagePage({dispatch, messages, loading}) {

  useEffect(() => {
    dispatch({
      type:"user/CURRENT_USER"
    })
    dispatch({
      type:"message/ALL_MESSAGES",
      payload:{limit:10, offset:0}
    })
  }, [])


  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <div className="relative flex flex-col px-5 min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-xl font-bold">All Messges</h6>
              </div>
              <List
                className="comment-list"
                loading={loading}
                // header={`${data.length} replies`}
                itemLayout="horizontal"
                dataSource={messages}
                renderItem={item => (
                  <li>
                    <Comment
                      actions={item.actions}
                      author={item.author}
                      avatar={item.avatar}
                      content={item.content}
                    />
                  </li>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default connect(mapStateToProps)(MessagePage)
