import React from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { userContext } from '../../App';
import './Shipment.css';

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const[loggedInUser,SetLoggedInUser]=useContext(userContext);
    const onSubmit = data => console.log(data);
  
    console.log(watch("example")); // watch input value by passing the name of it
  
    return (
      <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>  

        <input name="name"  defaultValue={loggedInUser.name} placeholder="Your Name" ref={register({ required: true })} />
        {errors.name && <span className="error">Name is required</span>}

        <input name="email"  defaultValue={loggedInUser.email} placeholder="Your Email" ref={register({ required: true })} />
        {errors.email && <span className="error">Email is required</span>}

        <input name="address" placeholder="Your Address" ref={register({ required: true })} />
        {errors.address && <span className="error">Address is required</span>}

        <input name="phone"  placeholder="Your Phone" ref={register({ required: true })} />
        {errors.phone && <span className="error">Phone is required</span>}
        
        <input type="submit" />
      </form>
    );
};

export default Shipment;