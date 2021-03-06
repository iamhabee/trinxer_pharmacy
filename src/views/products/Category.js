import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { imageUrl } from "services/axios";
import { Pagination, Result, Skeleton} from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

export default function ProductCategory() {

  const dispatch = useDispatch()
  const params = useParams()
  const data = useSelector(state => state.site)
  const {categoriesProduct, products, loading, totalProducts} = data
  // const parentCat = products.filter(product => params.id === product.parentCategoryId)
  const categories = params.type === "sub" ? categoriesProduct : products
  useEffect(() => {
    dispatch({
      type:"site/CATEGORIES_PRODUCT",
      payload:params.id
    })
    dispatch({
      type:"site/PRODUCTS",
      payload:{limit:20, offset:0}
    })
    dispatch({
      type:"site/ABOUT"
    })
    dispatch({
      type:"site/SET_STATE",
      payload:{title:params.name}
    })
    // eslint-disable-next-line
  }, [])

  const handlePagination = (page, pageSize) =>{
    dispatch({
      type:"site/PRODUCTS",
      payload:{limit:20, offset:(page-1 )* 20}
    })
  }

  return (
    <>
      <section className="pb-20 bg-blueGray-200">
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
              <div className="pt-4 w-full md:w-4/12 px-4 text-center hover:-mt-4 ease-linear transition-all duration-150" key={index}>
                <Link to={`/products/single/product/${product.name}/${product.productId}`}>
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                    <div className="px-4 py-5 flex-auto">
                      <div style={{height:200, width:200}}>
                        <img className="align-middle border-none max-w-full rounded-lg" src={`${imageUrl}products/${product.imageUrl}`}/>
                      </div>
                      <h6 className="text-xl font-semibold">{product.name && product.name.slice(0, 15)}...</h6>
                      <p className="mt-2 mb-4 text-blueGray-500">
                        {product.description && product.description.slice(0, 47)}...
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          {params.type === "parent" &&
          <Pagination
            total={totalProducts}
            responsive={true}
            defaultCurrent={1}
            onChange={handlePagination}
            defaultPageSize={20}
          />}
        </div>
      </section>
    </>
  );
}
