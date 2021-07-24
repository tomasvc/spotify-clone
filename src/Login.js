import React from 'react'

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=a344e815ed30434c80ce17492635db24&response_type=code&redirect_uri=https://flamboyant-williams-be2f38.netlify.app&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`

export default function Login() {
    return (
        <div className="flex justify-center items-center" style={{minWidth: '100vw', minHeight: "100vh", backgroundColor: '#000', margin: '0'}}>
            <a className="btn btn-success btn-lg" href={AUTH_URL} style={{fontSize: "16px", fontWeight: "600", padding: "10px 20px", borderRadius: "50px", backgroundColor: "#1CB954", color: '#fff'}}>Login With Spotify</a>
        </div>
    )
}
