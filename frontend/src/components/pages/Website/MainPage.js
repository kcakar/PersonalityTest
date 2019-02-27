import React from 'react';
import { Icon } from 'semantic-ui-react';
import brand from '../../../assets/brand.png';
import man from '../../../assets/adam.png';
class Test extends React.Component{
    render(){
        return (
        <div className="main-website">
            <header>
                <nav className="top">
                    <ul>
                        <li className="phone"><a href="/"><Icon name="phone" flipped="horizontally"></Icon>+90 555 555 55 55</a></li>
                        <li><a href="/"><Icon name="facebook f"></Icon></a></li>
                        <li><a href="/"><Icon name="twitter"></Icon></a></li>
                        <li><a href="/"><Icon name="linkedin"></Icon></a></li>
                    </ul>
                </nav>
                <nav className="bottom">
                    <ul>
                        <li className="brand">
                            <a href="/">
                                <img src={brand} alt="enneagram"/>
                                <span>Enneagram</span>
                            </a>
                        </li>
                        <li><a href="/">Anasayfa</a></li>
                        <li><a href="/">Uygulama</a></li>
                        <li><a href="/">Hakkımızda</a></li>
                    </ul>
                </nav>
            </header>
            <section className="hero">
                <aside className="man">
                    <img src={man} alt="man"/>
                </aside>
                <aside className="content">
                    <h1>Lorem ipsum</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </aside>
            </section>
            <section className="info">
                <div className="content">
                    <div className="info-lot">
                            <h2>Best Choice</h2>
                            <span>2010 - 2016</span>
                    </div>
                    <div className="info-lot">
                        <h2>Best Trainer</h2>
                        <span>2010 - 2016</span>
                    </div>
                    <div className="info-lot">
                        <h2>Best Performance</h2>
                        <span>2010 - 2016</span>
                    </div>
                </div>
            </section>
        </div>
        )}
}

export default Test;