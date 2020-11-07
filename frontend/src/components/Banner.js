import React from 'react'
import '../css/banner.css'
function Banner() {
    return (
        <header className="banner"  style={{
            backgroundSize:"cover",
            backgroundImage:`url(${process.env.PUBLIC_URL + `/image/background.jpg`})`,
            backgroundPosition:"center center"
            }}>
            <div className="banner_content">
                <h1 className="title">Learn tech skills from scratch</h1>
                <div className="description">
                    <h1>CodeCompiler is the world’s fastest, most efficient way to master the skills tech companies want. 100% online, part-time & self-paced.</h1>
                </div>
                <div className="banner__buttons">
                <button className="banner__button">Courses</button>
                <button className="banner__button">About Us</button>
                </div>
            </div>
        </header>
    )
}

export default Banner
