import React, { useState } from "react";
import { List, Avatar } from 'antd';

// components

export default function SettingsCard() {
  const [editSetting, setEditSetting] = useState(false)
  const data = [
    {
      title: 'Home Page content',
    },
    {
      title: 'About Us content',
    },
    {
      title: 'Contact us content',
    },
    {
      title: 'Features content',
    },
  ];
  return (
    <>
      <div className="relative flex flex-col px-5 min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Content Management Settings</h6>
            <button
              className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={()=>setEditSetting(true)}
            >
             Toggle Edit Settings
            </button>
          </div>
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title={<a href="https://ant.design">{item.title}</a>}
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
              </List.Item>
            )}
          />
        </div>
      </div>
    </>
  );
}
