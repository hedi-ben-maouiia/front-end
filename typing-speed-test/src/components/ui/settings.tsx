import { Input } from "./input"

export default function Settings({title, options}) {
  return (
    <div className="flex flex-col bg-neutral-800 max-h-fit md:gap-1.5 md:items-center">
        <span className="hidden md:block">{ title }</span>
        { options.map((option, index) => <Input title={option} key={index}/>) }                
    </div>
  )
}

