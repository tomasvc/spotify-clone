import React, { useState, useEffect, useParams } from 'react'
import useAuth from './useAuth'

export default function PlaylistPage({ code, spotifyApi }) {

    const accessToken = useAuth(code)

    const { playlistID } = useParams()

    const [user, setUser] = useState()

    useEffect(() => {

        if (!accessToken) return

        spotifyApi.setAccessToken(accessToken)

        console.log(playlistID)

    }, [accessToken])

    return (
        <div>
            <h1>Hello</h1>
        </div>
    )
}
