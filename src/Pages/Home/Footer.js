import React from 'react';
import { Link } from 'react-router-dom';
import footer from '../../assets/images/footer.png';

const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();
  return (
    <footer
      style={{
        background: `url(${footer})`,
        backgroundSize: 'cover',
      }}
      className=" p-10 "
    >
      <div className="footer">
        <div>
          <span className="footer-title">Services</span>
          <Link to='/somting'  className="link link-hover">Branding</Link>
          <Link to='/somting'  className="link link-hover">Design</Link>
          <Link to='/somting'  className="link link-hover">Marketing</Link>
          <Link to='/somting'  className="link link-hover">Advertisement</Link>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <Link to='/somting'  className="link link-hover">About us</Link>
          <Link to='/somting'  className="link link-hover">Contact</Link>
          <Link to='/somting'  className="link link-hover">Jobs</Link>
          <Link to='/somting'  className="link link-hover">Press kit</Link>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <Link to='/somting'  className="link link-hover">Terms of use</Link>
          <Link to='/somting'  className="link link-hover">Privacy policy</Link>
          <Link to='/somting'  className="link link-hover">Cookie policy</Link>
        </div>
      </div>
      <div className='text-center mt-10'>
        <p>Copyright © {year} - All right reserved by ACME Industries Ltd</p>
      </div>
    </footer>
  );
};

export default Footer;
