import { Result } from 'postcss';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import Loading from '../Shared/Loading';

const AddDoctor = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { data: services, isLoading,reset } = useQuery('services', () =>
    fetch('http://localhost:5000/service').then((res) => res.json())
    );
    const imageStorageKey='0c2923ef386f56a864c140d884f522ab'
    /**
     * # 3 ways to store images
     * 1. Third party storage // practice project is applicable for free open public storage
     * 2. Your own storage in your own server (file system)
     * 3.Database: MongoDB
     * 
     * YUP: to validate file:  search : yup file validation for react hook form 
    */
    const onSubmit = async (data) => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    const img = result.data.url;
                    const doctor = {
                        name: data.name,
                        email: data.email,
                        specialty:data.specialty,
                        img: img,
                    }
                    // send to your database
                    fetch(`http://localhost:5000/doctor`, {
                        method: 'POST',
                        headers: {
                            "content-type": "application/json",
                            authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        },
                        body: JSON.stringify(doctor)
                    })
                        .then(res => res.json())
                        .then(inserted => {
                            if (inserted.insertedId) {
                                toast.success('Doctor successfully added.')
                                reset()
                            } else {
                                toast.error('Failed to added the doctor.')
                            }
                        
                    })
                }
           
        })
  };
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <h1 className="text-2xl">Add a New Doctor</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="Your Name"
            className="input input-bordered w-full max-w-xs"
            {...register('name', {
              required: {
                value: true,
                message: 'Name is required',
              },
            })}
          />
          <label className="label">
            {errors.name?.type === 'required' && (
              <span className="label-text-alt text-red-500">
                {errors.name.message}
              </span>
            )}
          </label>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="Your Email"
            className="input input-bordered w-full max-w-xs"
            {...register('email', {
              required: {
                value: true,
                message: 'Email is required',
              },
              pattern: {
                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                message: 'Provide a valid Email', // JS only: <p>error message</p> TS only support string
              },
            })}
          />
          <label className="label">
            {errors.email?.type === 'required' && (
              <span className="label-text-alt text-red-500">
                {errors.email.message}
              </span>
            )}
            {errors.email?.type === 'pattern' && (
              <span className="label-text-alt text-red-500">
                {errors.email.message}
              </span>
            )}
          </label>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Specialty</span>
          </label>
          <select {...register('specialty')} className="select w-full max-w-xs input-bordered">
                      {
                          services.map(service => <option key={service._id} value={service.name}>{ service.name }</option>)
           }
           
          </select>
          
              </div>
              <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Photo</span>
          </label>
          <input
            type="file"
           
            className="input input-bordered py-2 px-6 w-full max-w-xs "
            {...register('image', {
              required: {
                value: true,
                message: 'Image is required',
              },
            })}
          />
          <label className="label">
            {errors.name?.type === 'required' && (
              <span className="label-text-alt text-red-500">
                {errors.image.message}
              </span>
            )}
          </label>
        </div>
        <input
          className="btn w-full max-w-xs uppercase text-white"
          type="submit"
          value="Add"
        />
      </form>
    </div>
  );
};

export default AddDoctor;
