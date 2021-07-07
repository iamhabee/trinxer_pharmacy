import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { Link } from "react-router-dom";


export default function SocialResponsibility() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({
      type:"site/ABOUT"
    })
    dispatch({
      type:"site/SET_STATE",
      payload:{title:"Social Responsibility"}
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
                <h3 className="text-3xl mb-2 font-semibold leading-normal">
                  Our Purpose
                </h3>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                  Furnishing people’s needs of essential healthy sources of products to improve their well-being and increase life expectancy.
                </p>
                <h3 className="text-3xl mb-2 font-semibold leading-normal">
                  Our Value
                </h3>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                  Passion: The three basic musts: heart, mind, and spirit are our driving force.
                  Innovation: Our thirst for advanced and ethical solutions to elevating wellness is continuous.
                  Quality: Our dedication is to deliver only the best to people who value their wellness.
                  Integrity: We honor life.
                  Giving back: Our commitment to share wellness is by giving back.
                </p>
              </div>
            </div>
          </div>
        </section>
    </>
  );
}
