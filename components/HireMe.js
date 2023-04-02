

export default function HireMe({data}) {

    
    
    return (
        
        <section className="hire-me">

        <div className="wrapper">
          <h2>{data.h2}</h2>
          <p>{data.p}</p>

          <div className="contacts">
            <nav>
              <ul className="numbers">
                {data.numbers.map((n, i) => <li key={i}>
                  <a href={"tel:" + n}>
                    <svg className='icon' width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.66168 1.44266C9.21053 0.352868 8.02113 -0.227184 6.88446 0.0833487L1.72844 1.48954C0.708953 1.77077 0 2.69651 0 3.75116C0 18.2466 11.7534 30 26.2488 30C27.3035 30 28.2292 29.291 28.5105 28.2716L29.9166 23.1155C30.2272 21.9789 29.6471 20.7895 28.5573 20.3383L22.9326 17.9947C21.9775 17.5963 20.8702 17.8716 20.2198 18.6743L17.8527 21.5629C13.7279 19.6118 10.3882 16.2721 8.43713 12.1473L11.3257 9.78605C12.1284 9.12983 12.4037 8.02831 12.0053 7.07328L9.66168 1.44852V1.44266Z" fill="white" />
                    </svg>
                    {n}
                  </a>
                </li>)}
              </ul>
              <ul className="emails">
                {data.emails.map((n, i) => <li key={i}>
                  <a href={"mailto:" + n}>
                    <svg className='icon' width="30" height="25" viewBox="0 0 34 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.1875 0C1.42773 0 0 1.39974 0 3.125C0 4.10807 0.471484 5.03255 1.275 5.625L15.725 16.25C16.482 16.8034 17.518 16.8034 18.275 16.25L32.725 5.625C33.5285 5.03255 34 4.10807 34 3.125C34 1.39974 32.5723 0 30.8125 0H3.1875ZM0 7.29167V20.8333C0 23.1315 1.90586 25 4.25 25H29.75C32.0941 25 34 23.1315 34 20.8333V7.29167L19.55 17.9167C18.0359 19.0299 15.9641 19.0299 14.45 17.9167L0 7.29167Z" fill="white" />
                    </svg>

                    {n}
                  </a>
                </li>)}
              </ul>
            </nav>
          </div>
        </div>

      </section>
    )
}