import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
import { Steps } from 'antd';
import { UserOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined,SketchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import MapExample from "components/Maps/MapExample";


export default function OurDistributor() {

  const { Step } = Steps;
  const dispatch = useDispatch()
  const data = useSelector(state => state.site)
  const {team} = data
  useEffect(() => {
    dispatch({
      type:"site/ABOUT"
    })
    dispatch({
      type:"site/TEAM"
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
                  <i className="fas fa-user-friends text-xl"></i>
                </div>
                <h3 className="text-3xl mb-2 font-semibold leading-normal">
                  Distributed World Wide
                </h3>
                <Steps>
                  <Step status="finish" title="Asia" icon={<UserOutlined />} />
                  <Step status="finish" title="Europe" icon={<SolutionOutlined />} />
                  <Step status="process" title="Latin America" icon={<LoadingOutlined />} />
                  <Step status="wait" title="Mena" icon={<SmileOutlined />} />
                  <Step status="wait" title="SS Africa" icon={<SketchOutlined />} />
                </Steps>
                <div className="mt-10">
                  <MapExample />
                </div>
              </div>
            </div>
          </div>
        </section>
    </>
  );
}
