import styles from "./home.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function BgAnimation() {
  return (
    <div className="bg-animation">
      {[1, 2].map((_, index) => (
        <div
          key={index}
          className={` ${styles.translatex_lines}  size-72  z-0 blur-lg`}
        >
          <LazyLoadImage
            alt={""}
            className="size-full"
            effect="blur"
            aria-label="decorative image"
             loading="lazy"
            wrapperProps={{
              style: { transition: "1s" },
            }}
            src="/lines.png"
          />
        </div>
      ))}

      <div className={` ${styles.translatexy_lines}  size-72  z-0 blur-lg`}>
        <LazyLoadImage
          alt={""}
          className="size-full"
          effect="blur"
          aria-label="decorative image"
           loading="lazy"
          wrapperProps={{
            style: { transition: "1s" },
          }}
          src="/lines.png"
        />
      </div>
      <div className={` ${styles.translatey_lines}  size-72  z-0 blur-lg`}>
        <LazyLoadImage
          alt={""}
          className="size-full"
          effect="blur"
          aria-label="decorative image"
           loading="lazy"
          wrapperProps={{
            style: { transition: "1s" },
          }}
          src="/lines.png"
        />
      </div>
    </div>
  );
}

export default BgAnimation;
