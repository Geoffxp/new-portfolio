import { useEffect, useRef, useState } from 'react'
import ProjectFrame from '../components/ProjectFrame';
import Main from '../components/Main'
import styles from '../styles/Home.module.css'
import Resume from '../components/Resume';
import ComingSoon from '../components/ComingSoon';

export default function Home() {
  const middle = -400;
  const max = -500;
  const main = useRef(null);
  
  const [previousText, setPreviousText] = useState("");
  const [nextText, setNextText] = useState("");
  const [topText, setTopText] = useState("HOME");
  const [bottomText, setBottomText] = useState("RESUMÉ");
  const [hiding, setHiding] = useState(true);

  const [currentPosition, setCurrentPosition] = useState({
    left: middle,
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

    if ((currentPosition.left === middle && currentPosition.top === 0) || currentPosition.left === middle - 100 || currentPosition.left === middle + 100) { printTop("") }
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
        style={currentPosition.left > middle + 100 || currentPosition.left < middle - 100 || currentPosition.top !== 0 ? {} : {top: "-100px"}}
        className={styles.top} 
        onClick={() => setCurrentPosition({top: 0, left: middle})}
      >
        <div className={styles.shapedBtnTop}>
          {topText}
        </div>
      </div>
      <div 
        style={hiding || currentPosition.left == 0 || currentPosition.top !== 0 ? {left: "-100px"} : {}}
        className={styles.left} 
        onClick={() => setCurrentPosition({...currentPosition, left: currentPosition.left + 100})}
      >
        <div className={styles.shapedBtn}>
          {previousText}
        </div>
      </div>
      <div 
        style={hiding || currentPosition.left == max || currentPosition.top !== 0 ? {right: "-100px"} : {}}
        className={styles.right} 
        onClick={() => setCurrentPosition({...currentPosition, left: currentPosition.left - 100})}
      >
        <div className={styles.shapedBtnRight}>
          {nextText}
        </div>
      </div>
      <div 
        style={hiding || currentPosition.left !== middle || currentPosition.top !== 0 ? {bottom: "-100px"} : {}}
        className={styles.bottom} 
        onClick={() => setCurrentPosition({...currentPosition, top: -100})}
      >
        <div className={styles.shapedBtnBottom}>
          {bottomText}
        </div>
      </div>
    <main ref={main} className={styles.main}>
      <div className={styles.row}>
        <ProjectFrame 
          url={"https://astro-disatro-js.vercel.app/"} 
          scroll={false}
          tech={{
            name: "AstroDisastro",
            stack: "Vanilla JS, HTML, and CSS",
            github: "https://github.com/Geoffxp/AstroDisastroJS",
            about: "This is a game that I built after the completion of my coding bootcamp. The game features a soundtrack that I made in SONAR XE. It was made entirely from scratch with only JavaScript, HTML, and CSS."
          }} />
        <ProjectFrame 
          url={"https://plateaumotors.com"} 
          scroll={true}
          tech={{
            name: "Plateau Motors",
            stack: "NextJS, Netlify",
            github: "https://github.com/Command-Web-Solutions/plateau-motors",
            about: "The Plateau Motors company website was a project that I designed and developed from the ground up. I offer continuing maintenence and SEO optimization as well. Since the launch, we have increased weekly client acquisition considerably."
          }} />
        <ProjectFrame 
          url={"https://mikescarpetcleaningltd.com"} 
          scroll={true}
          tech={{
            name: "Mike's Carpet Cleaning",
            stack: "NextJS, Netlify, SendInBlue, Acuity Scheduling",
            github: "https://github.com/Command-Web-Solutions/excel",
            about: "This project is a referral from Excel. I used the Excel page as a template but added significant customizations to the nav bars and sections. Since starting this project monthly page views have increased by 25%."
          }} />
        <ProjectFrame 
          url={"https://excelcarpetcleaningwa.com"} 
          scroll={true}
          tech={{
            name: "Excel Carpet Cleaning",
            stack: "NextJS, Netlify, SendInBlue, Acuity Scheduling",
            github: "https://github.com/Command-Web-Solutions/excel",
            about: "Designed, developed, and continually maintained by me, this site handles hundreds of users per month. I assisted in the automation of the scheduling process, as well as a fully custom estimator tool. Our email campaigns generate fantastic ROI every month as well!"
          }} />
        <Main />
        <ComingSoon />
      </div>
      <div className={styles.row}>
        <Resume />
        <Resume />
        <Resume />
        <Resume />
        <Resume />
      </div>
    </main>
    </>
  )
}
