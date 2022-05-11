import React from 'react';

const Service = ({ service, setTreatment }) => {
  const { name, slots } = service;
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body ">
        <h2 className="card-title flex text-secondary justify-center">
          {name}
        </h2>
        <p className="text-center">
          {slots.length > 0 ? (
            <span>{slots[0]}</span>
          ) : (
            <span className="text-red-500"> Try another date </span>
          )}
        </p>
        <p className="text-center">
          {slots.length} {slots.length > 1 ? 'spaces' : 'space'} available{' '}
        </p>
        <div className="card-actions justify-center">
          <label
            disabled={slots.length === 0}
            className=" btn-secondary text-white uppercase btn modal-button"
            onClick={() => setTreatment(service)}
            for="booking-modal"
          >
            
            Book Appointment
          </label>
        </div>
      </div>
    </div>
  );
};

export default Service;
