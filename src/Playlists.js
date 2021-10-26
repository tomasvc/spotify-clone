import React from 'react'
import { Link } from 'react-router-dom'

export default function Playlists({ playlists, chooseTrack }) {

    return (

        <div className="text-gray-50">
            <div className="playlists flex flex-wrap mx-5">
                {playlists?.map(playlist => {
                    return <Link to={'/playlist/' + playlist.id} key={playlist.id}><div className="playlist-item flex flex-grow items-center mx-3 mb-5 w-72 h-20 bg-gray-50 bg-opacity-10 hover:bg-opacity-20 duration-300 cursor-pointer rounded" onClick={() => chooseTrack(playlist)} >
                        <img className="rounded-l" src={playlist.image?.url} alt="" width="80" />
                        <p className="font-bold ml-4">{playlist.name}</p>
                    </div></Link>
                })}
            </div>
        </div>
    )

}
