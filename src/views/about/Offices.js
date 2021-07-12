import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import { List, Card, Descriptions} from 'antd';

export default function Offices() {

  const dispatch = useDispatch()
  const data = useSelector(state => state.site)
  const {offices, loading} = data
  useEffect(() => {
    dispatch({
      type:"site/OFFICES"
    })
    dispatch({
      type:"site/SET_STATE",
      payload:{title:"OFFICES"}
    })
  }, [])
  return (
    <>
        <section className="pb-20 bg-blueGray-200 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center mt-32">
              <div className="w-full px-4 mr-auto ml-auto">
                <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                  <i className="fas fa-envelope-square text-xl"></i>
                </div>
                <h3 className="text-3xl mb-2 font-semibold leading-normal">
                  Office Address
                </h3>
                <Card style={{marginTop: 16 }} loading={loading}>
                  <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                      onChange: page => {
                        console.log(page);
                      },
                      pageSize: 3,
                    }}
                    dataSource={offices}
                    renderItem={(item, index)=> (
                      <List.Item key={index} >
                        <Descriptions title="User Info">
                          <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
                          <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
                          <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
                          <Descriptions.Item label="Remark">empty</Descriptions.Item>
                          <Descriptions.Item label="Address">
                            No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                          </Descriptions.Item>
                        </Descriptions>
                      </List.Item>
                    )}
                  />
                </Card>
              </div>
            </div>
          </div>
        </section>
    </>
  );
}
