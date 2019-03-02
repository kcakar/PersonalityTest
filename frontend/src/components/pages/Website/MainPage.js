import React from 'react';
import { Icon } from 'semantic-ui-react';
import brand from '../../../assets/brand_x100.gif';
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
                                <img src={brand} alt="Tria Akademi"/>
                            </a>
                        </li>
                        <li><a href="/">Anasayfa</a></li>
                        <li><a href="/">Koçluk</a></li>
                        <li><a href="/">Danışmanlık</a></li>
                        <li><a href="/">Eğitim</a></li>
                        <li><a href="/">IES</a></li>
                        <li><a href="/">Enneagram</a></li>
                        <li><a href="/">Hakkımızda</a></li>
                    </ul>
                </nav>
            </header>
            <section className="hero">
                <div className="content">
                    <aside className="man">
                        <img src={man} alt="man"/>
                    </aside>
                    <aside className="text">
                        <h1>Tria Akademi</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
                    </aside>
                </div>
            </section>
            <section className="info">
                <div className="content">
                    <div className="info-lot">
                        <h2>Enneagram</h2>
                        <p>Enneagram Kişilik Modeli, dokuz farklı kişilik tipini derinliğiyle ortaya çıkaran güçlü, isabetli ve dinamik bir yapıdır. Enneagram Kişilik Modeli, kişinin yaşamı boyunca ortaya çıkan duygu, düşünce ve eylem tarzlarının tümünü detaylarıyla açıklayıp ve beraberinde zengin bir gelişim perspektifi&nbsp;sunar.</p>
                    </div>
                </div>
            </section>
            <section className="services">
                <div className="content">
                    <h2>Services</h2>
                    <div className="service-list">
                        <div className="service">
                            <div className="image">,
                                <Icon name="chart bar"></Icon>
                            </div>
                            <h3>IES</h3>
                            <p>Enneagram Kişilik Modeli’nin temel dinamiklerinin anlatıldığı, kişilik tiplerinin detaylı olarak tanımlandığı 12 saatlik (2 gün) eğitimdir.</p>
                        </div>
                        <div className="service">
                            <div className="image">,
                                <Icon name="bullhorn"></Icon>
                            </div>
                            <h3>Koçluk</h3>
                            <p>Koçluk bireysel ya da takım olarak, farkında olduğu potansiyellerini daha etkin kullanmak ve farkında olmadığı  potansiyellerini ise keşfetmek için koç ile danışan arasında kurulan gelişim odaklı bir ilişkidir.</p>
                        </div>
                        <div className="service">
                            <div className="image">,
                                <Icon name="briefcase"></Icon>
                            </div>
                            <h3>IES Danışmanlığı</h3>
                            <p>Bireysel IES Danışmanlığı, bireyin kişilik tipinin, kanat tipinin ve alt tipinin tespit edilmesi ile başlar.</p>
                        </div>
                        <div className="service">
                            <div className="image">,
                                <Icon name="pencil alternate"></Icon>
                            </div>
                            <h3>IES Temel Eğitimi</h3>
                            <p>Enneagram Kişilik Modeli’nin temel dinamiklerinin anlatıldığı, kişilik tiplerinin detaylı olarak tanımlandığı 12 saatlik (2 gün) eğitimdir.</p>
                        </div>
                        <div className="service">
                            <div className="image">,
                                <Icon name="certificate"></Icon>
                            </div>
                            <h3>Enneagram</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="contact">
                <div className="contact-info"> 
                </div>
                <div className="map">

                </div>
            </section>
            <footer>

            </footer>
        </div>
        )}
}

export default Test;