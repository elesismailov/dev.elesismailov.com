
export default function ProjectsSection({data}) {

    return (<>
        <section className="projects">
            <ul className="projects">
                {data.map((p, i) => Project({p: p, key: i}))}
            </ul>
        </section>

    </>)
}

function Project({p, key}) {
    return (
    <li key={key} className="project shadow-lg ">
        <div className="preview " >
            <a href={p.link} target="_blank" className="" tabIndex="-1">
                <img src={p.preview} alt={p.previewAltText} className="" width="448" height="250" />
            </a>
        </div>
        <div className="text-block">
            <h3><a href={p.link} target="_blank" aria-label="Live Preview" title="Live Preview" 
                className="external " >{p.title}</a></h3>
            <div className="description ">
            
                <div className="texts ">
                    {p.description.map((t, i) => <p key={i}>{ t }</p>)}
                </div>
                <ul className="tags ">
                    {p.tags.map((tag, i) => <li key={i}>{ tag }</li>)}
                </ul>
            </div>
        {p.githubLink &&
            <a href={p.githubLink} target="_blank" aria-label="Github Repository" className="github-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" viewBox="0 0 16 16">
                    <title>Github Repo</title>
                    <path fill="#fff" d="M7.938 1a6.936 6.936 0 0 0-2.194 13.519c.347.06.477-.147.477-.33 0-.164-.009-.71-.009-1.292-1.743.321-2.194-.424-2.332-.815-.078-.2-.417-.815-.712-.98-.242-.13-.59-.45-.008-.46.546-.008.936.504 1.066.712.625 1.05 1.622.754 2.021.572.06-.45.243-.754.442-.928-1.543-.173-3.156-.771-3.156-3.425a2.7 2.7 0 0 1 .71-1.865c-.069-.173-.311-.884.07-1.838 0 0 .581-.182 1.908.711a6.438 6.438 0 0 1 1.734-.234c.59 0 1.18.078 1.735.234 1.327-.902 1.908-.711 1.908-.711.381.954.138 1.665.069 1.838.442.486.711 1.102.711 1.865 0 2.662-1.622 3.252-3.165 3.425.251.217.468.633.468 1.284 0 .928-.009 1.673-.009 1.908 0 .182.13.398.477.33a6.949 6.949 0 0 0 4.2-9.238A6.935 6.935 0 0 0 7.937 1z"/>
                </svg>
                GitHub Repo
            </a>
        }
        </div>
    </li>
    );

}