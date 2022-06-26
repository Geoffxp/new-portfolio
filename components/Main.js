import { useEffect, useRef } from "react";
import styles from "../styles/Main.module.css";

export default function Main() {
    const mainText = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            mainText.current.style.opacity = 1;
        }, 250)
    }, [])
    return (
        <div ref={mainText} style={{ opacity: 0, transition: "all 1.5s" }}className={styles.main + " screen"}>
            <h1>Geoff Jarman</h1>
            <p>Software Developer</p>
        </div>
    )
}