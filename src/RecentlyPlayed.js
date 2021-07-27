import React from 'react'

export default function RecentlyPlayed({ recentlyPlayed, chooseTrack }) {

    return (
        <div className="recently-played mx-4 pb-36 text-gray-50">
            <h3 className="heading mx-4 my-5 text-2xl font-bold">Recently played</h3>
            <div className="flex flex-grow flex-wrap">
                {recentlyPlayed?.map((track => {
                    return <div
                    key={track.id} 
                    className="recently-played-item flex items-center mx-3 mb-5 w-72 bg-gray-50 bg-opacity-10 hover:bg-opacity-20 duration-300 cursor-pointer rounded" 
                    onClick={() => chooseTrack(track)}
                    >
                    <img className="rounded-l" src={track.image} alt="" width="80" />
                    <div className="mx-4">
                        <p>{track.title}</p>
                        <p className="text-sm text-gray-400">{track.artist}</p>
                    </div>
                    </div>
                }))}
            </div>
        </div>
    )

}
