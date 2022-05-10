import React from 'react';
import Service from './Service';
import fluoride from '../../assets/images/fluoride.png';
import whitening from '../../assets/images/whitening.png';
import cavity from '../../assets/images/cavity.png';



const Services = () => {
    const services = [

        {
            _id: 1,
            name: 'Fluoride Treatment',
            des: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos, rerum.',
            img: fluoride,
            

        },

        {
            _id: 2,
            name: 'Cavity Filling',
            des: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos, rerum.',
            img: cavity,
            

        },

        {
            _id: 3,
            name: 'Teeth Whitening',
            des: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos, rerum.',
            img: whitening,
            

        },
    ]
    return (
        <div className='mt-20'>
            <div className='text-center '>
            <h3 className='text-primary text-xl font-bold uppercase'>Our Services</h3>
            <h2 className='text-4xl '>Services We Provide</h2>
            
            </div>
            <div className='grid gap-10  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10'>
                {
                    services.map (service => <Service key={service._id} service={service}></Service>)
                }
           </div>
        </div>
    );
};

export default Services;