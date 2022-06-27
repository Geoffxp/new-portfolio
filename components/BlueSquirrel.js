import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "../styles/BlueSquirrel.module.css";
import LoadingScreen from "./LoadingScreen";

export default function BlueSquirrel({ stack, aboutCompany, aboutProject, link }) {
    const bs = useRef(null);
    const [loaded, setLoaded] = useState(false);
    const [down, setDown] = useState(true);

    useEffect(() => {
        const bsObserver = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    setTimeout(() => {
                        setLoaded(true)
                    }, 1000)
                } else {
                    setLoaded(false)
                }
            })
        })
        bsObserver.observe(bs.current);

        return () => bsObserver.unobserve(bs.current);
    }, [])

    useEffect(() => {
        let autoScroll;
        if (loaded) {
            setTimeout(() => {
                autoScroll = setInterval(() => {
                    if (bs.current.scrollTop <= (bs.current.scrollHeight - bs.current.offsetHeight - 5)) {
                        bs.current.scrollTop++
                    } else {
                        bs.current.scrollTo({
                            top: 0,
                            behavior: "smooth"
                        })
                        clearInterval(autoScroll)
                    }
                }, 10)
            }, 500)
        } else {
            bs.current.scrollTo({
                top: 0,
                behavior: "smooth"
            })
            clearInterval(autoScroll)
        }

        return () => {
            bs.current.scrollTo({
                top: 0,
                behavior: "smooth"
            })
            clearInterval(autoScroll)
        }
    }, [loaded])
    return (
        <div className={styles.bs}>
            {!loaded && <LoadingScreen title={"Blue Squirrel"}/>}
            <div className={styles.row}>
                <div className={styles.details}>
                    <h2>Blue Squirrel</h2>
                    <a href={link}>VIEW SITE</a>
                    <div className={styles.unit}>
                        <strong>STACK:</strong>
                        <p>{stack}</p>
                    </div>
                    <div className={styles.unit}>
                        <strong>COMPANY:</strong>
                        <p>{aboutCompany}</p>
                    </div>
                    <div className={styles.unit}>
                        <strong>PROJECT:</strong>
                        <p>{aboutProject}</p>
                    </div>
                </div>
                <div ref={bs} className={styles.imageContainer}>
                    <Image style={{marginBottom: "50px"}} src="/blue-squirrel-1.jpg" layout="raw" width="500" height="500" loading="eager" />
                    <Image style={{marginBottom: "50px"}} src="/blue-squirrel-2.jpg" layout="raw" width="500" height="500" loading="eager" />
                    <Image style={{marginBottom: "50px"}} src="/blue-squirrel-3.jpg" layout="raw" width="500" height="500" loading="eager" />
                </div>
            </div>
        </div>
    )
}