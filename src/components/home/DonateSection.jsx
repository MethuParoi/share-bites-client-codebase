import bgImg from "../../assets/home/card-img-1.jpg";
const DonateSection = () => {
  return (
    <div
      className="xl:max-w-[1300px] mx-auto flex md:flex-row items-center md:gap-x-10 md:justify-around flex-col gap-y-8 md:gap-y-0 py-16"
      id="donation-section"
    >
      <div className="w-[90vw] md:w-[40vw] relative">
        <img
          className="h-[350px] sm:h-[420px] w-[750px] rounded-xl"
          src={bgImg}
          alt=""
        />
      </div>
      <div className="w-[90vw] md:w-[40vw]">
        <p className="amatic-font text-secondary sm:text-5xl text-4xl font-semibold">
          SAFE + EASY DONATIONS
        </p>
        <h2 className="sm:text-5xl text-4xl font-semibold mt-5 mb-8 quicksand-font text-gray-700">
          Helping Today, Helping <span className="xl:block">Tomorrow</span>
        </h2>
        <p className="text-lg font-medium text-gray-600 ">
          Your donation can help us to provide food to the needy people. We
          accept all types of food donations. You can donate food items like
          rice, wheat, vegetables, fruits, etc.
        </p>
        <div className="flex justify-start items-center mt-8">
          <button
            onClick={() =>
              window.open(
                "https://www.savethechildren.org/us/ways-to-help/ways-to-give",
                "_blank"
              )
            }
            className="bg-secondary hover:bg-teal-600 text-white text-2xl font-semibold px-5 py-2 rounded-lg"
          >
            Donate Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonateSection;
