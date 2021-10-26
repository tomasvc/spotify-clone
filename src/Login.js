import React from 'react'
import './Login.css'

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=a344e815ed30434c80ce17492635db24&response_type=code&redirect_uri=https://flamboyant-williams-be2f38.netlify.app&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-read-recently-played`

export default function Login() {

    return (
        <div className="login flex relative flex-col pt-20 items-center" style={{minWidth: '100vw', minHeight: "100vh", backgroundColor: '#000', margin: '0'}}>
            <div className="login__shadow"></div>
            <div className="login__container">
                <img className="mb-5 p-14 pb-0" src="./spotify-logo.png" alt="" width="400" />
                <a className="btn-success shadow-md w-44 text-white text-base text-center weight-600 px-5 py-2 rounded-full" href={AUTH_URL} style={{backgroundColor: "#1CB954"}}>Login With Spotify</a>
            </div>
            <footer className="absolute flex bottom-0 p-4 text-gray-600 text-xs">
                <p>Created by <a className="text-purple-600" href="https://github.com/tomasvc">tomasvc</a></p>
            </footer>
        </div>
    )

}