import { ICountUpData } from "@/interfaces/coun-up-interface";
import ReactCountUp from "react-countup";

const CountUp = (props:ICountUpData) => {
  return (
    <div key={props.id} className="container mx-auto">
      <div className="flex flex-row items-center gap-0.5">
        <ReactCountUp
          end={props.value}
          duration={2.75}
          delay={0.5}
          className="text-4xl xl:text-6xl font-extrabold font-mono
                     bg-gradient-to-r from-[var(--foreground)]/25 
                     to-[var(--accent)] bg-clip-text text-transparent"
        />
        <p
          className="font-extrabold text-xs max-w-20
                     bg-gradient-to-r from-[var(--accent)] to-[var(--foreground)]/25
                     bg-clip-text text-transparent"
        >
          {props.event}
        </p>
      </div>
    </div>
  );
};

export default CountUp;
