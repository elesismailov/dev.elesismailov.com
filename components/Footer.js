

export default function Footer({ d }) {
    console.log(d)
    return (
        <footer className="main-footer">

            <div className="wrapper">
                
                <h2>{ d.footer_h2 }</h2>
                <nav>
                    <ul>
                        { d.footer_links.map(link => <li><a href={ link.href }>{ link.text }</a></li>) }
                    </ul>
                    <a className="main-link" href={d.footer_main_link.href} dangerouslySetInnerHTML={{__html: d.footer_main_link.text }}></a>
                </nav>

                <div className="attribution">
                    <p className="attribution-1">{ d.footer_attribution_1 }</p>
                    <p className="attribution-2">{ d.footer_attribution_2 }</p>
                </div>
            </div>
        </footer>
    )
}