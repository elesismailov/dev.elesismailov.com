

export default function Header() {

    return (

        <header className="main" id='main-header'>
            
   
            <div className="float">
                <button onClick={handleOpen}>MENU</button>
            </div>

            <div className="cover"  onClick={ handleClose }></div>
   
            <div className="wrapper">
                <button className="close" onClick={ handleClose }>
                    <svg width="37" height="38" viewBox="0 0 37 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 3L34.5 34.5" stroke="white" stroke-width="5" stroke-linecap="round"/>
                        <path d="M3 35L34.5 3.5" stroke="white" stroke-width="5" stroke-linecap="round"/>
                    </svg>
                </button>
                <nav>
                    <ul>
                        <li><a href="#">Projects</a></li>
                        <li><a href="#">Works</a></li>
                        <li><a href="#">About Me</a></li>
                        <li><a href="#">Contact Me</a></li>
                    </ul>
                </nav>
                <button className="close-hidden" onClick={ handleClose }>Close</button>
            </div>
        </header>
    )
}


function handleOpen(event) {
    const mainHeader = document.body.querySelector('#main-header')
    mainHeader.classList.add('opened')
    document.body.style.left = '300px';
}
function handleClose(event) {
    const mainHeader = document.body.querySelector('#main-header')
    mainHeader.classList.remove('opened')
    document.body.style.left = '0';
    event.target.onClick = handleOpen;
}
