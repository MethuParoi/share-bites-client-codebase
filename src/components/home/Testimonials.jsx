import { SiComma } from "react-icons/si";
import img1 from "../../assets/home/testimonials_01.jpg";
import img2 from "../../assets/home/testimonials_02.jpg";

const Testimonials = () => {
  return (
    <div
      className="xl:max-w-[1300px] mx-auto flex lg:flex-row items-center lg:gap-x-10 md:justify-around flex-col-reverse gap-y-6 lg:gap-y-0 py-16 dark:text-gray-200"
      id="donation-section"
    >
      <div className="w-[90vw] lg:w-[32vw]">
        <div className="flex justify-start">
          <SiComma className="text-5xl text-gray-500" />
          <SiComma className="text-5xl text-gray-500 ml-[-15px]" />
        </div>
        <p className="text-lg text-gray-600  bg-white p-5 rounded-xl lg:line-clamp-6 xl:line-clamp-none">
          This food donation platform has been a lifesaver for our community.
          The process is seamless, and the support from the team is incredible.
          We&apos;ve been able to help so many families in need, and the impact
          has been truly heartwarming. Thank you for making this possible!
        </p>
        <div className="flex justify-end items-center mt-5">
          <div className="flex flex-col items-end">
            <p className="text-gray-700 dark:text-gray-200 font-semibold mr-3 text-2xl">
              Ann Peterson
            </p>
            <p className="amatic-font text-secondary dark:text-gray-400 font-semibold text-3xl mr-3">
              Volunteer
            </p>
          </div>
          <img
            className="w-16 h-16 rounded-full border-4 border-secondary"
            src={img1}
            alt=""
          />
        </div>
      </div>
      <div className="w-[90vw] lg:w-[32vw]">
        <div className="flex justify-start">
          <SiComma className="text-5xl text-gray-500" />
          <SiComma className="text-5xl text-gray-500 ml-[-15px]" />
        </div>
        <p className="text-lg text-gray-600  bg-white p-5 rounded-xl lg:line-clamp-6 xl:line-clamp-none">
          I am so grateful for this platform. It has allowed me to donate excess
          food from my restaurant to those who need it most. The interface is
          user-friendly, and the team is always ready to assist. It&apos;s a
          wonderful initiative that brings the community together.
        </p>
        <div className="flex justify-end items-center mt-5">
          <div className="flex flex-col items-end">
            <p className="text-gray-700 dark:text-gray-200 font-semibold mr-3 text-2xl">
              John Doe
            </p>
            <p className="amatic-font text-secondary dark:text-gray-400 font-semibold text-3xl mr-3">
              Volunteer
            </p>
          </div>
          <img
            className="w-16 h-16 rounded-full border-4 border-secondary"
            src={img2}
            alt=""
          />
        </div>
      </div>

      <div className="w-[90vw] lg:w-[40vw] lg:ml-10">
        <p className="amatic-font text-secondary dark:text-gray-400 sm:text-5xl text-4xl font-semibold">
          testimonials
        </p>
        <h2 className="sm:text-5xl text-4xl font-semibold mt-5 mb-8 quicksand-font text-gray-700 dark:text-gray-200">
          What People Say <span className="xl:block">About Us</span>
        </h2>
        <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
          We continually experiment. We fail quickly and productively. We use
          data and feedback to guide our course.
        </p>
      </div>
    </div>
  );
};

export default Testimonials;
