import logoLarge from '../assets/images/logo-large.svg'
import logoSmall from '../assets/images/logo-small.svg'
import bestIcon from '../assets/images/icon-personal-best.svg'
import { useState } from 'react'

export default function Header(){
    const bestScore = 93;

    const [ score, setScore ] = useState(0);

    return ( 
        <header className="flex justify-between items-center mb-12">
            <picture>
                <source media="(min-width: 768px)" srcSet={logoLarge}/>
                <img src={logoSmall} alt="Logo" />
            </picture>
            <div className="flex items-center gap-2">
                <img src={bestIcon} alt=""/>
                <p> <span className="max-md:hidden">Personal</span> Best: <span className="text-white text-bold">{score} WP </span></p>
            </div>
        </header>
    )
}
