import React, { useState, useEffect } from 'react'
import './Dashboard.css'
import Track from './Track'
import Player from './Player'
import Playlists from './Playlists'
import RecentlyPlayed from './RecentlyPlayed'
import useAuth from './useAuth'
import SpotifyWebApi from 'spotify-web-api-node'

const spotifyApi = new SpotifyWebApi({
    clientId: 'a344e815ed30434c80ce17492635db24'
})

export default function Dashboard({ code }) {

    const accessToken = useAuth(code)

    const [user, setUser] = useState()
    const [userPlaylists, setUserPlaylists] = useState()
    const [recentlyPlayedTracks, setRecentlyPlayedTracks] = useState()

    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [playingTrack, setPlayingTrack] = useState()

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
        spotifyApi.getMe().then(data => {
            setUser(data)
            console.log(data)
        }).then(
            spotifyApi.getUserPlaylists(user?.body.id).then(data => {
                console.log(data)
                setUserPlaylists(
                    data.body.items.map(item => {

                        let image = null

                        if (item.images.length !== 0) image = item.images[0]

                        return {
                            id: item.id,
                            name: item.name,
                            uri: item.uri,
                            image
                        }
                    })
                )
            })
        ).catch(error => {
            console.log(error.message)
        })
    }, [accessToken])

    useEffect(() => {
        console.log(user)
        console.log(userPlaylists)
    }, [user, userPlaylists])

    useEffect(() => {
        if (!search) return setSearchResults([])
        if (!accessToken) return

        let cancel = false
        spotifyApi.searchTracks(search).then(res => {
            if (cancel) return
            setSearchResults(
                res.body.tracks.items.map(track => {
                    return {
                        id: track.id,
                        artist: track.artists[0].name,
                        title: track.name,
                        image: track.album.images[0].url,
                        uri: track.uri
                    }
                })
            )
        })

        return () => cancel = true
    }, [search, accessToken])

    useEffect(() => {

        if (!accessToken) return

        spotifyApi.getMyRecentlyPlayedTracks({
            limit : 10
        }).then(data => {
            console.log(data)
            setRecentlyPlayedTracks(
                data.body.items.map(track => {
                    console.log(track)
                    return {
                        id: track.id,
                        artist: track.artists[0].name,
                        title: track.name,
                        image: track.album.images[0].url,
                        uri: track.uri
                    }
                })
            )
        }).catch(error => {
            console.log(error.message)
        })

    }, [accessToken])

    function chooseTrack(track) {
        setPlayingTrack(track)
    }

    return (
        <div className="dashboard flex flex-col w-full h-auto m-0 pt-2.5">
            <div className="flex justify-between items-center px-7">
                <input
                    className="search max-w-md w-full px-3 py-2 rounded-full outline-none placeholder-gray-50::placeholder"
                    type="search"
                    placeholder="Search Artists or Songs"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <p className="text-gray-50 text-base font-semibold">{user?.body.display_name}</p>
            </div>
            {!search && <Playlists className="px-7" playlists={userPlaylists} chooseTrack={chooseTrack} />}
            <div className="container mx-auto h-screen overflow-y-auto px-7">{searchResults.map(track => {
                return <Track track={track} key={track.id} chooseTrack={chooseTrack} />
            })}</div>
            {/* <div className="container mx-auto h-screen overflow-y-auto">{recentlyPlayedTracks?.map(track => {
                return <RecentlyPlayed track={track} key={track.id} chooseTrack={chooseTrack} />
            })}</div> */}
            <div className="player w-full px-7 pt-7 pb-2.5 bg-player">
                <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
            </div>
        </div>
        
    )
}
