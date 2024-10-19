import React from "react";
import Headings from "../utiliti/heading/Heading";
import imgbest from "../../assets/about.jpg"
export const Bestfeaturs = () => {
  const features = [
    {
      icon: <i className="fa-regular fa-handshake" />, // Correctly use JSX for Font Awesome icons
      title: "One-on-One Mentoring",
      description:
        "Each student at TLT Judicial Academy receives personalized attention through one-on-one mentoring sessions. This individualized approach ensures that every student's unique needs and challenges are addressed effectively.",
    },
    {
      icon: <i className="fa-solid fa-book-open-reader"></i>,
      title: "Result Centric Preparation",
      description:
        "We prioritize practical success by focusing on strategies and techniques that lead to favorable outcomes in judiciary examinations. Our tailored approach ensures that students are well-prepared to achieve their desired results.",
    },
    {
      icon: <i className="fa-solid fa-head-side-virus"></i>,
      title: "Doubt Clearing Sessions with Quick redressal",
      description:
        "We understand the importance of addressing students' doubts promptly. That's why we offer dedicated doubt-clearing sessions with swift resolution, ensuring that no question goes unanswered and students can progress with confidence.",
    },
  ];

  return (
    <section className="py-5">
      <div className="px-5 md:px-8 xl:px-20 ">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-1/2 flex">
            <div
              className="w-full bg-cover bg-center "

              // Uncomment and update the URL accordingly
              // style={{ backgroundImage: 'url(../../assets/about.jpg)' }}
            >
              <img src={imgbest} alt="" className="h-full w-full cover" />
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex items-center ps-0 lg:ps-10">
            <div className="mt-10">
              <Headings
                heading={"h4"}
                style={"inline-block tracking-wider text-shadow "}
              >
                Learn with us
              </Headings><br />
              <Headings
                heading={"h2"}
                style={"inline-block tracking-wider text-shadow"}
              >
                Benefits About
                <span className="text-primary"> TLT Expertise</span>
              </Headings>
              <div className="mt-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="w-full flex items-stretch mb-4 rounded-2xl border p-4 hover:bg-red-500 hover:text-white shadow-red-600 hover:shadow-xl transition duration-500 ease-in-out hover:translate-x-2 hover:scale-104"
                  >
                    <div className="flex">
                      <div className="icon p-5 text-5xl">
                        {feature.icon} {/* Render the icon directly */}
                      </div>
                      <div>
                        <Headings heading={"h5"}>{feature.title}</Headings>
                        <p className="mb-0 text-gray">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bestfeaturs;
