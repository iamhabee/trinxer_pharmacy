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
                {/* <h3 className="text-3xl mb-2 font-semibold leading-normal">
                  
                </h3> */}
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                  Social Responsibility (CSR) is embedded in CEDEM AG’s DNA. We are dedicated to making a positive difference wherever we operate as being socially responsible lies at the core of our culture and daily operations and stems from our values of integrity and giving back.

                  As our purpose is to improve well-being, it is inherent that our responsibility lies not just with our employees, partners, and patients, but also with society.

                  We invest in education, innovation, and ventures and support initiatives that create value to improve well-being beyond the pharmaceutical world.

                  Our CSR includes, and is not limited to:

                  The Amali Project
                  I have created the Amali Mentorship Network because one of the many lessons that I have learned is the importance of accessing mentors in the early stages of one’s entrepreneurial journey. Amali comes from the word Amal, which means hope in Arabic, is a mentoring network that aims to support female entrepreneurs with taking the necessary steps towards successful self-employment to reclaim their rights and freedoms and earn a better living.

                  Amali is my dream project. This project aims to create a network of mentors that have real practical experience and support female entrepreneurs. I have pledged to spend 10 hours per week chatting with female entrepreneurs from underprivileged backgrounds and support them throughout their journey. The most important thing for me when selecting a female entrepreneur is to select someone who has no financial access and has real determination and passion to grow herself and her business.

                  What an entrepreneur needs the most is the presence of a mentor in his life who guides him throughout his journey and urges him to think for himself rather than make decisions for him. I have constantly given my time to others and taught them what I had to learn with difficulty. I have supported many women, particularly those who have worked with me, and today, they are the best at what they do. I have helped create a generation of the professionalism that I saw and learned in Germany and Switzerland; a generation that is greatly attentive to details, clarity, and multitasking. A generation that trusts his ability and strengths.

                  The projects my mentees are working on have a lot of variety. These startups include but are not limited to, educational, artistic, and health-based projects. For instance, one of the startups, Finaa, advocates for women empowerment and gender equality by creating the first Football coaching Academy for young girls in the Middle East. Another startup called Physics Fun is a platform for physics in Arabic that allows Arabic speakers around the world to exchange their knowledge and experience with physics. This is done through training programs, lectures, videos, and articles, and could, in turn, contribute to expanding concepts of physics in Arabic on the internet. Furthermore, one of my mentees has been working on an online application, called I-offers, which provides customers with unlimited coupons and exclusive offers on products and services.

                  My goal is to extend my knowledge to other female entrepreneurs and create a network that will allow them to grow their brand and vision.

                  Rasha Oudeh.
                </p>
              </div>
            </div>
          </div>
        </section>
    </>
  );
}
