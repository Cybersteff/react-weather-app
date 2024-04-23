import image1 from "./01d.svg";
import image2 from "./01n.svg";
import image3 from "./02d.svg";
import image4 from "./02n.svg";
import image5 from "./03d.svg";
import image6 from "./03n.svg";
import image7 from "./04d.svg";
import image8 from "./04n.svg";
import image9 from "./09d.svg";
import image10 from "./09n.svg";
import image11 from "./10d.svg";
import image12 from "./10n.svg";
import image13 from "./11d.svg";
import image14 from "./11n.svg";
import image15 from "./13d.svg";
import image16 from "./13n.svg";
import image17 from "./50d.svg";
import image18 from "./50n.svg";

const imageObj = {
  "01d": image1,
  "01n": image2,
  "02d": image3,
  "02n": image4,
  "03d": image5,
  "03n": image6,
  "04d": image7,
  "04n": image8,
  "09d": image9,
  "09n": image10,
  "10d": image11,
  "10n": image12,
  "11d": image13,
  "11n": image14,
  "13d": image15,
  "13n": image16,
  "50d": image17,
  "50n": image18,
};
export const IMAGES = ({ code }) => {
  const icon = Object.keys(imageObj).find((key) => key === code);
  if (icon) {
    return <img src={imageObj[icon]} alt="" />;
  }
};
