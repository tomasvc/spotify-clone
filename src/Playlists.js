import React from 'react'

export default function Playlists({ playlists, chooseTrack }) {

    // function handlePlay(playlist) {
    //     chooseTrack(playlist)
    // }

    return (
        <div className="text-gray-50">
            <h3 className="my-5 px-7 text-3xl font-bold">Good morning</h3>
            <div className="flex flex-grow flex-wrap justify-between">
                {playlists?.map(playlist => {
                    <div className="px-5 py-7 mb-5 w-72 bg-gray-50 bg-opacity-10 hover:bg-opacity-20 duration-300 cursor-pointer rounded" >
                        <img src={playlist.image?.url} alt="" width="50" />
                        <p className="font-bold">{playlist.name}</p>
                    </div>
                })}
            </div>
        </div>
    )
}
