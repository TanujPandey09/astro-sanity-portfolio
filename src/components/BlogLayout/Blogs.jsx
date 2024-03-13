import { useState, useEffect } from "react";
import { PortableText } from "@portabletext/react";

const category = ["All", "integrations", "technology"];

export default function Blogs({ blogData }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [blogsData, setBlogsData] = useState(blogData);
  const [filterWork, setFilterWork] = useState(blogData);

  const handleFilter = (item) => {
    setActiveFilter(item);
  };

  useEffect(() => {
    if (activeFilter === "All") {
      setFilterWork(blogsData);
    } else {
      setFilterWork(blogsData.filter((blog) => blog.Category === activeFilter));
    }
    console.log("Filtered Data:", filterWork);
  }, [activeFilter, blogsData]);

  return (
    <>
      <section className="portfolio-section container mx-auto font-Roboto">
        <h4 className="text-center text-5xl text-white">Blogs</h4>
        <div className="flex flex-wrap justify-center mx-2 py-6  text-2xl">
          {category.map((item, index) => (
            <button
              key={index}
              className={`mx-2 hover:text-slate-200 transition-all ease-in-out cursor-pointer capitalize ${
                activeFilter === item ? "font-semibold text-slate-200" : ""
              }`}
              onClick={() => handleFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mt-10 py-3 px-3">
          {filterWork.map((blogItem) => (
            <div key={blogItem.slug?.current}>
              <a
                href={`/blogs/${blogItem.slug?.current}`}
                externalInNewTab={true}
              >
                <div className="max-w-full rounded overflow-hidden bg-white">
                  <img
                    className="w-full"
                    src={blogItem?.BackgroundImage?.asset?.url}
                    alt=""
                  />
                  <div className="px-6 py-4">
                    <div className="font-extrabold text-lg mb-2">
                      {blogItem?.projectName}
                    </div>
                    <div className="p capitalize border w-2/4 br-2">
                      <p>{blogItem?.Category}</p>
                    </div>
                    <div className="py-4">
                      <PortableText
                        className="text-sm mb-2 font-Roboto blog-content"
                        value={blogItem?.excerpt}
                      />
                    </div>
                    <div>
                      <a
                        href={`/blogs/${blogItem.slug?.current}`}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-buttonBg rounded-lg hover:bg-slate-500 hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Read more
                        <svg
                          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
