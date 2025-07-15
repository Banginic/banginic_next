import { metaData } from "@/assets/assets";
import { githup } from "@/assets/photos";
import Image from "next/image";

function Github() {
  return (
    <a
      href={metaData.githup_url}
      className=""
      target="self"
      title="Go to our Githup page"
    >
      <Image src={githup} width={35} alt={"./placeholder.png"} className="" />
    </a>
  );
}

export default Github;
