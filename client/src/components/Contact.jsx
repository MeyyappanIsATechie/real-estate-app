/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export default function Contact({listing}) {
    const [landlord, setLandlord] = useState(null);
    const [message, setMessage] = useState('');
    useEffect(()=> {
    const fetchLandlord = async () => {
        try {
            // eslint-disable-next-line react/prop-types
            const res = await fetch(`/api/user/${listing.userRef}`);
            const data = await res.json();
            setLandlord(data);
        } catch (error) {
            console.log(error);
            //can also display error using useState, though invlid user cant even see it
        }
    }
    fetchLandlord();
    // eslint-disable-next-line react/prop-types
    },[listing.userRef])
    const onChange = (e) => {
        setMessage(e.target.value);
    }
  return (
    <>
    {landlord && (
        <div className='flex flex-col gap-2'>
            <p>Contact <span className='font-semibold'>{landlord.username}</span> for <span className='font-semibold'>{listing.name.toLowerCase()}</span></p>
            <textarea name="message" id="message" rows="2" value={message} onChange={onChange} placeholder='Enter your message here...' className='w-full border p-3 rounded-lg'></textarea>
            <Link className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95' to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}>
            Send Message
            </Link>
        </div>
    )}
    </>
  )
}
