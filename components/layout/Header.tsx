import Link from "next/link";
import { Button } from "../ui/button";
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import ClickMotion from "../motions/ClickMotion";
const Header = () => {
  return (
    <header className="py-8 xl:py-12">
      <div className="container mx-auto flex justify-between items-center xl:w-[60%]">
        <Link href="/">
          <ClickMotion>
            <h1 className="font-bold text-3xl">
              Lı<span className="text-4xl font-bold text-accent">.</span>
            </h1>
          </ClickMotion>
        </Link>
        <div className="hidden xl:flex items-center gap-8">
          <Nav />
          <Link href="/contact">
          <ClickMotion>
            <Button>Get in touch</Button></ClickMotion>
          </Link>
        </div>
        <div className="xl:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
