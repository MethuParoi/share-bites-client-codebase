import overlaySource from "../../assets/hero/slider.png";

function HeroBanner({ source }) {
  return (
    <div className="relative flex items-center justify-center overflow-hidden">
      <div className="relative w-full h-full">
        <img
          className="w-screen object-cover lg:h-[35rem] h-[20rem] select-none pointer-events-none filter grayscale"
          src={source}
          alt=""
        />
        <img
          className="absolute top-0 left-0 w-screen object-contain lg:h-[35rem] h-[20rem] select-none pointer-events-none zoom-in zoom z-10"
          src={overlaySource}
          alt="Overlay"
        />
      </div>
    </div>
  );
}

export default HeroBanner;

{
  /* <div className="relative flex items-center justify-center">
      <div className="relative w-full h-full">
        <img
          className="w-screen object-cover lg:h-[35rem] h-[20rem] select-none pointer-events-none filter grayscale"
          src={source}
          alt=""
        />

        <img
          className="absolute top-0 left-0 w-screen object-contain lg:h-[35rem] h-[20rem] select-none pointer-events-none zoom z-10"
          src={overlaySource}
          alt="Overlay"
        />
      </div>
    </div> */
}
