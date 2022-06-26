import { useEffect, useRef, useState } from "react";
import styles from "../styles/Astro.module.css";

export default function Plateau() {
    const [plateauOpen, setPlateauOpen] = useState(false)
    const plateauRef = useRef(null)
    useEffect(() => {
        const plateauObserver = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {

                } else {
                    plateauRef.current.src = plateauRef.current.src
                }
            })
        })
        plateauObserver.observe(plateauRef.current)
        
        return () => plateauObserver.unobserve(plateauRef.current)
    }, []);
    return (
        <div className={styles.excelContainer}>
            <iframe ref={plateauRef} className={styles.excel} src="https://www.plateaumotors.com/" frameBorder="0"></iframe>
            <p onClick={() => setPlateauOpen(true)} className={styles.tech}>tech</p>
            <div style={plateauOpen ? {zIndex: 5, opacity: 1} : {zIndex: -1, opacity: 0} } className={styles.techModal}>
                <div className={styles.inner}>
                    <div onClick={() => setPlateauOpen(false)} className={styles.closeBtn}>&times;</div>
                    <p>Vanilla Javascript, HTML, and CSS</p>
                </div>
            </div>
        </div>
    )
}