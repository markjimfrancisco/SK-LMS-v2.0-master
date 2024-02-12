import { useState, useEffect } from "react";
// import fetch from "isomorphic-unfetch";
// import data from "../pages/api/contents/carousel.json";

export const useArticlesHook = () => {
  const [slides, setSlides] = useState(null);
  useEffect(() => {
    setSlides([
      [

        {
          id: 0,
          // image: "/images/articles/vr-ar-platform/vr-ar-v2-coverrr.png",
          image: "/images/articles/wef-event/wef-event-cover.jpg",
          header: "SK CEO Anna Marie Benzon Shines at World Economic Forum in China",
          title: "Stock Knowledge CEO Anna Marie Benzon Represents Company at Prestigious World Economic Forum in China",
          link: "/articles/wef-event-article"
        },

        {
          id: 1,
          // image: "/images/articles/vr-ar-platform/vr-ar-v2-coverrr.png",
          image: "/images/articles/wharton-shortlisted/wharton-updated-img.png",
          header: "Wharton - QS Reimagine Education Awards",
          title: "Stock Knowledge Gamified Immersive Learning Platform is one of the finalists for the Wharton-QS Reimagine Education Awards",
          link: "/articles/wharton-shortlisted"
        },

        {
          id: 2,
          // image: "/images/articles/vr-ar-platform/vr-ar-v2-coverrr.png",
          image: "/images/articles/tuguegarao-science/tuguegarao-updated-img.png",
          header: "SK Sponsors Brigada Eskwela for Tuguegarao City High School",
          title: "Empowering Education: Stock Knowledge Sponsors Brigada Eskwela for Tuguegarao City Science High School with Gamified Immersive Learning Platform and Technical Assistance School",
          link: "/articles/tuguegarao-science-article"
        },
        {
          id: 3,
          image: "/images/articles/manila-science/manila-sci-cover.png",
          header: "SK and Manila Science High School Collaboration",
          title: "Stock Knowledge and Manila Science High School Collaborate for Innovative Education Delivery Through Brigada Eskwela Program",
          link: "/articles/manila-science-article",
        },
      ],
      [
        {
          id: 4,
          image: "/images/articles/vr-ar-platform/VRAR-updated-img.png",
          header: "VR/AR platform for gamified learning",
          title: "Stock Knowledge: VR/AR platform for gamified learning of STEM subjects",
          link: "/articles/vr-ar-platform",
        },

        {
          id: 5,
          image: "/images/articles/gamified-adaptive-learning/gamified-updated-img.png",
          header: "Gamified adaptive learning tool",
          title: "Stock Knowledge is part of UNICEF’s Innovation Fund Investments in Skills and Connectivity",
          link: "/articles/gamified-adaptive-learning-tool",

        },
        {
          id: 6,
          image: "/images/articles/learning-in-the-digital-age/digital-age-updated-img.png",
          header: "Learning in the Digital Age",
          title: "Learning in the Digital Age: Gearing Towards Education 4.0. On the 18th of November 2019, Stock Knowledge made an anticipated visit to the University of the Philippines Los Baños",
          link: "/articles/learning-in-the-digital-age",
        },
      ],
      [
        {
          id: 7,
          image: "/images/articles/stock-knowledge-at-itu/sk-itu-updated-img.png",
          header: "Stock Knowledge at ITU",
          title: "Stock Knowledge at ITU Telecom World 2019 in Budapest. Following the accomplishment of the company in Hong Kong, September 10, 2019 is yet another day to remember",
          link: "/articles/stock-knowledge-at-itu",
        },
        {
          id: 8,
          image: "/images/articles/stock-knowledge-at-rise/sk-rise-updated-img.png",
          header: "Stock Knowledge at RISE",
          title: "Stock Knowledge at RISE Hong Kong 2019. On one of the most unforgettable days of the year, Stock Knowledge, together with 27 other start-ups ",
          link: "/articles/stock-knowledge-at-rise",
        },
        {
          id: 9,
          image: "/images/articles/digital-learning-2.0/digital-2.0-updated-img.png",
          header: "Digital Learning 2.0",
          title: "Learning in the age of Industry 4.0. Love is lovelier the second time around and so is learning. With the success of our first forum",
          link: "/articles/digital-learning-2.0",
        },
      ],
      [
        {
          id: 10,

          image: "/images/articles/digital-learning-1.0/digital-1.0-updated-img.png",
          header: "Digital Learning 1.0",
          title: "On March 2, 2019 Stock Knowledge organized an open forum attended by college students from different top universities",
          link: "/articles/sk-mobile-app-open-beta",
        },
        {
          id: 11,
          image: "/images/articles/sk-mobile-app-open-beta/open-beta-updated-img.png",
          header: "SK App Open Beta",
          title: "Stock Knowledge XR Mobile App (Open Beta) Is Now Available for Download! A Unique Learning Experience for Students and Teachers. The Stock Knowledge team has been hard at work the",
          link: "/articles/sk-mobile-app-open-beta",
        },
        {
          id: 12,
          image: "/images/articles/new-look-same-goal/newlook-samegoal-updated-img.png",
          header: "New look, Same Goal",
          title: "New look, same goals here’s Stock Knowledge’s promise to the future. Introducing the new Stock Knowledge logo",
          link: "/articles/new-look-same-goals",
        },
      ],
    ]);
  }, []);

  return slides;
};
