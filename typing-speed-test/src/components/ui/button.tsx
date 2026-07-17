import clsx from "clsx";

export default function Button({title, hasBorder}) {

  return (
      <button className={clsx(
        "flex min-w-2xs before:content('') before:inline-block before:w-3 before:h-3 before:rounded-full before:border-neutral-500 before:border-1",
        hasBorder && "border-b-1 border-neutral-500"
      )} >
        {title}
      </button>
  )
}

