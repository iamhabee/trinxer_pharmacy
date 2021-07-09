import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { imageUrl } from "services/axios";
import { Result, Skeleton} from 'antd';
import { SmileOutlined } from '@ant-design/icons';

export default function ProductCategory() {

  const dispatch = useDispatch()
  const params = useParams()
  const data = useSelector(state => state.site)
  const {categoriesProduct, products, loading} = data
  const categories = params.type === "sub" ? categoriesProduct : products
  useEffect(() => {
    dispatch({
      type:"site/CATEGORIES_PRODUCT",
      payload:params.id
    })
    dispatch({
      type:"site/PRODUCTS"
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
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap">
            {loading && <Skeleton active />}
            {!loading && categories.length === 0 ?
            <Result
              icon={<SmileOutlined />}
              title="Ooops there are currently no products under this category"
              // extra={<Button type="primary" >Create Admin</Button>}
            />:
            categories.map( (product, index)=>(
            <div className={`g:pt-12 pt-${(index+1) % 2 === 0? "4": "6"} w-full md:w-4/12 px-4 text-center hover:-mt-4 ease-linear transition-all duration-150`} key={index}>
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                  {/* <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400"> */}
                    <img className="align-middle border-none max-w-full rounded-lg" src={`${imageUrl}products/${product.imageUrl}`} style={{height:200, width:200}} />
                  {/* </div> */}
                  <h6 className="text-xl font-semibold">{product.name}</h6>
                  <p className="mt-2 mb-4 text-blueGray-500">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>))}
          </div>
        </div>
      </section>
    </>
  );
}
