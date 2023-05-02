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
        <title>Empowering Education: Stock Knowledge Sponsors Brigada Eskwela for Tuguegarao City Science High School</title>
        <meta
          property="og:url"
          content={`${process.env.WEBSITE_DOMAIN}/articles/vr-ar-platform`}
        />
        <meta property="og:type" content="article" />
        <meta property="fb:app_id" content={process.env.FACEBOOK_ID} />
        <meta
          property="og:title"
          content={`VR/AR Platform - ${process.env.WEBSITE_NAME}`}
        />
        <meta property="og:description" content="VR/AR Platform" />
        <meta
          property="og:image"
          content={`${process.env.WEBSITE_DOMAIN}/images/articles/vr-ar-platform/vr-ar-cover.png`}
        />
      </Head>
      <MobileNavbar />
      <ArticleNavbar
        showModal={setLoginModalOpen}
        page="article"
        path="SK Sponsors Brigada Eskwela for TCHS"
      />

      {loginModalOpen && (
        <ModalLayout
          providers={props.providers}
          showModal={setLoginModalOpen}
        />
      )}

<div className="leading-8 hero text-white px-10 py-10 space-y-2 md:w-full xs:w-screen">
  <h1 className="xl:text-5xl lg:text-5xl md:text-5xl sm:text-xl xs:text-xl xl:w-3/4 lg:w-3/4 md:w-full reno:w-full sm:w-full xs:w-full font-bold" style={{ lineHeight: '1.1' }}>
        Empowering Education: Stock Knowledge Sponsors Brigada Eskwela for Tuguegarao City Science High School with Gamified Immersive Learning Platform and Technical Assistance
        School
        </h1>
        <p className="text-sm">Anna Marie Benzon, Founder & CEO, Stock Knowledge Corp.</p>
      </div>
      <div className="md:-mt-5 xs:-mt-4 md:mb-8 xl:w-full lg:w-full md:w-full reno:w-full sm:w-screen xs:w-screen">
  <img
    className="rounded-3xl mx-auto mt-20"
    src="/images/articles/tuguegarao-science/tuguegarao-science-head.png"
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

            <i className="text-xl">Stock Knowledge Corp. (SK), an education technology company, kicked off 2022 
            with a significant partnership with Tuguegarao City Science High School (TCSHS) by sponsoring the 
            Brigada Eskwela initiative. SK provided free access to its gamified immersive learning platform, which 
            makes studying math and science more fun, engaging, and effective for TCSHS students. In addition to 
            the platform, SK offered the students comprehensive training and workshops on app usage, games, 
            augmented reality (AR), and virtual reality (VR).</i>
            <br />
            <br />

            SK's engineers provided exceptional technical assistance to TCSHS students, ensuring a smooth and 
            seamless experience with the platform. The students could explore the platform's features and benefits 
            with the guidance and support of SK's team of experts.
            <br />
            <br />
            The partnership between SK and TCSHS aligns with the <strong><i>Department of Education (DepEd) Secretary Leonor Magtolis-Briones's</i></strong> call 
            to innovate and collaborate in addressing the education crisis brought about by the pandemic. The activities also contribute 
            to the United Nations' Sustainable Development Goal 4 of the 2030 Agenda, which focuses on ensuring inclusive and equitable 
            quality education for all.
            <br />
            <br />
            <img
            className="mx-auto mt-8"
            src="/images/articles/tuguegarao-science/tuguegarao-science-img1.png"
            />
            <br />
            <br />
            Through this collaboration, SK and TCSHS aim to optimize education delivery by leveraging emerging technologies, such as 
            gamification, AR, and VR, to make learning more engaging and effective for students. The workshops and training provided by SK 
            empower the students with the necessary skills and knowledge to excel in math and science, paving the way for a brighter future.
            <br />
            <br />
            The partnership between SK and TCSHS underscores their commitment to enhancing the quality of education and promoting innovative 
            learning approaches. With SK's gamified immersive learning platform and technical expertise, TCSHS students have the tools to 
            succeed academically and thrive in the digital era.
            <br />
            <br />
            <img
            className="mx-auto mt-8"
            src="/images/articles/tuguegarao-science/tuguegarao-science-img2.png"
            />
            <br />
            <br />
            The signing of the Memorandum of Agreement was attended by <i><strong>Anna Marie Benzon, CEO of Stock Knowledge; 
            Ms. Carmen Acain, Principal of Tuguegarao City Science High School; Noli Abrigo, EPS- Mathematics; 
            Myrna Adduru, EPS- Science; Shelly Pascual, GPTA President; and Brgy. Captain Florida Lasam,</strong></i> marking the beginning 
            of an exciting collaboration between Stock Knowledge and TCSHS in 2022.
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