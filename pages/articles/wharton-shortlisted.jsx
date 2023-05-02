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
        <title>Wharton-QS Reimagine Education Awards</title>
        <meta
          property="og:url"
          content={`${process.env.WEBSITE_DOMAIN}/articles/wharton-shortlisted`}
        />
        <meta property="og:type" content="article" />
        <meta property="fb:app_id" content={process.env.FACEBOOK_ID} />
        <meta
          property="og:title"
          content={`Wharton-QS Reimagine Education Awards - ${process.env.WEBSITE_NAME}`}
        />
        <meta property="og:description" content="Wharton-QS Reimagine Education Awards" />
        <meta
          property="og:image"
          content={`${process.env.WEBSITE_DOMAIN}/images/articles/wharton-shortlisted/wharton-shortlist-img.png`}
        />
      </Head>
      <MobileNavbar /> 
      <ArticleNavbar
        showModal={setLoginModalOpen}
        page="article"
        path="Wharton-QS Reimagine Education Awards"
      />

      {loginModalOpen && (
        <ModalLayout
          providers={props.providers}
          showModal={setLoginModalOpen}
        />
      )}

      <div className="hero text-white px-10 py-10 space-y-2 md:w-full xs:w-screen">
        <h1 className="xl:text-6xl lg:text-5xl md:text-6xl sm:text-xl xs:text-xl xl:w-3/4 lg:w-3/4 md:w-full reno:w-full sm:w-full xs:w-full font-bold" style={{ lineHeight: '1.1' }}>
        Stock Knowledge Gamified Immersive Learning Platform is one of the finalists for the Wharton-QS Reimagine Education Awards
        </h1>

        <p className="text-sm">Anna Marie Benzon, Founder & CEO, StockKnowledge Corp.</p>
      </div>
      <div className="md:-mt-5 xs:-mt-4 md:mb-8 xl:w-full lg:w-full md:w-full reno:w-full sm:w-screen xs:w-screen">
        <img
          className="mx-auto mt-20"
          src="/images/articles/wharton-shortlisted/wharton-shortlisted-header.svg"
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

            <br/>November 2022
            <br/>
            <br/>
            <i className="text-xl">We are proud to announce that Stock Knowledge, a gamified immersive learning platform, 
            is one of the finalists for the Immersive Experiential Learning Category of the Wharton-QS Reimagine Education Awards. 
            This prestigious event recognizes innovative approaches that enhance student learning outcomes and employability. 
            Stock Knowledge is among the top <b>18%</b> of innovative solutions chosen from over <b>1100</b> applications submitted worldwide.</i>
            <br />
            <br />
            The Wharton-QS Reimagine Education Awards is considered the 'Oscars' of Education. It is an honor to be recognized alongside 
            top universities and private organizations that pioneer technological advancements and pedagogical innovations in education worldwide.

            <br />
            <br />
            Stock Knowledge is a gamified immersive learning platform that utilizes games, <strong><i>augmented reality(AR)</i>, and <i>virtual reality (VR)</i> </strong>
            to make math and science learning more fun, engaging, and effective. The three-dimensional immersive simulation and interaction via AR and VR 
            significantly enhanced the student's understanding of the complex concepts of math and science. Additionally, based on our study and 
            other research, incorporating games into learning can contextualize instructional settings, motivate learners, engage them, and lead to 
            increased learning outcomes and positive attitudes toward math and science.

            <br />
            <br />
            Our solution turns passive learners into active ones and empowers teachers with what they do best, which is teaching. 
            Our solution is an excellent supplement to the existing teaching tools, especially for personalized remote learning. 
            It also lessens students' math and science anxieties through 3D simulated gamified immersive learning and easy association 
            of STEM complex technical concepts to real-life applications. 

            <br />
            <br />
            We are excited to be recognized for our innovative approach to delivering high-quality basic education and grateful for the opportunity to be 
            considered for this prestigious award. Our platform can significantly impact more students and teachers since this is affordable and accessible 
            despite using emerging exponential technologies. SK learning platform can be accessed using a low-spec smartphone with no or low-internet connection. 
            And we look forward to continuing to develop and improve our platform to better serve our users.

            <br />
            <br />
            To learn more about the Wharton-QS Reimagine Education Awards and the other finalists,
            <br/>
            Please visit: &nbsp;
             <a href="https://reimagine-education.com." target="_blank"><u className="text-blue-500">https://www.youtube.com/watch?v=FhqyfkER-iE.</u></a>
            <br/>
            And to see a video of Stock Knowledge in action: &nbsp;

            <a href="https://www.youtube.com/watch?v=FhqyfkER-iE." target="_blank"><u className="text-blue-500">Click here</u></a>
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