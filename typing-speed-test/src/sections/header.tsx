import desktopLogo from '/images/logo-large.svg'
import mobileLogo from '/images/logo-small.svg'
import bestIcon from '/images/icon-personal-best.svg'
import { useState } from 'react'

export default function Header(){
    const [ score, setScore ] = useState(0);

    return ( 
        <header className="flex justify-between items-center mb-7">
            <picture>
                <source media="(min-width: 768px)" srcSet={desktopLogo}/>
                <img src={mobileLogo} alt="Logo" />
            </picture>
            <div className="flex items-center gap-2">
                <img src={bestIcon} alt=""/>
                <p className="text-neutral-500"> <span className="max-md:hidden text-neutral-0">Personal</span> Best: <span className="text-white text-bold">{score || 92} WPM</span></p>
            </div>
        </header>
    )
}
