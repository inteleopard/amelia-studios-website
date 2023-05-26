// This component page acts as a modal over the homepage to prevent re-loading of assets

import Logo from '../assets/logos/logo-contact.png'

import Header from '../components/Header'


const ContactPage = () => {
  // Render contact page content
  return (
    <>
      <Header />
      <div className='contact-wrapper'>
        <div className='contact-container'>
          <div className='contact-text'>
            <h4>
              BIO<br />
              E: hello@ameliastudios.co.uk<br />
              T: +447817678382<br />
              13 Berwick Street<br /> Soho, W1F 0PW<br />
            </h4>
            <img src={Logo} alt='as-logo' className='contact-logo'></img>
          </div>
        </div>
      </div>
    </>
  )
}


export default ContactPage;
