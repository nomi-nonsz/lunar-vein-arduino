import NolaImg from "../../assets/img/ocs/nola_3.png";

export default function MadeBy ({ className }: { className?: string }) {
    return (
        <div className={`group ${className}`}>
            Made By
            <a href="https://github.com/norman-andrians" target="_blank">
                <img className="inline group-hover:animate-wewew" src={NolaImg} />
            </a>
            Norman Andrians
        </div>
    )
}