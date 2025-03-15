import React from 'react'
import { useRouteError } from 'react-router-dom'

function RouteError() {
    const routeError = useRouteError()
    console.log(routeError)
    return (
        <div className='bg-dark text-warning justify-content-center flex-column' style={{ minHeight: '100vh' }}>
            <p className="display-4">{routeError.data}</p>
            <p className="display-5 text-warning">{routeError.status}-{routeError.statustext} </p>
        </div>
    )
}

export default RouteError
