
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  ghost?: boolean
}


export default function Button({ label, ghost = false, ...props }: ButtonProps) {

  if (ghost)
    return (
      <button className="self-end py-2 px-8 rounded-lg text-heart-500 font-bold 
      bg-white border border-purple-heart-800 hover:text-white hover:bg-purple-heart-500 hover:scale-105 transition 
      duration-700 ease-in-out" {...props}>
        {label}
      </button>
    )

  return (
    <button className="self-end py-2 px-8 rounded-lg text-white font-bold 
    bg-purple-heart-800 hover:bg-purple-heart-500 hover:scale-105 transition 
    duration-700 ease-in-out" {...props}>
      {label}
    </button>
  )
}