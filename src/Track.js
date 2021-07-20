import React from 'react'
import './Track.css'

export default function Track({ track, chooseTrack }) {

    function handlePlay() {
        chooseTrack(track)
    }

    return (
        <div className="track flex cursor-pointer" onClick={handlePlay}>
            <img src={track.image} className="mr-4" alt='' width="50" />
            <div>
                <h3 className="text-md">{track.title}</h3>
                <h5 className="text-md text-gray-400">{track.artist}</h5>
            </div>
        </div>
    )
}
