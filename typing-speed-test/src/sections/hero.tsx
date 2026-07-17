import { Input } from "../components/ui/input"
import Settings from "../components/ui/settings";
import DeskMenu from "../components/desktop/DeskMenu";
import MobMenu from "../components/mobile/MobMenu";


type MenuProps ={
   wpm: number, 
   accuracy?: number,
   time : number
};

export default function Hero(
    {wpm, accuracy, time}: MenuProps 
) {
    const levels = [
        "Easy", 
        "Medium",
        "Hard"
    ];
    const modes = [
        "Timed(60s)",
        "Passage"
    ]; 

  return (
      <>
    <div className="flex justify-between  border-b-neutral-600 border-b-1 pb-4 max-[1200px]:flex-col max-[1200px]:gap-y-8 max-[1200px]:items-center">
            <article className="flex flex-1 gap-5 text-lg items-center">
                <p>WPM: <span className="text-neutral-0 font-bold">{wpm ?? 0}</span> </p>
                <p className="border-x-1 px-3">Accuracy: <span className="text-neutral-0 "> {accuracy ?? 100}% </span></p>
                <p>Time: <span className="text-neutral-0 font-bold">{time ?? `0:60`}</span> </p>
            </article>
            <article className="flex gap-8 items-center">
                <div className="hidden sm:flex gap-4">
                    <DeskMenu title="Difficulty" options={levels}/>
                    <DeskMenu title="Mode" options={levels}/>
                </div> 
                <div className="flex sm:hidden gap-4">
                    <MobMenu title={levels[0]} options={levels}/>
                    <MobMenu title={modes[0]} options={modes}/>
                </div>
            </article>
    </div>
    <div className="relative py-4 pointer-events-none">
        <p className="text-4xl blur-[8px] pointer-events-none" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, veritatis ex dolorem atque iure possimus voluptatum modi nulla officia deleniti laboriosam temporibus esse. Porro exercitationem error ab delectus rem modi!</p>
        <div className="flex flex-col items-center gap-y-2 absolute top-[50%] left-[50%] translate-[-50%]">
            <button className="flex-auto bg-blue-600 text-neutral-0 font-bold rounded px-4 py-2 ">
                Start Typing Test
            </button>
            <p className="flex-auto text-neutral-0 font-bold">Or click the text and start typing</p>
        </div>
    </div>
    </>
  )
}

