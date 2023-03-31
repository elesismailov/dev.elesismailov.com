import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Header({ data }) {
    const router = useRouter();

    return (

        <header className="main" id='main-header'>
            
   
            <div className="float">
                <button onClick={handleOpen}>MENU</button>
            </div>

            <div className="cover"  onClick={ handleClose }></div>
   
            <div className="wrapper">
                <button className="close" onClick={ handleClose }>
                <svg width="32" height="33" viewBox="0 0 37 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 3L34.5 34.5" stroke="black" stroke-width="5" stroke-linecap="round"/>
                    <path d="M3 35L34.5 3.5" stroke="black" stroke-width="5" stroke-linecap="round"/>
                </svg>

                </button>
                <nav>
                    <ul>
                        { data.header_links.map((link, i) => {
                            if (link.href == router.pathname) return
                            return <li key={ i} ><Link onClick={handleClose} href={ link.href }>{ link.text }</Link></li>
                        }) }
                    </ul>
                </nav>
                <button className="close-hidden" onClick={ handleClose }>Close</button>
            </div>
        </header>
    )
}


function handleOpen(event) {
    const mainHeader = document.body.querySelector('#main-header')
    const overflowWrapper = document.body.querySelector('#overflow-wrapper')
    mainHeader.classList.add('opened')
    // overflowWrapper.style.left = '300px';
    document.body.style.overflow = 'hidden';
}
function handleClose(event) {
    const mainHeader = document.body.querySelector('#main-header')
    const overflowWrapper = document.body.querySelector('#overflow-wrapper')
    mainHeader.classList.remove('opened')
    // overflowWrapper.style.left = '0';
    document.body.style.overflow = 'unset';
    event.target.onClick = handleOpen;
}
