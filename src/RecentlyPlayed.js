import React from 'react'

export default function RecentlyPlayed({ track, chooseTrack }) {

    function handlePlay(playlist) {
        chooseTrack(playlist)
    }

    return (
        <div className="text-gray-50">
            <h3 className="my-5 text-3xl font-bold">Recently played</h3>
            <div className="flex flex-grow flex-wrap justify-between">
                <div className="px-5 py-7 mb-5 w-72 bg-gray-50 bg-opacity-10 hover:bg-opacity-20 duration-300 cursor-pointer rounded" onClick={handlePlay(track)}>
                <p className="font-bold">{track.name}</p>
            </div>
            </div>
        </div>
    )
}
