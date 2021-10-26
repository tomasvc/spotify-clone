import React, { useState, useEffect, lazy, Suspense } from 'react'
import './Dashboard.css'
import Track from './Track'
import Player from './Player'
import useAuth from './useAuth'

const Playlists = lazy(() => import('./Playlists'))
const RecentlyPlayed = lazy(() => import('./RecentlyPlayed'))

export default function Dashboard({ code, spotifyApi }) {

    const accessToken = useAuth(code)

    const [user, setUser] = useState()
    const [userPlaylists, setUserPlaylists] = useState()
    const [recentlyPlayedTracks, setRecentlyPlayedTracks] = useState()

    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [playingTrack, setPlayingTrack] = useState()

    const [time, setTime] = useState()
    const [greeting, setGreeting] = useState()

    const [openMenu, setOpenMenu] = useState(false)


    // get current time to use for greeting
    useEffect(() => {

        const getTime = () => {
            let d = new Date()
            setTime(d.getHours())
        }
    
        getTime()

    }, [])


    // determine which greeting to use based on the time
    useEffect(() => {

        if (time >= 18) {
            setGreeting('Good evening')
        } else if (time >= 12) {
            setGreeting('Good afternoon')
        } else if (time >= 2) {
            setGreeting('Good morning')
        }

    }, [time])


    // get user playlists
    useEffect(() => {

        if (!accessToken) return

        spotifyApi.setAccessToken(accessToken)

        spotifyApi.getMe().then(data => {

            setUser(data)

        }).then(

            spotifyApi.getUserPlaylists(user?.body.id).then(data => {

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


    // get search results based on user input
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


    // get recently played tracks
    useEffect(() => {

        if (!accessToken) return

        spotifyApi.getMyRecentlyPlayedTracks({

            limit : 8

        }).then(data => {

            let titles = []
            let tracks = []

            for (let i = 0; i < data.body.items.length; i++) {
                if (!titles.includes(data.body.items[i].track.name)) {
                    titles.push(data.body.items[i].track.name)
                    tracks.push(data.body.items[i])
                } else {
                    continue
                }
            }

            setRecentlyPlayedTracks(
                tracks?.map(track => {
                    return {
                        id: track.track.id,
                        artist: track.track.artists[0].name,
                        title: track.track.name,
                        image: track.track.album.images[0].url,
                        uri: track.track.uri
                    }

                })
            )

        }).catch(error => {
            console.log(error)
        })

    }, [accessToken])
    

    // select track to be played
    function chooseTrack(track) {
        setPlayingTrack(track)
    }


    return (

        <div className="dashboard flex flex-col w-full h-auto m-0 pt-2.5">
            <div className="search-bar flex justify-between items-center px-7">
                <input
                    className="search max-w-md w-full px-3 py-2 rounded-full outline-none placeholder-gray-50::placeholder"
                    type="search"
                    placeholder="Search Artists or Songs"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <div onClick={() => setOpenMenu(!openMenu)} className="user-icon relative flex items-center bg-black pr-3 pl-1 py-1 ml-3 rounded-full duration-300 cursor-pointer hover:bg-gray-900">
                    <svg className="bg-gray-700 rounded-full p-3" width="16" height="16" fill="#fff" viewBox="0 0 18 20">
                        <path d="M15.216 13.717L12 11.869C11.823 11.768 11.772 11.607 11.757 11.521C11.742 11.435 11.737 11.267 
                        11.869 11.111L13.18 9.57401C14.031 8.58001 14.5 7.31101 14.5 6.00001V5.50001C14.5 3.98501 13.866 2.52301 
                        12.761 1.48601C11.64 0.435011 10.173 -0.0879888 8.636 0.0110112C5.756 0.198011 3.501 2.68401 3.501 
                        5.67101V6.00001C3.501 7.31101 3.97 8.58001 4.82 9.57401L6.131 11.111C6.264 11.266 6.258 11.434 6.243 
                        11.521C6.228 11.607 6.177 11.768 5.999 11.869L2.786 13.716C1.067 14.692 0 16.526 0 18.501V20H1V18.501C1 
                        16.885 1.874 15.385 3.283 14.584L6.498 12.736C6.886 12.513 7.152 12.132 7.228 11.691C7.304 11.251 7.182 
                        10.802 6.891 10.462L5.579 8.92501C4.883 8.11101 4.499 7.07201 4.499 6.00001V5.67101C4.499 3.21001 6.344 
                        1.16201 8.699 1.00901C9.961 0.928011 11.159 1.35601 12.076 2.21501C12.994 3.07601 13.5 4.24301 13.5 
                        5.50001V6.00001C13.5 7.07201 13.117 8.11101 12.42 8.92501L11.109 10.462C10.819 10.803 10.696 11.251 
                        10.772 11.691C10.849 12.132 11.115 12.513 11.503 12.736L14.721 14.585C16.127 15.384 17.001 16.884 
                        17.001 18.501V20H18.001V18.501C18 16.526 16.932 14.692 15.216 13.717Z"></path>
                    </svg>
                    <p className="username ml-2 min-w-min text-gray-50 text-base font-semibold" >{user?.body.display_name}</p>
                    <div className={`${openMenu ? 'flex' : 'hidden'} absolute justify-evenly flex-col w-48 h-32 top-10 right-0 rounded shadow-md`} style={{background: '#222'}}>
                        <p className="bg-white bg-opacity-0 text-gray-200 text-sm font-medium w-full px-4 py-2 hover:bg-opacity-10">Account</p>
                        <p className="bg-white bg-opacity-0 text-gray-200 text-sm font-medium w-full px-4 py-2 hover:bg-opacity-10">Profile</p>
                        <p onClick={() => document.location = '/'} className="bg-white bg-opacity-0 text-gray-200 text-sm font-medium w-full px-4 py-2 hover:bg-opacity-10">Log out</p>
                    </div>
                </div>
            </div>

            {!search && <h3 className="greeting my-5 px-7 text-3xl text-gray-50 font-bold">{greeting}</h3>}

            {!search && 
                <Suspense fallback={<h3 style={{color: '#fff'}}>Loading...</h3>}>
                    <Playlists className="px-7" playlists={userPlaylists} chooseTrack={chooseTrack} />
                    <RecentlyPlayed recentlyPlayed={recentlyPlayedTracks} chooseTrack={chooseTrack} />
                </Suspense>}

            {search && 
                <div className="container h-screen overflow-y-auto px-7">{searchResults.map(track => {
                    return <Track track={track} key={track.id} chooseTrack={chooseTrack} />
            })}</div>}

            <div className="player fixed l-0 b-0 w-full px-7 pt-7 pb-2.5 bg-player">
                <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
            </div>

        </div>
        
    )

}
