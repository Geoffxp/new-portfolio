import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "../styles/BlueSquirrel.module.css";
import LoadingScreen from "./LoadingScreen";

export default function WorkProject({ title, image, stack, aboutCompany, aboutProject, link }) {
    const work = useRef(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const workObserver = new IntersectionObserver(entries => {
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
        workObserver.observe(work.current);

        return () => workObserver.unobserve(work.current);
    }, [])

    useEffect(() => {
        let autoScroll;
        if (loaded) {
            setTimeout(() => {
                autoScroll = setInterval(() => {
                    if (work.current.scrollTop <= (work.current.scrollHeight - work.current.offsetHeight - 5)) {
                        work.current.scrollTop++
                    } else {
                        work.current.scrollTo({
                            top: 0,
                            behavior: "smooth"
                        })
                        clearInterval(autoScroll)
                    }
                }, 10)
            }, 1000)
        } else {
            work.current.scrollTo({
                top: 0,
                behavior: "smooth"
            })
            clearInterval(autoScroll)
        }

        return () => {
            work.current.scrollTo({
                top: 0,
                behavior: "smooth"
            })
            clearInterval(autoScroll)
        }
    }, [loaded])
    return (
        <div className={styles.bs}>
            {!loaded && <LoadingScreen title={title}/>}
            <div className={styles.row}>
                <div className={styles.details}>
                    <h2>{title}</h2>
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
                <div ref={work} className={styles.imageContainer}>
                    <Image src={image} layout="raw" width="500" height="500" loading="eager" />
                </div>
            </div>
        </div>
    )
}