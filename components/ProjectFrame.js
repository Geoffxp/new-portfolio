import { useEffect, useRef, useState } from "react";
import styles from "../styles/Astro.module.css";
import AnimatedScroller from "./AnimatedScroller";
import LoadingScreen from "./LoadingScreen";

export default function ProjectFrame({ url, tech, scroll }) {
    const [astroOpen, setAstroOpen] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const astroRef = useRef(null)

    useEffect(() => {
        const astroObserver = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    astroRef.current.src = url
                    setTimeout(() => {
                        setLoaded(true);
                    }, 1000)
                } else {
                    setLoaded(false);
                    astroRef.current.src = ''
                }
            })
        })
        astroObserver.observe(astroRef.current)
        return () => astroObserver.unobserve(astroRef.current)
    }, []);
    return (
        <div className={styles.excelContainer}>
            {!loaded && <LoadingScreen />}
            {loaded && scroll && <AnimatedScroller />}
            <iframe style={loaded ? {opacity: 1} : {opacity: 0}} ref={astroRef} className={styles.excel} src={url} frameBorder="0"></iframe>
            <p onClick={() => setAstroOpen(true)} className={styles.tech}>ABOUT</p>
            <div style={astroOpen ? {zIndex: 5, opacity: 1} : {zIndex: -1, opacity: 0} } className={styles.techModal}>
                <div className={styles.inner}>
                    <div onClick={() => setAstroOpen(false)} className={styles.closeBtn}>&times;</div>
                    <div className={styles.hSplitter}>&nbsp;</div>
                    <div className={styles.vSplitter}>&nbsp;</div>
                    <p><span className={styles.bold}>Project Name:</span> {tech.name}</p>
                    <p><span className={styles.bold}>Tech Stack:</span> {tech.stack}</p>
                    <p><span className={styles.bold}>About:</span> {tech.about}</p>
                    <p><span className={styles.bold}>Links:</span><a target="_blank" href={tech.github}>GitHub</a> | <a target="_blank" href={url}>Live Site</a></p>
                </div>
            </div>
        </div>
    )
}