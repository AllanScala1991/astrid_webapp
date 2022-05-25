import "./index.css"

interface LinkProps {
    text: string
    linkText: string
    linkUrl: string
}

export function Link(props: LinkProps) {
    return(
        <p className="links">{props.text} <a href={props.linkUrl}>{props.linkText}</a></p>
    )
}