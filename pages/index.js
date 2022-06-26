import { useEffect, useRef, useState } from 'react'
import ProjectFrame from '../components/Astro';
import Main from '../components/Main'
import styles from '../styles/Home.module.css'

export default function Home() {
  const middle = -300;
  const max = -600;
  const main = useRef(null);
  
  const [previousText, setPreviousText] = useState("");
  const [nextText, setNextText] = useState("");
  const [topText, setTopText] = useState("HOME");
  const [hiding, setHiding] = useState(true);

  const [currentPosition, setCurrentPosition] = useState({
    left: -300,
    top: 0
  })

  const printPrevious = (word) => {
    let current = 0;
    const printer = setInterval(() => {
      if (current <= word.length) {
        setPreviousText(word.substr(0, current));
        current++
      } else {
        clearInterval(printer)
      }
    }, 100)
  }
  const printNext = (word) => {
    let current = 0;
    const printer = setInterval(() => {
      if (current <= word.length) {
        setNextText(word.substr(0, current));
        current++
      } else {
        clearInterval(printer)
      }
    }, 100)
  }
  const printTop = (word) => {
    let current = 0;
    const printer = setInterval(() => {
      if (current <= word.length) {
        setTopText(word.substr(0, current));
        current++
      } else {
        clearInterval(printer)
      }
    }, 100)
  }

  useEffect(() => {
    if (currentPosition.left == middle && previousText !== "PERSONAL") printPrevious("PERSONAL");
    if (currentPosition.left == middle - 100 && previousText !== "HOME") printPrevious("HOME");
    if (currentPosition.left < middle - 100 && previousText !== "PREV") printPrevious("PREV");
    if (currentPosition.left > middle && previousText !== "NEXT") printPrevious("NEXT");

    if (currentPosition.left == middle  && nextText !== "PERSONAL") printNext("WORK")
    if (currentPosition.left == middle + 100 && nextText !== "HOME") printNext("HOME");
    if (currentPosition.left < middle && nextText !== "NEXT") printNext("NEXT");
    if (currentPosition.left > middle + 100 && nextText !== "PREV") printNext("PREV");

    if (currentPosition.left === middle || currentPosition.left === middle - 100 || currentPosition.left === middle + 100) { printTop("") }
    else if (topText !== "HOME") { printTop("HOME")} 

    if (currentPosition.left > 0) setCurrentPosition({...currentPosition, left: 0})
    if (currentPosition.left < max) setCurrentPosition({...currentPosition, left: max})
    if (currentPosition.left <= 0 && currentPosition.left >= max) {
      main.current.style.transform = `translate(${currentPosition.left}vw, ${currentPosition.top}vh)`
    }
  }, [currentPosition])

  useEffect(() => {
    setTimeout(() => {
      setHiding(false)
    }, 500)
  }, [])
  return (
    <>
      <div 
        style={currentPosition.left > -200 || currentPosition.left < -400 ? {} : {top: "-100px"}}
        className={styles.top} 
        onClick={() => setCurrentPosition({...currentPosition, left: -300})}
      >
        <div className={styles.shapedBtnTop}>
          {topText}
        </div>
      </div>
      <div 
        style={hiding || currentPosition.left == 0 ? {left: "-100px"} : {}}
        className={styles.left} 
        onClick={() => setCurrentPosition({...currentPosition, left: currentPosition.left + 100})}
      >
        <div className={styles.shapedBtn}>
          {previousText}
        </div>
      </div>
      <div 
        style={hiding || currentPosition.left == max ? {right: "-100px"} : {}}
        className={styles.right} 
        onClick={() => setCurrentPosition({...currentPosition, left: currentPosition.left - 100})}
      >
        <div className={styles.shapedBtnRight}>
          {nextText}
        </div>
      </div>
    <main ref={main} className={styles.main}>
      <div className={styles.row}>
        <ProjectFrame url={"https://astro-disatro-js.vercel.app/"} tech={{stack: "Vanilla JS"}} />
        <ProjectFrame url={"https://excelcarpetcleaningwa.com"} tech={{stack: "Vanilla JS"}} />
        <ProjectFrame url={"https://plateaumotors.com"} tech={{stack: "Vanilla JS"}} />
        <Main />
        <ProjectFrame url={"https://astro-disatro-js.vercel.app/"} tech={{stack: "Vanilla JS"}} />
        <ProjectFrame url={"https://excelcarpetcleaningwa.com"} tech={{stack: "Vanilla JS"}} />
        <ProjectFrame url={"https://plateaumotors.com"} tech={{stack: "Vanilla JS"}} />
      </div>
    </main>
    </>
  )
}
