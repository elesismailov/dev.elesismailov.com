

import Link from 'next/link';
import { useRouter } from 'next/router';


export default function Footer({ data }) {

    const router = useRouter();

    return (
        <footer className="main-footer">

            <div className="wrapper">
                <div className="logo">
                    <Link href="/" locale={router.locale}>
                        <div className='img-wrapper'>
                            <img src="https://elesismailov.com/logo.png" alt="LS Letters Log" />
                        </div>
                    </Link>
                </div>
                <h2>{data.footer_h2}</h2>
                <nav className='mb-6'>
                    <ul>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/projects">Projects</Link></li>
                        <li><Link href="/#getintouch">Get In Touch</Link></li>
                    </ul>
                    {/* <a className="main-link external" target="_blank" href={data.footer_main_link.href} dangerouslySetInnerHTML={{__html: data.footer_main_link.text }}></a> */}
                </nav>
                <a className="white-link" href="mailto:dev@elesismailov.com">
                    <svg className='icon' width="30" height="25" viewBox="0 0 34 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.1875 0C1.42773 0 0 1.39974 0 3.125C0 4.10807 0.471484 5.03255 1.275 5.625L15.725 16.25C16.482 16.8034 17.518 16.8034 18.275 16.25L32.725 5.625C33.5285 5.03255 34 4.10807 34 3.125C34 1.39974 32.5723 0 30.8125 0H3.1875ZM0 7.29167V20.8333C0 23.1315 1.90586 25 4.25 25H29.75C32.0941 25 34 23.1315 34 20.8333V7.29167L19.55 17.9167C18.0359 19.0299 15.9641 19.0299 14.45 17.9167L0 7.29167Z" fill="white" />
                    </svg>
                    dev@elesismailov.com
                </a>

                <div className="attribution">
                    <p className="attribution-1">Eles Ismailov</p>
                    <p className="attribution-2">2023 - onward</p>
                </div>
            </div>
        </footer>
    )
}