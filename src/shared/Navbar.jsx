import { useState } from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';


const mainLinks = [
    { link: '#', label: 'Book a demo' },
    { link: '#', label: 'Documentation' },
    { link: '#', label: 'Community' },
    { link: '#', label: 'Academy' },
    { link: '#', label: 'Forums' },
];

function Navbar() {
    const [active, setActive] = useState(0);

    return (
        <header className="mb-20  bg-gray-200 border-b-2">
            <div className='flex items-center px-9 py-6 justify-between'>
                <h2 className='text-4xl'>Ryne</h2>
                <div className=''>
                    <div className='flex items-center justify-center gap-6'>
                        {mainLinks.map(((item, idx) => <Link className={"mainLink"} data-active={idx === active || undefined} onClick={(event) => {
                            event.preventDefault();
                            setActive(idx);
                        }} key={idx} to={item.link}>{item.label}</Link>))}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar