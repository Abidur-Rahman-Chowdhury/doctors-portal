import React from 'react';
import appointment from '../../assets/images/appointment.png';
import PrimaryButton from '../Shared/PrimaryButton';

const ContactUs = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
          background: `url(${appointment})`,
          backgroundSize: 'cover'
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-xl text-primary font-bold">Contact Us</h1>
          <h2 className="text-white text-3xl">Stay connected with us</h2>
                  <form className='w-full'>
                      <input className='w-full mt-5 h-10 pl-5 rounded-md' type="email" placeholder='Email Address' name="" id="" />
                      <input className='w-full mt-5 h-10 pl-5 rounded-md' type="text" placeholder='Subject' name="" id="" />
                     <textarea className='w-full mt-5 h-10 pl-5 mb-4 rounded-md' placeholder='Your Message' name="" id="" cols="30" rows="10"></textarea>
          </form>
          <PrimaryButton >submit</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
