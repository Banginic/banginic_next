import { logo } from "@/assets/photos";
import Image from "next/image";


type Props = {
  textSize: string;
  logoSize: number;
};
function Logo(props: Props) {
  return (
    <div className="flex items-center gap-2">
      <Image
        width={props.logoSize}
        alt={"./placeholder.png"}
        src={logo}
      />
      <p className={`${props.textSize} montserrat  `}>Banginic</p>
    </div>
  );
}

export default Logo;
