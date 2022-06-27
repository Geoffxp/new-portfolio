import { useEffect, useRef, useState } from 'react'
import ProjectFrame from '../components/ProjectFrame';
import Main from '../components/Main'
import styles from '../styles/Home.module.css'
import Resume from '../components/Resume';
import BlueSquirrel from '../components/BlueSquirrel';
import WorkProject from '../components/WorkProject';

export default function Home() {
  const middle = -400;
  const max = -1200;
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
    <main ref={main} style={{transform: "translate(-400vw, 0)"}} className={styles.main}>
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
        <WorkProject 
          title={"Plateau Motors"} 
          image={"/plateau.jpg"}
          stack={"NextJS, Netlify"}
          aboutCompany={"Auto repair shop located in Sammamish, Washington. They offer services for most makes and models and have been serving the area for over 30 years."}
          aboutProject={"The Plateau Motors company website was a project that I designed and developed from the ground up. I offer continuing maintenence and SEO optimization as well. Since the launch, we have increased weekly client acquisition considerably. We have plans to implement a scheduling service as well."}
          link={"https://plateaumotors.com"} />
        <WorkProject 
          title={"Mike's Carpet Cleaning"} 
          image={"/mikes.jpg"}
          stack={"NextJS, Netlify, SendInBlue, Acuity Scheduling"}
          aboutCompany={"A carpet cleaning company in the Pacific Northwest that offers best in class cleaning at a fair price. Their fleet is made entirely of top quality technicians and equipment."}
          aboutProject={"This project is a referral from Excel. I used the Excel page as a template but added significant customizations to the nav bars and sections. Since starting this project monthly page views have increased by 25%."}
          link={"https://mikescarpetcleaningltd.com"} />
        <WorkProject 
          title={"Excel Carpet Cleaning"} 
          image={"/excel.jpg"}
          stack={"NextJS, Netlify, SendInBlue, Acuity Scheduling"}
          aboutCompany={"A carpet cleaning company in the Pacific Northwest that offers best in class cleaning at a fair price. Their fleet is made entirely of top quality technicians and equipment."}
          aboutProject={"Designed, developed, and continually maintained by me, this site handles hundreds of users per month. I assisted in the automation of the scheduling process, as well as a fully custom estimator tool. Our email campaigns generate fantastic ROI every month as well!"}
          link={"https://excelcarpetcleaningwa.com"} />
        <Main />
        <BlueSquirrel 
          stack={"Alpine, Tailwind, Shopify Liquid"}
          aboutCompany={"This company sells a revolutionary injection molded children's clubhouse. The durable design and small footprint makes it stand out amongst it's competitors."}
          aboutProject={"This site has a clean and simple design which allowed for some creative and elaborate animations. Nearly every section in the theme is custom made, including product and cart functionality. I also implemented the ability to switch from the coming soon theme to the launch day theme with one click."}
          link={"https://mybluesquirrel.com/"} />
        <WorkProject 
          title={"Dote Wellness"} 
          image={"/dote-home.jpg"}
          stack={"Shopify Liquid"}
          aboutCompany={"A CBD supplement company focused on natural ingredients and healthy lifestyles. They offer high quality products via one-time and subscription transactions."}
          aboutProject={"This project was designed externally and offered some unique challenges. The blog section has a very interesting layout that required a lot of conditional rendering, mostly handled with liquid. The posterboard styling required a large reliance on position: absolute, which demanded creative solutions for responsiveness and accessibility."}
          link={"https://dotewellness.com"} />
        <WorkProject 
          title={"Aesthete Wines"} 
          image={"/aesthete.jpg"}
          stack={"Shopify Liquid"}
          aboutCompany={"A wine company that is part of the wave of online liquor sales. Their subscription packages are geared towards connoisseurs but still come in at a reasonable price point."}
          aboutProject={"My role in this project was mainly to do with CSS touch-ups and the implementation of a quick add button. The project was a transfer of their old site to a new shopify 2.0 theme to allow for the use of some new bleeding edge applications."}
          link={"https://aesthetewines.com"} />
        <WorkProject 
          title={"Rowdy"} 
          image={"/rowdy.jpg"}
          stack={"Shopify Liquid"}
          aboutCompany={"Rowdy is a protein bar / powder company focused on healthy ingredients. They are appealing to atheletes and busy people as they offer high protein snacks and meal replacement options."}
          aboutProject={"The company wanted to switch to a shopify 2.0 theme after their rebranding. I helped choose the theme and facilitated the transfer of all the new assets to the site."}
          link={"https://rowdybars.com"} />
        <WorkProject 
          title={"Woof Packs"} 
          image={"/woofpacks.jpg"}
          stack={"Shopify Liquid"}
          aboutCompany={"Woof Packs offers subscription based dog toys and treats. The Canadian company truly cares about animals and allows you to customize your box to fit your dogs specific needs."}
          aboutProject={"I set up a new homepage for them as part of the ReCharge accelerator program. All of the modules were built from the ground up and offer many options for different layouts. I also implemented a custom slider class to meet the needs of the design."}
          link={"https://woofpacks.ca"} />
        <WorkProject 
          title={"Twin Health"} 
          image={"/twin-aetna.jpg"}
          stack={"Webflow"}
          aboutCompany={"Twin Health is a supplemental health care provider. They offer a medicine and monitoring system that has been proven to reverse and, in some cases, erradicate type 2 diabetes."}
          aboutProject={"I built and manage all of their partner landing pages. They are hosted on Webflow which required some creative thinking and great use of custom code embeds. All of the classes are custom coded and have many methods to accomodate the specific needs of the site."}
          link={""} />
        <WorkProject 
          title={"Wine Connoiseur"} 
          image={"/wc-about.jpg"}
          stack={"Shopify Liquid"}
          aboutCompany={"Wine Connoisseur is selling a one of a kind wine dispensor system. The system prolongs the life of the wine after opening and creates a perfect pour every time."}
          aboutProject={"I built the about, blog, and article pages for this site. All of the pages required some amount of conditional rendering, the most elaborate being the filtering of related articles/products by tags."}
          link={""} />
        <WorkProject 
          title={"Amora Coffee"} 
          image={"/amora-lp.jpg"}
          stack={"Webflow"}
          aboutCompany={"Amora Coffee is an online coffee company. They offer both subscription and one time products in a very large assortment of flavors."}
          aboutProject={"This landing page was one of the first projects I took on. The sliders and product image display were all custom coded."}
          link={"https://amora-lp.webflow.io"} />
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
