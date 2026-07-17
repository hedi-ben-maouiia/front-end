type Props = {
    title: string, 
    options: string[]
}

export default function DeskMenu({
    title,
    options,
}: Props) {
  return (
    <div className="flex gap-2">
        <p className="text-neutral-400">
            {title}: 
        </p>
        {
            options.map(option => 
                <button
                    className="text-neutral-0 size-fit px-4 border-2 border-solid border-neutral-400 rounded focus:text-blue-600 focus:border-blue-600 hover:outline-blue-500 hover:outline-2 hover:outline-offset-1"
                >
                    {option}
                </button>
            )
        }
    </div>
  )
}
