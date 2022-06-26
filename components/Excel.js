import { useEffect, useRef, useState } from "react";
import styles from "../styles/Astro.module.css";

export default function Excel() {
    const [excelOpen, setExcelOpen] = useState(false)
    const excelRef = useRef(null)
    useEffect(() => {
        const excelObserver = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {

                } else {
                    excelRef.current.src = excelRef.current.src
                }
            })
        })
        excelObserver.observe(excelRef.current)
        
        return () => excelObserver.unobserve(excelRef.current)
    }, []);
    return (
        <div className={styles.excelContainer}>
            <iframe ref={excelRef} className={styles.excel} src="https://excelcarpetcleaningwa.com/" frameBorder="0"></iframe>
            <p onClick={() => setExcelOpen(true)} className={styles.tech}>tech</p>
            <div style={excelOpen ? {zIndex: 5, opacity: 1} : {zIndex: -1, opacity: 0} } className={styles.techModal}>
                <div className={styles.inner}>
                    <div onClick={() => setExcelOpen(false)} className={styles.closeBtn}>&times;</div>
                    <p>Vanilla Javascript, HTML, and CSS</p>
                </div>
            </div>
        </div>
    )
}