import { useState, useEffect } from "react";
// import fetch from "isomorphic-unfetch";
// import data from "../pages/api/contents/carousel.json";

export const useCarouselHook = () => {
  const [slides, setSlides] = useState(null);
  useEffect(() => {
    setSlides([
      {
        "id": 0,
        "image": "images/ourstory/company-1.jpg",
        "header": "",
        "paragraph": ""
      },
      {
        "id": 1,
        "image": "images/ourstory/company-2.jpg",
        "header": "",
        "paragraph": ""
      },
      {
        "id": 2,
        "image": "images/ourstory/company-3.jpg",
        "header": "",
        "paragraph": ""
      },
      {
        "id": 3,
        "image": "images/ourstory/company-4.jpg",
        "header": "",
        "paragraph": ""
      }
    ]
    );
  }, []);

  return slides;
};
