import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { placeholdeImage } from "../assets/assets";
type Props = {
  textSize: string;
  logoSize: string;
};
function Logo(props: Props) {
  return (
    <div className="flex items-center gap-2">
      <LazyLoadImage
        className={props.logoSize}
        alt={placeholdeImage}
        effect="blur"
        aria-label={`Logo photo`}
        wrapperProps={{
          style: { transition: "1s" },
        }}
        src="/banginic_logo.png"
      />
      <p className={`${props.textSize} montserrat  `}>Banginic</p>
    </div>
  );
}

export default Logo;
