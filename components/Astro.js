import { useEffect, useRef, useState } from "react";
import styles from "../styles/Astro.module.css";

export default function ProjectFrame({ url, tech }) {
    const [astroOpen, setAstroOpen] = useState(false)
    const astroRef = useRef(null)
    useEffect(() => {
        const astroObserver = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {

                } else {
                    astroRef.current.src = astroRef.current.src
                }
            })
        })
        astroObserver.observe(astroRef.current)
        
        return () => astroObserver.unobserve(astroRef.current)
    }, []);
    return (
        <div className={styles.excelContainer}>
            <iframe ref={astroRef} className={styles.excel} src={url} frameBorder="0"></iframe>
            <p onClick={() => setAstroOpen(true)} className={styles.tech}>tech</p>
            <div style={astroOpen ? {zIndex: 5, opacity: 1} : {zIndex: -1, opacity: 0} } className={styles.techModal}>
                <div className={styles.inner}>
                    <div onClick={() => setAstroOpen(false)} className={styles.closeBtn}>&times;</div>
                    <p>{tech.stack}</p>
                </div>
            </div>
        </div>
    )
}