const ArticleCarouselContent = (props) => {
  const { slide } = props;

  return (
    <div className="relative overflow-hidden w-full text-center flex justify-around space-x-10">
      {slide &&
        slide.map((article) => {
          return (
            <div key={article.id} className="w-screen md:w-full lg:w-full space-y-4">
              <div className="bg-white h-full shadow-xl hover:shadow-2xl transform hover:bg-transparent transition duration-500 hover:scale-90 w-full">
                <img className="w-full" src={article.image} alt="" />
                <div className="p-4">
                  <div className="text-left">
                    <a href={article.link} className="text-blue-500 font-bold 1080:text-base lg:text-base reno:text-base md:text-sm sm:xs:text-xs xxs:text-xs">
                      {article.header}
                    </a>
                    <br />
                    <br />
                    <a href={article.link} className="1080:text-base lg:text-sm reno:text-sm md:text-sm sm:xs:text-xs xxs:text-xs">
                      {article.title.length > 30
                        ? `${article.title.substring(0, 100)}...`
                        : article.title}
                    </a>
                    <a href={article.link} className="flex items-end text-blue-500">
                      <br />
                      <br />
                      <p className="text-blue-500 md:text-sm sm:xs:text-xs xxs:text-xs">Read More</p>
                      <svg
                        className="h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </a>
                  </div>
                  <p className="text-gray-700">{article.description}</p>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
export default ArticleCarouselContent;
