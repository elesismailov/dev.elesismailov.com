

export default function Header({ d }) {

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
                        { d.header_links.map((link, i) => <li key={link.text + i} ><a href={ link.href }>{ link.text }</a></li>) }

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
