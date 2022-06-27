import Image from "next/image";
import styles from "../styles/Resume.module.css";

export default function Resume() {
    return (
        <div className={styles.resume + " screen"}>
            <div className={styles.inside}>
                <Image src="/resume.png" layout="raw" width="500" height="500" />
                <a href="/resume.pdf" download="Geoff-Jarman-Resume">DOWNLOAD</a>
            </div>
        </div>
    )
}