import Image from "next/image";
import figma from '@/public/dev_icons/figma_p.png'
import wordpress from '@/public/dev_icons/wordpress_p.png'
import react from '@/public/dev_icons/react_p.png'
import mySql from '@/public/dev_icons/mySql_p.png'
import dart from '@/public/dev_icons/dart_p.png'
import nextjs from '@/public/dev_icons/figma_p.png'
import git from '@/public/dev_icons/git_p.png'
import mongodb from '@/public/dev_icons/mongodb_p.png'
import nodejs from '@/public/dev_icons/nodejs_p.png'
import python from '@/public/dev_icons/python_p.png'

function Skills() {
  const frameworks = [
    { name: "Figma", percent: "92%", icon: figma},
    { name: "WordPress", percent: "99%", icon: wordpress },
    { name: "React", percent: "97%", icon: react },
    { name: "TypeScript", percent: "95%", icon: mySql },
    { name: "Dart", percent: "91%", icon: dart },
    { name: "Nextjs", percent: "90%", icon: nextjs },
    { name: "Git", percent: "96%", icon: git },
    { name: "MongoDb", percent: "88%", icon: mongodb },
    { name: "Nodejs", percent: "91%", icon: nodejs },
    { name: "Python", percent: "95%", icon: python},
  ];

  const cards = [...frameworks, ...frameworks];

  return (
    <section className=" p-5 relative backdrop-blur-sm bg-black/20 shadow overflow-hidden  rounded-md w-full py-8 mx-auto">
      <h4 className="text-3xl lg:text-4xl text-center font-bold bg-gradient-to-r from-accent via-pink-400 mt-4 to-blue-400 bg-clip-text text-transparent montserrat py-2  mb-12">
        Software and framework we use
      </h4>
      <div className="pointer-events-none absolute top-0 left-0 h-full w-16 bg-gradient-to-r  to-transparent z-10" />
      <div className="pointer-events-none absolute top-0 right-0 h-full w-16 bg-gradient-to-l  to-transparent z-10" />

      <div className="flex relative gap-10 whitespace-nowrap overflow-hidden scroll-content w-full ">
        {cards &&
          cards.map((skill, index) => {
            return (
              <div
                className="text-center animate-scroll  group:hover:[animation-play-state:paused] "
                key={index}
              >
                <div
                  className="backdrop-blur-sm bg-purple-400/10 cursor-pointer flex flex-col items-center gap-3 shadow-lg hover:bg-blue-900/20 trans
             rounded-lg w-[140px] md:w-[160px] h-[160px] md:lg-[180px] pt-[var(--md-padding)] "
                >
                  <Image
                    className=" size-[60px] "
                    alt={"./placeholder.png"}
                    width={300}
                    src={skill.icon}
                  />
                  <p className=" text-2xl">{skill.percent}</p>
                </div>
                <p className="pt-4 text-pink-200 text-lg">{skill.name}</p>
              </div>
            );
          })}
      </div>
      <style>{`
      .scroll-content{
      animation:scrolling 20s linear infinite
      }
        @keyframes scrolling {
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-1 * 200 * 8)); }
}
        }
      `}</style>
    </section>
  );
}

export default Skills;
