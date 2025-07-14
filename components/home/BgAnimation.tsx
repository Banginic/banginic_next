import { motion_lines } from "@/assets/photos";
import styles from "./home.module.css";
import Image from "next/image";

function BgAnimation() {
  return (
    <div className="bg-animation">
      {[1, 2].map((_, index) => (
        <div
          key={index}
          className={` ${styles.translatex_lines}  size-72  z-0 blur-lg`}
        >
          <Image alt={"./placeholder.png"} className="size-full" width={300} src={motion_lines} />
        </div>
      ))}

      <div className={` ${styles.translatexy_lines}  size-72  z-0 blur-lg`}>
        <Image alt={"./placeholder.png"} className="size-full" width={200} src={motion_lines} />
      </div>
      <div className={` ${styles.translatey_lines}  size-72  z-0 blur-lg`}>
        <Image alt={"./placeholder.png"} className="size-full" width={200} src={motion_lines} />
      </div>
    </div>
  );
}

export default BgAnimation;
