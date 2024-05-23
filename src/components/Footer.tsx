import Image from "next/image";
import github from "../public/github.svg";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center p-2 border-t-4 rounded-xl border-rose-950 customBorder bg-bg">
      <div className="flex flex-row items-center gap-2">
        <h3 className="inline-block">Cat_marCat 2024</h3>
        <a
          className="items-center flex gap-2 px-1 font-semibold bg-green-300 border-[3px] rounded-md border-rose-950 text-rose-950 text-pink hover:scale-105 "
          href="https://github.com/Dzserold/cat-marCat"
        >
          Source code
          <Image
            src={github}
            alt="github logo"
            width={30}
            height={30}
          />
        </a>
      </div>
    </footer>
  );
}
