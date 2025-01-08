import { useState, useEffect } from "react";
import { PortableText } from "@portabletext/react";

const category = ["All", "integrations", "technology", "frameworks"];

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
      <section className="portfolio-section container mx-auto font-Roboto py-20">
        <h4 className="text-center text-4xl text-primaryColor">Blogs</h4>
        <div className="flex flex-wrap justify-center mx-4 py-6 mt-4 text-xl">
          {category.map((item, index) => (
            <button
              key={index}
              className={`mx-2  text-primaryColor hover:text-secondaryColor transition-all ease-in-out cursor-pointer capitalize ${activeFilter === item ? "font-semibold" : "text-secondaryColor opacity-50"
                }`}
              onClick={() => handleFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 m mt-10 py-3 px-3"  >
          {filterWork.map((blogItem) => (
            <div key={blogItem.slug?.current} className="flex flex-col h-full" data-aos={blogItem?.animate}>
              <a
                href={`/blogs/${blogItem.slug?.current}`}
                externalInNewTab={true}

              >
                <div className="w-auto h-full file:rounded overflow-hidden projects-card">
                  <img
                    className="w-full object-cover h-64 object-center"
                    src={blogItem?.BackgroundImage?.asset?.url}
                  />
                  <div className="p-6 flex flex-wrap justify-between">
                    <div>
                      <div className="font-extrabold text-base mb-2 text-primaryColor">
                        {blogItem?.projectName}
                      </div>
                      <div className="p capitalize border inline-block br-2 bg-primaryColor rounded-md py-1 px-2">
                        <p className="text-sm text-gray-700">
                          {blogItem?.Category}
                        </p>
                      </div>
                      <div className="py-4 text-sm md:text-base h-auto blog-content text-secondaryColor font-Roboto w-full">
                        <PortableText
                          value={blogItem.excerpt}
                        />
                      </div>
                    </div>
                    <div className="">
                      <a
                        href={`/blogs/${blogItem.slug?.current}`}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-primaryColor bg-slate-700 rounded-lg hover:bg-slate-500 hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
