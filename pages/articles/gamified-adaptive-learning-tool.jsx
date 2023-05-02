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
        <title>Stock Knowledge: Gamified adaptive learning tool</title>
        <meta
          property="og:url"
          content={`${process.env.WEBSITE_DOMAIN}/articles/gamified-adaptive-learning-tool`}
        />
        <meta property="og:type" content="article" />
        <meta property="fb:app_id" content={process.env.FACEBOOK_ID} />
        <meta
          property="og:title"
          content={`Gamified Adaptive Learning Tool - ${process.env.WEBSITE_NAME}`}
        />
        <meta property="og:description" content="Gamified Adaptive Learning Tool" />
        <meta
          property="og:image"
          content={`${process.env.WEBSITE_DOMAIN}"/images/articles/gamified-adaptive-learning/gamified-header.svg"`}
        />
      </Head>
      <MobileNavbar /> 
      <ArticleNavbar
        showModal={setLoginModalOpen}
        page="article"
        path="StockKnowledge: Gamified adaptive learning tool"
      />

      {loginModalOpen && (
        <ModalLayout
          providers={props.providers}
          showModal={setLoginModalOpen}
        />
      )}

      <div className="hero text-white px-10 py-10 space-y-2 md:w-full xs:w-screen">
        <h1 className="xl:text-6xl lg:text-5xl md:text-6xl sm:text-xl xs:text-xl xl:w-3/4 lg:w-3/4 md:w-full reno:w-full sm:w-full xs:w-full font-bold" style={{ lineHeight: '1.1' }}>
        Stock Knowledge: Gamified Adaptive Learning tool
        </h1>
        <br/>
        <i className="text-xl">Stock Knowledge is part of UNICEF’s Innovation Fund Investments in Skills and Connectivity</i>
        <p className="text-sm">Anna Marie Benzon, Founder & CEO, StockKnowledge Corp.</p>
      </div>
      <div className="md:-mt-5 xs:-mt-4 md:mb-8 xl:w-full lg:w-full md:w-full reno:w-full sm:w-screen xs:w-screen">
        <img
          className="mx-auto mt-20"
          src="/images/articles/gamified-adaptive-learning/gamified-header.svg"
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
          <a className="text-blue-400 hover:underline" href="https://www.unicef.org/innovation/innovation-fund-stockknowledge" target="_blank" rel="noopener noreferrer">
               Read the article here
            </a>
            <br/>13 July 2020
            <br/>
            <br/>
          <i className="text-xl">"Stock Knowledge is developing a secure and reliable gamification learning platform for students 
          and teachers that can effectively increase users’ aptitude."</i>
            <br />
            <br />
            
            The tool features a learning management system that allows teachers to share materials, conduct quizzes, 
            and track students’ activities and progress. It also has an interface that allows students to view  their 
            courses, tests, and performance statistics. In addition, the platform has an adaptive learning tool in which 
            contents are strategically designed for individualized learning
            <br />
            <br />
            The platform is bolstered with gamification features such as points, instant feedback, badges, and levels, which 
            make the learning process more motivating and engaging for students. Finally, the platform has a social network 
            that connects learners to one another for effective collaboration. It allows them to add their friends, and create 
            a study group and forum.
            <br />
            <br />
            <strong>FRONTIER TECHNOLOGY</strong> 
            <br />
            <br />
            Using extended reality can allow students to venture into subject areas through simulation, for example, by exploring 
            the subatomic world, studying parts of the body, exploring lava inside a volcano.  Moreover, based on a Harvard University 
            study in 2016, students using adaptive learning technology improved 58% more than the growth norms with just 60 minutes per week. 
            Therefore, using our advanced approach, students can quickly learn and understand difficult concepts like STEM subjects.
            <br />
            <br />
            <strong>OPEN SOURCE</strong>
            <br />
            <br />
            Having an open source solution in our business process, we make our technological progress faster and more efficient when a 
            potential million developers from around the world would contribute to our project as opposed to having a tiny group of developers 
            we have as a startup company. That said, we aim to form a Stock Knowledge developer community to welcome better ideas, thus, contributing 
            to build a more reliable, secure, cost-efficient, and flexible learning platform.
          </p>
          <figure>
          <img
            className="mx-auto mt-8"
            src="/images/articles/gamified-adaptive-learning/gamified-learning-img.png"/>
            <figcaption className="text-center italic py-1">Event by Stock Knowledge’s Digital Learning 2.0 held at De La Salle University last March 22, 2019.</figcaption>
          </figure>
           <br />
            <br />
            <strong>THE FOUNDING OF STOCK KNOWLEDGE</strong>
            <br />
            <br />
            With my background as a Physics teacher in college, I was frustrated with the huge gap between the academic needs of digitally 
            savvy learners and traditional teaching methods. Most of my students were bored with the chalk-and-talk method, and complained 
            about the frequent collapse of the learning platform that they were using.
            <br />
            <br />
            Although there are existing online learning tools for blended learning, I’ve observed that many students as well as teachers 
            still preferred Facebook to interact with their peers. However, based on my experience, this was not enough, and led me to 
            create a user-friendly learning management system (LMS), which later became Stock Knowledge. 
            <br />
            <br />
            Although the first version may have lots of limitations in asset quality and functionality, and 
            longer development time. We are considering maximizing its advantages in terms of cost, faster 
            loading, and deployment time (cross-platform) as we continue to develop the product.
            <br />
            <br />
            <strong>TEAM</strong>
            <br />
            <br />
            Today, we are a team of scientists, engineers, educators, and entrepreneurs to ensure that every element of a learning program
            is delivered seamlessly from concept to completion.
            <br />
            <br />
            The way we onboard team members is simply based on the right attitude and meritocracy to deliver the best service to our clients. 
            Although most of our members have impressive corporate and academic backgrounds, including science and engineering Ph.Ds and masters 
            from top international business schools, we also hire young professionals who don’t necessarily have college degrees. 
            <br />
            <br />
            <strong>WAY AHEAD</strong>
            <br />
            <br />
            UNICEF's Venture Fund investment will help us deploy an open-source learning platform necessary for digital education that will be 
            more reliable, secure, and more powerful that’s much needed especially during COVID-19, which has forced schools to go online. 
            The good news is that our mobile app will have an offline mode for students who have Internet connectivity challenges. 
            <br />
            <br />
            Our vision is to contribute to the future of learning and as an Innovation Fund investee, we will be better positioned to achieve our mission.
            We hope to scale our solution to empower students and teachers with new learning tools. We are also extremely excited to meet our 
            fellow startups in the cohort, and look forward to co-creating, networking, and potentially collaborating as we develop our solutions.
            <br />
            <br />
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