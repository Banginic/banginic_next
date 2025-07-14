import {
  instagram,
  facebook,
  whatsApp_logo,
  linkedin,
  twitter,
  githup,
  person,
} from "@/assets/photos";
interface Props {
  githup?: string;
  facebook?: string;
  linkedin?: string;
  twitter?: string;
  whatsApp?: string;
  instagram?: string;
}
import Image from "next/image";
function SocialLinks(props: { links: Props }) {
  return (
    <div className="flex items-center gap-1">
      {props.links?.githup && (
        <a href={props.links?.githup} target="blank" className="cursor-pointer">
          <Image
            className="size-7 md:size-6 md:hover:scale-110 hover:opacity-90 trans bg-w"
            src={githup}
            loading="lazy"
            aria-label="Social link image"
            alt={'./placeholder.png'}
          />
        </a>
      )}
      {props.links?.linkedin && (
        <a
          href={props.links?.linkedin}
          target="blank"
          className="cursor-pointer dark:bg-gray-900 rounded-ful"
        >
          <Image
            className="size-7 md:size-6 md:hover:scale-110 hover:opacity-90 trans"
            src={linkedin}
          width={30}
            aria-label="Social link image"
            alt={'./placeholder.png'}
          />
        </a>
      )}
      {props.links?.facebook && (
        <a
          href={props.links?.facebook}
          target="blank"
          className="cursor-pointer dark:bg-gray-900"
        >
          <Image
            className="size-7 md:size-6 md:hover:scale-110 hover:opacity-90  trans"
            src={facebook}
            width={30}
            aria-label="Social link image"
            alt={'./placeholder.png'}
          />
        </a>
      )}
      {props.links?.instagram && (
        <a
          href={props.links?.instagram}
          target="blank"
          className="cursor-pointer dark:bg-gray-900"
        >
          <Image
            className="size-7 md:size-6 md:hover:scale-110 hover:opacity-90 trans"
            src={instagram}
           width={30}
            aria-label="Social link image"
            alt={'./placeholder.png'}
          />
        </a>
      )}
      {props.links?.whatsApp && (
        <a
          href={props.links?.whatsApp}
          target="blank"
          className="cursor-pointer dark:bg-gray-900"
        >
          <Image
            className="size-7 md:size-6 md:hover:scale-110 hover:opacity-90 trans"
            src={whatsApp_logo}
            loading="lazy"
            aria-label="Social link image"
            alt={'./placeholder.png'}
          />
        </a>
      )}
      {props.links?.twitter && (
        <a
          href={props.links?.twitter}
          target="blank"
          className="cursor-pointer dark:bg-gray-900"
        >
          <Image
            className="size-7 md:size-6 md:hover:scale-110 hover:opacity-90 trans"
            src={twitter}
            loading="lazy"
            aria-label="Social link image"
            alt={'./placeholder.png'}
          />
        </a>
      )}
    </div>
  );
}

export default SocialLinks;
