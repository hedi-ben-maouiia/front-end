import { Menu as DeskMenu }    from "../components/desktop/menu";
import { Menu as MobMenu }     from "../components/mobile/menu";
import { MODES , LEVELS, DATA} from "../constants/constants"


type MenuProps ={
   wpm: number, 
   accuracy?: number,
   time : number
};

export default function Hero(
    {wpm, accuracy, time}: MenuProps 
) {

  return (
    <main>
        <section className="border-b-neutral-600 border-b-1 pb-4">
            <div className="flex justify-around mb-4 md:mb-6">
                <p className="flex flex-col items-center text-md text-neutral-400 sm:text-xl">
                    WPM:
                    <span className="text-neutral-0 font-extrabold text-2xl">{wpm ?? 0}</span>
                </p> 
                <p className="flex flex-col items-center px-5 text-md text-neutral-400 border-x-neutral-700 border-x-1 sm:px-10 sm:text-xl">
                    Accuracy:
                    <span className="text-neutral-0 font-extrabold text-2xl ">{accuracy ?? 100}%</span>
                </p> 
                <p className="flex flex-col items-center text-md text-neutral-400 sm:text-xl">
                    Time:
                    <span className="text-neutral-0 font-extrabold text-2xl">{time ?? "0:60"}</span>
                </p> 
            </div>    
            <div className="flex gap-3 sm:justify-center sm:gap-10 md:hidden">
                <MobMenu title="Hard" options={LEVELS}/>
                <MobMenu title="Timed(60s)" options={MODES}/>
            </div>
            <div className="hidden md:flex md:justify-around md:items-center">
                <DeskMenu title="Difficulty" options={LEVELS}/>
                <DeskMenu title="Mode" options={MODES}/>
            </div>
        </section>   
        <section className="relative py-9">
            <div className="blur-sm">
                <p className="text-3xl text-neutral-400 leading-10">
                    {DATA.hard[9].text}
                </p>

            </div>
            <div className="absolute top-80 w-full left-1/2 -translate-1/2 flex flex-col justify-center items-center gap-y-4">
                <button className="bg-blue-600 text-lg text-neutral-0 font-bold rounded-xl px-4 py-2 transition-all duration-200 hover:bg-blue-400 hover:cursor-pointer">
                    Start Typing Test
                </button>
                <p className="text-md text-neutral-0 font-extrabold">
                    Or click the text and start typing
                </p>
            </div>
        </section>
    </main>
  )
}

