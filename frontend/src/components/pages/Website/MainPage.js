import React from 'react';
import { Icon,Sidebar,Menu } from 'semantic-ui-react';
import brand from '../../../assets/download_1_x70.gif';
import man from '../../../assets/adam.png';
import { Link } from 'react-router-dom';
import urls from '../../../helpers/URLs'

const VerticalSidebar = ({ animation, direction, visible,handleClose }) => (
    <Sidebar
      as={Menu}
      animation={animation}
      direction={direction}
      icon='labeled'
      inverted
      vertical
      visible={visible}
      width='thin'
    >
        <Menu.Item className="close"><Link to={urls.homepage} onClick={handleClose}>Kapat</Link></Menu.Item>
        <Menu.Item><Link to={urls.homepage}>Anasayfa</Link></Menu.Item>
        <Menu.Item><Link to={urls.homepage}>Koçluk</Link></Menu.Item>
        <Menu.Item><Link to={urls.homepage}>Danışmanlık</Link></Menu.Item>
        <Menu.Item><Link to={urls.homepage}>Eğitim</Link></Menu.Item>
        <Menu.Item><Link to={urls.homepage}>IES</Link></Menu.Item>
        <Menu.Item><Link to={urls.homepage}>Enneagram</Link></Menu.Item>
        <Menu.Item><Link to={urls.homepage}>Hakkımızda</Link></Menu.Item>
    </Sidebar>
  )
class MainPage extends React.Component{
    state={
        animation: 'uncover',
        direction: 'right',
        dimmed: false,
        visible: false,
    }

    handleMenuClick =  () =>
    this.setState({ visible: !this.state.visible})

    render(){
        const { animation, dimmed, direction, visible } = this.state

        return (
        <div className="main-website">
        
            <Sidebar.Pushable>
            <VerticalSidebar animation={animation} direction={direction} visible={visible} handleClose={this.handleMenuClick} />
            <Sidebar.Pusher dimmed={dimmed && visible}>
            <header>
                <nav className="top">
                    <ul className="content">
                        <li className="phone"><a href="/"><Icon name="phone" flipped="horizontally"></Icon>+90 555 555 55 55</a></li>
                        <li><a href="/"><Icon name="facebook f"></Icon></a></li>
                        <li><a href="/"><Icon name="twitter"></Icon></a></li>
                        <li><a href="/"><Icon name="linkedin"></Icon></a></li>
                    </ul>
                </nav>
                <nav className="bottom">
                    <ul className="content">
                        <li className="brand">
                            <Link to={urls.homepage}><img src={brand} alt="Tria Akademi"/></Link>
                        </li>
                        <li><Link to={urls.homepage}>Anasayfa</Link></li>
                        <li><Link to={urls.homepage}>Koçluk</Link></li>
                        <li><Link to={urls.homepage}>Danışmanlık</Link></li>
                        <li><Link to={urls.homepage}>Eğitim</Link></li>
                        <li><Link to={urls.homepage}>IES</Link></li>
                        <li><Link to={urls.homepage}>Enneagram</Link></li>
                        <li><Link to={urls.homepage}>Hakkımızda</Link></li>
                        <li className="panel"><Link to={urls.login}>Panele giriş</Link></li>
                        <li onClick={this.handleMenuClick} className="hamburger-container">
                            <div className={visible?"hamburger hamburger--spring js-hamburger is-active":"hamburger hamburger--spring js-hamburger"}>
                                <div className="hamburger-box">
                                    <div className="hamburger-inner"></div>
                                </div>
                            </div>
                        </li>
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
            <section className="services"  ref="services">
                <div className="content">
                    <h2>Hizmetler</h2>
                    <div className="service-list">
                        <div className="service">
                            <div className="image">
                                <Icon name="chart bar"></Icon>
                            </div>
                            <h3>IES</h3>
                            <p>Enneagram Kişilik Modeli’nin temel dinamiklerinin anlatıldığı, kişilik tiplerinin detaylı olarak tanımlandığı 12 saatlik (2 gün) eğitimdir.</p>
                        </div>
                        <div className="service">
                            <div className="image">
                                <Icon name="bullhorn"></Icon>
                            </div>
                            <h3>Koçluk</h3>
                            <p>Koçluk bireysel ya da takım olarak, farkında olduğu potansiyellerini daha etkin kullanmak ve farkında olmadığı  potansiyellerini ise keşfetmek için koç ile danışan arasında kurulan gelişim odaklı bir ilişkidir.</p>
                        </div>
                        <div className="service">
                            <div className="image">
                                <Icon name="briefcase"></Icon>
                            </div>
                            <h3>IES Danışmanlığı</h3>
                            <p>Bireysel IES Danışmanlığı, bireyin kişilik tipinin, kanat tipinin ve alt tipinin tespit edilmesi ile başlar.</p>
                        </div>
                        <div className="service">
                            <div className="image">
                                <Icon name="pencil alternate"></Icon>
                            </div>
                            <h3>IES Temel Eğitimi</h3>
                            <p>Enneagram Kişilik Modeli’nin temel dinamiklerinin anlatıldığı, kişilik tiplerinin detaylı olarak tanımlandığı 12 saatlik (2 gün) eğitimdir.</p>
                        </div>
                        <div className="service">
                            <div className="image">
                                <Icon name="certificate"></Icon>
                            </div>
                            <h3>Enneagram</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="personality-types">
                <div className="types-container content">
                    <h2>Kişilik Tipleri</h2>
                    <div className="types-list">
                        <div className="type">
                            <div className="image type1"></div>
                            <div className="type-text">
                                <h3>Tip 1</h3>
                                <p>lkeli ve idealist tip. Birler etik ve titizdirler. Güçlü bir doğru ve yanlış algıları vardır. Her zaman bir şeyleri geliştirmeye çabalarlar ve hata yapmaktan korkarlar. Düzenli, tertipli ve zor beğenen insanlardır. </p>
                            </div>
                        </div>
                        <div className="type">
                            <div className="image type2">
                            </div>
                            <div className="type-text">
                                <h3>Tip 2</h3>
                                <p>İlgili ve ilişkili odaklı tip. İkiler empatik, içten ve sıcakkanlıdırlar. Arkadaş canlısı, cömert ve fedakarlar kişilerdir. Aynı zamanda duygusal, destekleyici ve insanları memnun edici olabilirler. </p>
                            </div>
                        </div>
                        <div className="type reverse">
                            <div className="image type3">
                            </div>
                            <div className="type-text">
                                <h3>Tip 3</h3>
                                <p>Adapte olabilen ve başarı odaklı tip. Üçler kendinden emin, çekici ve cazibelidirler. Azimli, becerikli ve enerjileri yüksek kişilerdir. Aynı zamanda statü bilinçleri yüksektir ve  kendi gelişimlerini önemserler.</p>
                            </div>
                        </div>
                        <div className="type reverse">
                            <div className="image type4">
                            </div>
                            <div className="type-text">
                                <h3>Tip 4</h3>
                                <p>Romantik ve iç dünyasına odaklı tip. Dörtler kendinin farkında, duyarlı ve hassastırlar. Kendini ifade eden, duygusal olarak dürüst ve bireysel kişilerdir. Aynı zamanda duyguları güçlü ve utangaçtırlar. </p>
                            </div>
                        </div>
                        <div className="type ">
                            <div className="image type5">
                            </div>
                            <div className="type-text">
                                <h3>Tip 5</h3>
                                <p>Yoğun ve zihinsel odaklı tip. Beşler dikkatli, içgörülü ve meraklıdırlar. Bağımsız, yenilikçi ve konsantrasyonu yüksek kişilerdir. Aynı zamanda kendi düşüncelerine ve hayali yapılarına çekilebilirler.</p>
                            </div>
                        </div>
                        <div className="type ">
                            <div className="image type6">
                            </div>
                            <div className="type-text">
                                <h3>Tip 6</h3>
                                <p>Adanmış ve güvenlik odaklı tip. Altılar güvenilir, çalışkan ve sorumluluk sahibidirler. Tedbirli, dikkatli ve sadık kişilerdir. Aynı zamanda endişeli ve savunmacı olabilirler. </p>
                            </div>
                        </div>
                        <div className="type reverse">
                            <div className="image type7">
                            </div>
                            <div className="type-text">
                                <h3>Tip 7</h3>
                                <p>Neşeli ve planlama odaklı tip. Yediler çok yönlü, iyimser ve spontandırlar. Şakacı, keyifli, becerikli kişilerdir. Aynı zamanda dağınık ve disiplinsiz olabilirler. Sürekli yenilik ararlar ancak zamanlarını ve enerjilerini boşa harcıyor olabilirler. </p>
                            </div>
                        </div>
                        <div className="type reverse">
                            <div className="image type8">
                            </div>
                            <div className="type-text">
                                <h3>Tip 8</h3>
                                <p>Baskın ve güç odaklı tip. Sekizler kendine güvenen, güçlü ve iddialıdırlar. Koruyucu, becerikli ve kararlı kişilerdir. Aynı zamanda kibirli ve zorba olabilirler. Çevrelerine hakim olmaya çalışırlar ancak ürkütücü ve korkutucu olabilirler. </p>
                            </div>
                        </div>
                        <div className="type ">
                            <div className="image type9">
                            </div>
                            <div className="type-text">
                                <h3>Tip 9</h3>
                                <p>Uysal ve huzur odaklı tip. Dokuzlar kabullenici, güvenilir ve dengelidirler. İyi huylu, nazik ve barışçıl kişilerdir. Aynı zamanda yüzleşmekten kaçınıp, ilgisiz olabilirler. </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="contact">
                <aside className="info-container">
                    <h3>İLETİŞİM BİLGİLERİ</h3>
                    <article>
                        <div className="contact-row">
                            <label>Telefon numarası: </label>
                            <span>+00 000 000 00 00</span>
                        </div>
                        <div className="contact-row">
                            <label>Adres: </label>
                            <span>Sultantepe Mahallesi, Selvilik Cd. No:87, 34674 Üsküdar/İstanbul</span>
                        </div>
                        <div className="contact-row">
                            <label>Mail adresi: </label>
                            <span>info@triaakademi.com</span>
                        </div>
                    </article>
                </aside>
                <aside className="map">
                    <iframe className="maps" title="maps" height="500" frameborder="0" src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJ8ckk1SbIyhQROH97MxJ2T8E&key=AIzaSyDq7AOrG5t2Mx7LOIpFENP2A5teeRdBylE" allowfullscreen></iframe>
                </aside>
            </section>
            <footer>
                <p>© 2019 Tria Academy. All Rights Reserved</p>
            </footer>
            </Sidebar.Pusher>
            </Sidebar.Pushable>
        </div>
        )}
}

export default MainPage;