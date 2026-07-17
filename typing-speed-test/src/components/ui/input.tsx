
export const Input = ({title}) => {
    
    return (
        <>
            <button
                className="text-white border-neutral-400 border-1 px-3 py-0.5 rounded-md hover:outline-blue-600 hover:outline-solid hover:outline-1 hover:outline-offset-1 focus:text-blue-600 focus:border-blue-600"
            >
                { title }
            </button>
        </>
    )
}
