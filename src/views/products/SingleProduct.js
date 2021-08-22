import { Skeleton } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { imageUrl, pdfUrl } from "services/axios";

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
            <div className="w-full md:w-12/12 mr-auto md:pt-0" style={{height:400, width:400}}>
              <img
                alt="..."
                className="rounded-lg shadow-xl"
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
                <div className="mt-5" dangerouslySetInnerHTML={{__html: singleProduct.detail}} />
              </div>
              {singleProduct.fileUrl &&
              <a className="flex p-5 items-center" target="_blank" href={`${pdfUrl}products/${singleProduct.fileUrl}`} data-slimstat="3">
                <div style={{width:50, height:50, marginRight:5}}>
                  <img src="/images/pdf.png" alt="" />
                </div>Download Attachment
              </a>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
