import { githup, metaData, placeholdeImage } from "../assets/assets";

function Github() {
  return (
    <a
      href={metaData.githup_url}
      className=""
      target="self"
      title="Go to our Githup page"
    >
      <img src={githup} width={35} alt={placeholdeImage} className="" />
    </a>
  );
}

export default Github;
