import DevTroll from "@/assets/images/jpg/DevTroll.jpg";
import PersonalPic from "@/assets/images/jpg/photoPersonal.png";
import PersonalDescription from "@/components/Home/PersonalDescription";
import ImageHolder from "@/components/motions/ImageHolder";
import InformationsNumbers from "@/components/Home/InformationsNumbers";
import Services from "@/components/Home/Services";
import Technologies from "@/components/Home/Technologies";
import Projects from "@/components/Home/projects";
import LoadingCubes from "@/components/motions/LoadingCubes";

export default function Home() {
  return (
    <div className="mt-10 w-full h-full container flex gap-8 xl:gap-10 flex-col justify-center items-center">
      <section className="relative w-full h-full flex flex-col items-center gap-8 justify-center xl:flex-row xl:items-center xl:justify-evenly">
        <ImageHolder src={DevTroll} />
        <PersonalDescription />
        <h1 className="whitespace-nowrap font-caveat absolute text-[18vw] font-extrabold text-black/5 z-0 select-none pointer-events-none leading-none bottom-[-12rem]">
          Web Developer
        </h1>
      </section>
      <InformationsNumbers />
      <section className="relative flex flex-col items-center gap-8 justify-center xl:flex-row xl:items-center xl:justify-evenly">
        <Services />
        <h1 className="whitespace-nowrap font-caveat absolute text-[18vw] font-extrabold text-black/5 z-0 select-none pointer-events-none leading-none bottom-[-10%]">
          Services
        </h1>
      </section>

      <section className="relative flex flex-col items-center gap-8 justify-center xl:flex-row xl:items-center xl:justify-evenly">
        <Technologies />
        <h1 className="whitespace-nowrap font-caveat absolute text-[18vw] font-extrabold text-black/5 z-0 select-none pointer-events-none leading-none bottom-[-10%]">
          Skills
        </h1>
      </section>
      <section className="relative flex flex-col items-center gap-8 justify-center xl:flex-row xl:items-center xl:justify-evenly">
        <Projects />
        <h1 className="whitespace-nowrap font-caveat absolute text-[18vw] font-extrabold text-black/5 z-0 select-none pointer-events-none leading-none bottom-[-10%]">
          Projects
        </h1>
      </section>
    </div>
  );
}
