import React, { useRef } from 'react'

export default function ProfileEdit() {
    const name = useRef();
    const desc = useRef();
    const city = useRef();
  return (
    <div className="profileEdit">
        <div className="profileWrapper">
            <div className="profileTop">

            </div>
            <div className="profileBottom">
                <input type="name" className="nameEdit" placeholder="Name" required ref={name}/>
                <textarea type="name" className="descEdit" placeholder="Desc" required ref={desc}/>
                <input type="name" className="cityEdit" placeholder="City" required ref={city}/>
            </div>
        </div>
    </div>
  )
}
