import { format } from 'date-fns';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const BookingModal = ({ treatment, date, setTreatment,refetch }) => {
  const [user] = useAuthState(auth);
  const { _id, name, slots } = treatment;
  const formatedDate = format(date, 'PP');
    const handelBooking = (e) => {
        e.preventDefault();
        const slot = e.target.slot.value;
        const phone = e.target.phone.value;
      console.log(slot);
      const booking  ={
        treatmentId: _id,
        treatment: name,
        date: formatedDate,
        slot,
        patient: user.email,
        patientName: user.displayName,
        phone,

      }
      fetch('http://localhost:5000/booking', {
        method: 'POST',
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(booking)
      })
        .then(res => res.json())
        .then(data => {
         // to close the modal
          if (data.success) {
            toast(`Appointment is set, ${formatedDate} at ${slot}`)
          } else {
            toast(`Already have an appointment on, ${data.booking?.date} at ${data.booking?.slot}`)
          }
          refetch()
         setTreatment(null)
      } )
     
    }
  return (
    <div>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-lg text-secondary">
            Booking for: {name}
          </h3>
          <form onSubmit={handelBooking} className="grid grid-cols-1 gap-3 justify-items-center mt-2">
            <input
              type="text"
              value={format(date, 'PP')}
              disabled
              className="input input-bordered w-full max-w-xs"
            />
            <select name='slot' className="select select-bordered w-full max-w-xs">
                          {
                              slots.map((slot,index) => <option key={index}  value={slot}>{ slot}</option>)
              }
            </select>
            <input
              type="text"
             name='name'  disabled value={user?.displayName}
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="email" name='email'
              disabled value={user?.email}
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="text" name='phone'
              placeholder="Phone Number"
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="submit"
              value="Submit"
              className="btn btn-secondary w-full max-w-xs"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
