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
        <title>VR/AR platform for gamified learning of STEM subjects - Stock Knowledge</title>
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
        path="Stock Knowledge: VR/AR platform for gamified learning of STEM subjects"
      />

      {loginModalOpen && (
        <ModalLayout
          providers={props.providers}
          showModal={setLoginModalOpen}
        />
      )}

      <div className="hero text-white px-10 py-10 space-y-2 md:w-full xs:w-screen">
        <h1 className="xl:text-6xl lg:text-5xl md:text-6xl sm:text-xl xs:text-xl xl:w-3/4 lg:w-3/4 md:w-full reno:w-full sm:w-full xs:w-full font-bold" style={{ lineHeight: '1.1' }}>
        Stock Knowledge: VR/AR platform for gamified learning of STEM subjects
        </h1>
        <p className="text-sm">Anna Marie Benzon, Founder & CEO, StockKnowledge Corp.</p>
      </div>
      <div className="md:-mt-5 xs:-mt-4 md:mb-8 xl:w-full lg:w-full md:w-full reno:w-full sm:w-screen xs:w-screen">
        <img
          className="mx-auto  mt-20"
          src="/images/articles/vr-ar-platform/vr-ar-head.svg"
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
          <a className="text-blue-400 hover:underline" href="https://www.unicefinnovationfund.org/broadcast/updates/stockknowledge-vrar-platform-gamified-learning-stem-subjects" target="_blank" rel="noopener noreferrer">
               Read the article here
            </a>
            <br/> 27 October 2021
            <br />
            <br />
            <i className="text-xl">The UNICEF Innovation Fund is proud to see a portfolio member Stock Knowledge
            graduate. They’ve come a long way – from numerous product iterations to deep 
            diving into understanding their ecosystem better and strengthening their business model. 
            They’re now ready to collaborate at a larger scale – as they find new pathways to work with
            partners, investors, and the open source community. </i>
            <br />
            <br />
            In the past 12 months, our team deployed virtual reality technologies for education, formed 
            strategic partnerships with the Department of Education in Manila and Makati divisions for 
            pilot tests and research, and overhauled our brand image. As of today, learners can now 
            enjoy 49 topics on gamified immersive Earth Science, Math, Physics, Chemistry, and Biology 
            contents for free. 
            <br />
            <br />
            <strong>OUR SOLUTION</strong> 
            <br />
            <br />
            Our team successfully deployed a high-quality XR mobile application that contains gamified 
            Augmented Reality and Virtual Reality STEM subjects. 
            <br />
            <br />
            We designed the XR mobile app with the users in mind. Since VR hardware is relatively expensive, 
            our team designed content that can function on a low end smartphone, as long as it is equipped 
            with a  gyroscope. If a user's smartphone doesn't  have a gyroscope, they may use the “VR 360” 
            mode for a panoramic view on their phones.  The VR box/cardboard only costs $1.5-$4.0, as opposed 
            to purchasing a standalone VR’s or pc VR’s that retails for over $400.00. In the case that a student 
            or educator chooses the latter, we are able to develop customized content for standalone VR’s. 
            <br />
            <br />
            Due to connectivity issues in the Philippines that greatly affect information sharing and learning 
            outcomes of students, our app is ready for an offline mode. The mobile app is compatible with 
            Android phones available on Google Play Store. We will release a mobile app compatible with iOS soon, 
            so stay tuned!
            <br />
            <br />
            To validate our product, we partnered with the Department of Education of Manila and Makati Divisions 
            for the pilot implementations of XR to high school students. The web and mobile applications were 
            extensively improved through the teachers' and students’ feedback during alpha and closed-beta tests. 
            Based on the study we did with our collaborators from Department of Education Manila, preliminary results 
            show a difference in students’ performance and attitude towards studying math when they use our gamified VR content
          </p>
          <img
            className="mx-auto mt-8"
            src="/images/articles/vr-ar-platform/vr-ar-img.png"
          />
           <br />
            <br />
            <strong> PROTOTYPING</strong> 
            <br />
            Our XR and Learning Management Systems has two functioning versions. 
            The first version uses AFrame while the second version uses Unity.
            <br />
            <br />
            We shifted our technological approach after six months of the 
            project timeline because the first version compromised the asset quality 
            and functionality that may affect the student's learning. 

            As we developed more content, we realized that the second version has more 
            realistic features but is more costly. We are doing all we can to solve the problems 
            on the cost of system maintenance, license fees, and others to provide a better platform 
            that is affordable, accessible, and innovative.
            <br />
            <br />
            Although the first version may have lots of limitations in asset quality and functionality, and 
            longer development time. We are considering maximizing its advantages in terms of cost, faster 
            loading, and deployment time (cross-platform) as we continue to develop the product.
            <br />
            <br />
            Having our solution open-sourced allows others to provide feedback and suggestions easily to improve
            our tech approaches. Although we have a very small community of developers, we are positively moving 
            in the direction of involving the community to solve the problem in the education landscape.
            <br />
            <br />
            Moreover, we can inspire others to follow our lead by sharing our solutions openly. In this way, we can 
            multiply our voices in our advocacy for the much-needed implementation of new supplementary learning tools 
            suited for the current and future digitally savvy generations academic needs
            <br />
            <br />
            <p className="text-blue-500 text-xl italic">"Being open-sourced allows others to provide feedback and suggestions easily to improve our tech approaches."
            </p>
            <br />
            <br />
            <strong>BUSINESS MODELS</strong>
            <br />
            <br />
            With the new technologies we produced over the last 12 months, our business model has changed drastically. 
            Right now, we have in-app purchases and B2B.
            <br />
            <br />
            Our XR mobile app comes with three modes. Mode 1 is interactive lectures in which most or all contents are free.
            Mode 2 comes with activities and experiments, some contents can be purchased for $1.0 only. 
            Lastly, we have Mode 3 that is a mission-based task and requires higher-order thinking skills, 
            although we have few free content, most content will be priced starting at $1.70 only.
            <br />
            <br />

            <strong>CHALLENGES</strong>
            <br />
            <br />

            The biggest challenge that we are facing right now is how to scale and implement in the core curriculum what we had 
            started since we aim to deploy all subjects in basic education. Doing so requires huge resources to penetrate the market. 
            Also, we are patiently and persistently convincing traditional decision-makers for the much-needed paradigm shift in 
            education since we have these new types of learners who are more inclined to technologies. The bureaucracy present in the 
            education system often blocks the seamless implementation of 21st-century technologies as effective learning and teaching tools.
            <br />
            <br />
            <strong>FUTURE COLLABORATORS & NEXT SET OF GOALS</strong>
            <br />
            <br />

            We are pursuing our partnership with ASEAN Foundation since this is the most fitting in our long-term goal to expand in the 
            neighboring countries. We would be glad if our initial conversation on the existing modules will be translated to other ASEAN 
            countries' local languages through close collaboration with ASEAN volunteers of that country.
            <br />
            <br />
            For the next year we aim to improve and add more content in STEM subjects and implement this in schools in collaboration with 
            the Department of Education. We are eager to secure additional grant funding in order to expand our product features and test 
            our solution in new market. Our ultimate goal is to serve approximately 33 million students in basic education, college, and 
            training schools here in the Philippines. Then, share it with other students from the rest of the world.
            <br />
            <br />
            <strong>UNICEF INNOVATION FUND</strong>
            <br />
            <br />

            We are very grateful to UNICEF Innovation for believing in our novel ideas that are yet to be tested and hopefully implemented 
            in the core curriculum. Capital is inevitably a really big engine to propel innovation for a sustainable future as what the time 
            and situation require, specifically in education. 

            Aside from financial support, we are extremely thankful to our mentors for the technical, operational, and business pieces of advice 
            during monthly calls.

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