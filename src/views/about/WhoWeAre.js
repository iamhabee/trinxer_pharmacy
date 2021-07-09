import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function WhoWeAre() {
  const dispatch = useDispatch()
  const data = useSelector(state => state.site)
  const {about} = data
  useEffect(() => {
    dispatch({
      type:"site/ABOUT"
    })
    dispatch({
      type:"site/SET_STATE",
      payload:{title:"Who We Are"}
    })

  }, [])
  return (
    <>
        <section className="pb-20 bg-blueGray-200 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center mt-32">
              <div className="w-full px-4 mr-auto ml-auto">
                <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                  <i className="fas fa-user-shield text-xl"></i>
                </div>
                <h3 className="text-3xl mb-2 font-semibold leading-normal">
                 Our Mission
                </h3>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                  CEDEM AG is a privately-owned international pharmaceutical company that manufactures and markets its branded OTC nutraceutical and medicinal products worldwide with its headquarters based in Zurich, Switzerland. Its branch in Jordan is responsible for sales and marketing for MENA and emerging markets of China and Vietnam. It also has an operating branch in Germany, and an Irish branch responsible for licensing and regulatory affairs.

                  CEDEM AG is focused on promoting improved health and wellness through premium quality, high value, and efficacy healthcare products that range from innovative, groundbreaking food supplements to medical devices and personal care products.

                  Stemming from our belief that the person is and must always remain the priority, our modus operandi is to remain connected to people, listen to their needs and create what they really want: healthier, happier and longer lives.

                  CEDEM AG conforms to each market’s needs by offering a suitable variety to each of its wide-ranging products especially in the MENA region and emerging markets of China and Vietnam through various distributors in different countries.

                  CEDEM AG is also a specialized private label service provider of a broad selection of healthcare products in both MENA and emerging markets of China and Vietnam.
                </p>
              </div>
            </div>
          </div>
        </section>
    </>
  );
}
