import React, { useState } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'
import './Player.css'

export default function Player({ accessToken, trackUri }) {

    const [play, setPlay] = useState(false)

    if (!accessToken) return null

    return (
        <SpotifyPlayer
            className="p-5"
            token={accessToken}
            showSaveIcon
            callback={state => {
                if (!state.isPlaying) setPlay(false)
            }} 
            play={play}
            uris={trackUri ? [trackUri] : []}
            styles={{
                bgColor: 'rgb(25, 25, 25)',
                sliderTrackColor: '#444',
                sliderColor: '#1CB954',
                sliderHandleColor: 'rgb(235, 235, 235)',
                color: 'rgb(235, 235, 235)',
                trackNameColor: 'rgb(235, 235, 235)'
            }}
        />
    )
}
