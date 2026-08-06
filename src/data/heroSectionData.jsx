import headerLogo from "/EMS-logo.png";


export const headerLinks = [
    { label: 'Home', href: '/' },
    { label: 'Features', href: '#' },
    { label: 'Live Demo', href: '#' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Contact', href: '/contact-us' },
  ];

 export const logo = (
    <div className="d-flex align-items-center gap-2">
      <div className="hero-logo-ico">
      <img src={headerLogo} />
      </div>

    </div>
  );