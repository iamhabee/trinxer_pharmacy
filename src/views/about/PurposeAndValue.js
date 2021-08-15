import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function PurposeAndValue() {

  const dispatch = useDispatch()
  const data = useSelector(state => state.site)
  const {about} = data
  useEffect(() => {
    dispatch({
      type:"site/ABOUT"
    })
    dispatch({
      type:"site/SET_STATE",
      payload:{title:"Purpose And Value"}
    })
  }, [])

  return (
    <>
        <section className="pb-20 bg-blueGray-200 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center mt-32">
              <div className="w-full px-4 mr-auto ml-auto">
                <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                  <i className="fas fa-tools text-xl"></i>
                </div>
                <div className="leading-relaxed mt-0 mb-4 text-blueGray-600" dangerouslySetInnerHTML={{__html:about.mission}} />
              </div>
            </div>
          </div>
        </section>
    </>
  );
}
