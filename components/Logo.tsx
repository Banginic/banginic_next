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
      <p className={`${props.textSize} montserrat  font-bold bg-gradient-to-tr from-accent via-pink-400 to-blue-400 bg-clip-text text-transparent`}>Banginic</p>
    </div>
  );
}

export default Logo;
