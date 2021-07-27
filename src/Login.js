import React from 'react'

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=a344e815ed30434c80ce17492635db24&response_type=code&redirect_uri=https://flamboyant-williams-be2f38.netlify.app/callback&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-read-recently-played`

export default function Login() {

    return (
        <div className="flex flex-col pt-20 items-center" style={{minWidth: '100vw', minHeight: "100vh", backgroundColor: '#000', margin: '0'}}>
            <img className="mb-5 p-14 pb-0" src="./spotify-logo.png" alt="" width="400" />
            <a className="btn-success text-white text-base weight-600 px-5 py-2 rounded-full" href={AUTH_URL} style={{backgroundColor: "#1CB954"}}>Login With Spotify</a>
        </div>
    )

}
