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
		toLogin ? "/login/auth" : null,
	);

	useEffect(() => {
		if (session) {
			setToLogin(true);
		}
	}, [session]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
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
				<title>
					Stock Knowledge CEO Anna Marie Benzon Represents Company at
					Prestigious World Economic Forum in China
				</title>
				<meta
					property="og:url"
					content={`${process.env.WEBSITE_DOMAIN}/articles/wef-event-article`}
				/>
				<meta property="og:type" content="article" />
				<meta property="fb:app_id" content={process.env.FACEBOOK_ID} />
				<meta
					property="og:title"
					content={`Stock Knowledge CEO Anna Marie Benzon Represents Company at Prestigious World Economic Forum in China - ${process.env.WEBSITE_NAME}`}
				/>
				<meta
					property="og:description"
					content="Stock Knowledge CEO Anna Marie Benzon Represents Company at Prestigious World Economic Forum in China"
				/>
				<meta
					property="og:image"
					content={`${process.env.WEBSITE_DOMAIN}/images/articles/wef-event/wef-event-cover.jpg`}
				/>
			</Head>
			<MobileNavbar />
			<ArticleNavbar
				showModal={setLoginModalOpen}
				page="article"
				path="Stock Knowledge CEO Anna Marie Benzon Represents Company at Prestigious World Economic Forum in China"
			/>

			{loginModalOpen && (
				<ModalLayout
					providers={props.providers}
					showModal={setLoginModalOpen}
				/>
			)}

			<div className="hero text-white px-10 py-10 space-y-2 md:w-full xs:w-screen">
				<h1
					className="xl:text-6xl lg:text-5xl md:text-6xl sm:text-xl xs:text-xl xl:w-3/4 lg:w-3/4 md:w-full reno:w-full sm:w-full xs:w-full font-bold"
					style={{ lineHeight: "1.1" }}
				>
					Stock Knowledge CEO Anna Marie Benzon Represents Company at
					Prestigious World Economic Forum in China
				</h1>

				<p className="text-sm">
					Anna Marie Benzon, Founder & CEO, StockKnowledge Corp.
				</p>
			</div>
			<div className="md:-mt-5 xs:-mt-4 md:mb-8 xl:w-full lg:w-full md:w-full reno:w-full sm:w-screen xs:w-screen">
				<img
					className="mx-auto mt-20"
					src="/images/articles/wef-event/wef-event-cover.jpg"
					alt="Wef Event"
				/>
			</div>
			<div className="md:w-full xs:w-screen flex justify-between lg:px-48 md:px-20 reno:px-20 sm:px-20 xs:px-20 text-gray-500 lg:flex-row xs:flex-col">
				<div className="xl:w-1/4 lg:w-1/4 md:w-1/4 reno:w-1/4 sm:w-full xs:w-full">
					<p>Share this article</p>
					<div className="w-full h-10 flex items-center text-blue space-x-2">
						<FacebookShareButton url="https://facebook.com/stockknowledge_">
							<FacebookIcon size={36} />
						</FacebookShareButton>

						<TwitterShareButton url="https://twitter.com/stockknowledge_">
							<TwitterIcon size={36} />
						</TwitterShareButton>

						<LinkedinShareButton url="https://www.linkedin.com/company/stock-knowledge/">
							<LinkedinIcon size={36} />
						</LinkedinShareButton>
					</div>
				</div>
				<div className="xl:w-11/12 lg:w-11/12 md:w-11/12 reno:w-11/12 sm:w-full xs:w-full leading-relaxed text-justify">
					<p className="leading-relaxed">
						<i className="text-xl">
							June 30, 2023 - Tianjin, China: The Annual Meeting of the New
							Champions, hosted by the World Economic Forum, concluded
							successfully on June 29, 2023, in Tianjin, China. This notable
							event, widely recognized as the "Summer Davos," was attended by
							Anna Marie Benzon, the CEO of the innovative firm Stock Knowledge.
							The three-day conference, held from June 27 to 29, focused on the
							theme "Entrepreneurship: The Driving Force of the Global Economy,"
							attracting over 1,500 leaders from different sectors worldwide.{" "}
						</i>
						<br />
						<br />
						Stock Knowledge, under Benzon's leadership, achieved a significant
						milestone at the event by being named one of the Technology Pioneers
						of 2023. This prestigious recognition is awarded to early-stage
						companies around the globe that are known for their groundbreaking
						technologies and potential societal impact. Stock Knowledge joins
						the ranks of previous awardees, including industry giants like
						Google and Spotify.
						<br />
						<br />
						The meeting's agenda revolved around crucial topics such as economic
						growth, China's global role, energy transition, environmental
						conservation, consumer trends post-pandemic, and the deployment of
						innovation. The forum served as a platform for launching and
						advancing over 25 high-impact initiatives, aimed at fostering
						collaboration and driving economic recovery.
						<br />
						<br />
						Anna Marie Benzon's participation in the forum provided a
						significant opportunity for Stock Knowledge to expand its
						international network, explore new partnerships, and showcase its
						innovative solutions to a global audience. Her presence underscored
						the company's commitment to being at the forefront of technological
						innovation and its role in shaping the future of the global economy.
						<br />
						<br />
						The selection of Stock Knowledge as a Technology Pioneer underscores
						the company's influence in the edutech industry and its potential to
						make a significant contribution to solving pressing issues in
						education and the economy, as well as benefiting society as a whole.
						<br />
						<br />
						For a more detailed report, please refer to our pdf file: <br />
						<a
							href="/images/articles/wef-event/wef-event-article.pdf"
							className="text-blue-500"
						>
							World Economic Forum - Annual Meeting of the New Champions 2023
						</a>
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
