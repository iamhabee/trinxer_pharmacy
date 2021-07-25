import { Skeleton } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { imageUrl } from "services/axios";

export default function SingleProduct() {

  const dispatch = useDispatch()
  const params = useParams()
  const data = useSelector(state => state.site)
  const {singleProduct, loading} = data
  useEffect(() => {
    dispatch({
      type:"site/ABOUT"
    })
    dispatch({
      type:"site/SINGLE_PRODUCT",
      payload:params.productId
    })
    dispatch({
      type:"site/SET_STATE",
      payload:{title:params.name}
    })
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <section className="pb-20 bg-blueGray-200 -mt-24">
        <div className="container mx-auto px-4 pb-32 pt-48">
          {loading && <Skeleton active />}
          <div className="items-center flex flex-wrap">
            <div className="w-full md:w-12/12 mr-auto px-4 pt-5 md:pt-0">
              <img
                alt="..."
                className="max-w-full rounded-lg shadow-xl"
                style={{
                  transform:
                    "scale(1) perspective(550px) rotateY(-11deg) rotateX(2deg) rotate(2deg)",
                    height:300
                }}
                src={`${imageUrl}products/${singleProduct.imageUrl}`}
              />
            </div>
            <div className="w-full md:w-12/12 ml-auto px-12 md:px-4">
              <div className="md:pr-12 p-5">
                <h3 className="text-3xl text-orange-500 font-semibold">
                  {singleProduct.name}
                </h3>
                <p className="mt-4 text-sm font-bold leading-relaxed text-blueGray-600">
                  {singleProduct.description}
                </p>
                {singleProduct.detail}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
