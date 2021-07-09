import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import { List, Card} from 'antd';

export default function BoardOfDirectors() {
  
  const dispatch = useDispatch()
  const data = useSelector(state => state.site)
  const {team, loading} = data
  useEffect(() => {
    dispatch({
      type:"site/ABOUT"
    })
    dispatch({
      type:"site/TEAM"
    })
    dispatch({
      type:"site/SET_STATE",
      payload:{title:"Advisory Board"}
    })
  }, [])
  return (
    <>
        <section className="pb-20 bg-blueGray-200 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center mt-32">
              <div className="w-full px-4 mr-auto ml-auto">
                <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                  <i className="fas fa-table text-xl"></i>
                </div>
                <h3 className="text-3xl mb-2 font-semibold leading-normal">
                  Meet The Board of Directors
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
                    dataSource={team}
                    renderItem={(item, index)=> (
                      <List.Item
                        key={index}
                        extra={
                          <img
                            width={250}
                            style={{height:150}}
                            alt="logo"
                            src='/images/team1.jpg'
                          />
                        }
                      >
                        <h5 className="font-bold text-dark-gray uppercase">
                          {item.firstName} {item.lastName}
                        </h5>
                        <List.Item.Meta
                          title={<a href={item.href}>{item.Role.roleName}</a>}
                          description={<h3>{item.Role.roleDescription}</h3>}
                        />
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
