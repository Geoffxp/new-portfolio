import styles from "../styles/Resume.module.css";

export default function Resume() {
    return (
        <div className={styles.resume + " screen"}>
            <div className={styles.inside}>
                <h2>EXPERIENCE</h2>
                <p>Electriq marketing, A DRINKS Company</p>
                <p>October 2021 to present</p>
                <p>Developed and maintained custom shopify stores.</p>
                <p>Produced custom solutions for ReCharge and Klaviyo Users.</p>
                <br/>
                <p>Excel Carpet Cleaning</p>
                <p>October 2015 to June 2021</p>
                <p>Implemented new website and scheduling software that boosted sales by 30% over the previous year.</p>
                <p>Also worked in the field as a manager, managing the day to day business tasks and employees.</p>
                <br/><br/>
                <h2>EDUCATION</h2>
                <p>Thinkful Coding Bootcamp</p>
                <p>Certificate</p>
                <p>March 2021 to September 2021</p>
                <p>Learn the skills necesary to make full stack web applications</p>
                <br/>
                <p>Green River College</p>
                <p>Accociate of Arts</p>
                <p>August 2015 to August 2017</p>
                <p>Heavy focus on the sciences, including C++, Java, and Python as electives</p>
                <br/><br/>
                <p><a href="">DOWNLOAD</a> | <a href="">CONTACT</a></p>
            </div>
        </div>
    )
}