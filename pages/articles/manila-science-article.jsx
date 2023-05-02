import ArticleCarouselLayout from "../../components/ArticlesCarousel/ArticleCarouselLayout";
import Footer from "../../components/Footer";
import MobileNavbar from "../../components/HomePage/NavBar/MobileNavBar";
import ArticleNavbar from "../../components/NavBar";
import ModalLayout from "../../components/HomePage/ModalLayout";
import { useEffect, useState } from "react";
import { useUserManagementHook } from "../../hooks/userManagementHook";
import Head from "next/head";
import { FacebookIcon, FacebookShareButton } from "react-share";
import { TwitterIcon, TwitterShareButton } from "react-share";
import { LinkedinIcon, LinkedinShareButton } from "react-share";
import { providers, useSession } from "next-auth/client";
import { useDispatch, useSelector } from "react-redux";
import { DoLogin } from "../../redux/actions/UserAction";
import { usePostHttp } from "../../hooks/postHttp";

export default function DigitalLearning1(props) {
  useUserManagementHook();
  const dispatch = useDispatch();

  const [session, loading] = useSession();

  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const user = useSelector((state) => state.UserReducer);

  const [toLogin, setToLogin] = useState(false);

  const [authLoginLoading, authData] = usePostHttp(
    !user.isLogin && session && toLogin
      ? { name: session.user.name, email: session.user.email }
      : null,
    toLogin ? "/login/auth" : null
  );

  useEffect(() => {
    if (session) {
      setToLogin(true);
    }
  }, [session]);

  useEffect(() => {
    if (authData.success) {
      setLoginModalOpen(false);
      dispatch(DoLogin(true, authData.result));
    }
  }, [authData]);

  useEffect(() => {
    if (user.data && !user.data.verified) setLoginModalOpen(true);
  }, [user]);

  return (
    <>
      <Head>
        <title>SK and Manila Science High School Collaboration</title>
        <meta
          property="og:url"
          content={`${process.env.WEBSITE_DOMAIN}/articles/manila-science-article`}
        />
        <meta property="og:type" content="article" />
        <meta property="fb:app_id" content={process.env.FACEBOOK_ID} />
        <meta
          property="og:title"
          content={`SK and Manila Science High School Collaboration - ${process.env.WEBSITE_NAME}`}
        />
        <meta property="og:description" content="SK and Manila Science High School Collaboration" />
        <meta
          property="og:image"
          content={`${process.env.WEBSITE_DOMAIN}/images/articles/vr-ar-platform/vr-ar-cover.png`}
        />
      </Head>
      <MobileNavbar />
      <ArticleNavbar
        showModal={setLoginModalOpen}
        page="article"
        path="SK and Manila Science High School Collaboration"
      />

      {loginModalOpen && (
        <ModalLayout
          providers={props.providers}
          showModal={setLoginModalOpen}
        />
      )}

<div className="leading-8 hero text-white px-10 py-10 space-y-2 md:w-full xs:w-screen">
  <h1 className="xl:text-5xl lg:text-6xl md:text-6xl sm:text-xl xs:text-xl xl:w-3/4 lg:w-3/4 md:w-full reno:w-full sm:w-full xs:w-full font-bold" style={{ lineHeight: '1.1' }}>
    Stock Knowledge and Manila Science High School Collaborate for Innovative Education Delivery Through Brigada Eskwela Program
  </h1>
  <p className="text-sm">Anna Marie Benzon, Founder &amp; CEO, Stock Knowledge Corp.</p>
</div>
<div className="md:-mt-5 xs:-mt-4 md:mb-8 xl:w-full lg:w-full md:w-full reno:w-full sm:w-screen xs:w-screen">

        <img
          className="rounded-3xl mx-auto mt-20"
          src="/images/articles/vr-ar-platform/vr-ar-img.png"
        />
      </div>
      <div className="md:w-full xs:w-screen flex justify-between lg:px-48 md:px-20 reno:px-20 sm:px-20 xs:px-20 text-gray-500 lg:flex-row xs:flex-col">
        <div className="xl:w-1/4 lg:w-1/4 md:w-1/4 reno:w-1/4 sm:w-full xs:w-full">
          <p>Share this article</p>
          <div className="w-full h-10 flex items-center text-blue space-x-2">
            <FacebookShareButton url="https://facebook.com/stockknowledge_">
              <FacebookIcon size={36} />
            </FacebookShareButton>

            <TwitterShareButton url = "https://twitter.com/stockknowledge_">
              <TwitterIcon size = {36} />
            </TwitterShareButton>

            <LinkedinShareButton url = "https://www.linkedin.com/company/stock-knowledge/">
              <LinkedinIcon size = {36} />
            </LinkedinShareButton>
          </div>
        </div>
        <div className="xl:w-11/12 lg:w-11/12 md:w-11/12 reno:w-11/12 sm:w-full xs:w-full leading-relaxed text-justify">
        <p className="leading-relaxed">
            <br/>11 September 2021
            <br />
            <br />
            <i className="text-xl">In a Memorandum of Agreement signing event on September 11, 2021, Stock Knowledge (SK) and Manila Science High School (MSHS) 
            formalized their partnership for the Brigada Eskwela Program. With the theme <strong>"Bayanihan para sa Paaralan," </strong> the program aims to revolutionize education 
            delivery in today's digital transformation age.</i>

            <br/>
            <br/>
            As part of this collaboration, Manila Science High School students have been granted free access to Stock Knowledge's gamified immersive learning platform 
            and comprehensive <strong className="text-blue-400"> training and workshops on games, virtual reality (VR), and augmented reality (AR) </strong>. In addition to the app usage and training, SK provided workshops 
            on the Fundamentals of Game Design and Development (FGDD) for MSHS teachers, led by Mr. Paul Gilbert Maglaya, Head of XR Software Engineering at Stock Knowledge 
            and a prominent figure in the industry. Mr. Maglaya's extensive experience as a College Professor at José Rizal University, a Unity Certified Developer, a CTO, and a Game Developer 
            adds tremendous value to the workshops.The FGDD for educators has been met with resounding praise from teachers, who have expressed appreciation for its positive impact.
            <br />
            <br />
            Furthermore, Stock Knowledge has been closely working on research with MSHS and has submitted a research paper titled 
           <strong className="text-blue-400"> "Gamified-Infused Assisted Instruction Through Extended Reality Mobile App: Impact on Students' Performance and Attitude Towards Mathematics" </strong>
            to the esteemed 4th International Conference on Open and Distance e-Learning (ICODeL 2021). This research showcases SK's commitment to advancing 
            the field of education through innovative technologies and evaluating the impact of their gamified immersive learning platform on students' performance and 
            attitude towards mathematics. The study shows a significant difference in students' learning outcomes and positive attitudes toward math when using SK's gamified immersive learning platform. 
            <br/>
            <br/>
            <div className="mx-auto md:w-3/4 iframe-container border-box border-8 border-skBlue">
            <iframe class="mx-auto" width="800" height="315" src="https://www.youtube.com/embed/urjrW1v4ktg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>

            <br />
            <br /> 


            The collaboration between Stock Knowledge and Manila Science High School under the Brigada Eskwela Program empowers students with engaging and effective learning experiences. 
            It demonstrates the commitment of both organizations to revolutionize education delivery and provide students with the necessary tools and resources to thrive in today's digital era.

           </p>
        </div>
      </div>
      <div className="">
        <ArticleCarouselLayout />
      </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  return { props: { providers: await providers(context) } };
}