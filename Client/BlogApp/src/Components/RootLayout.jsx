import React from 'react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import { Outlet } from 'react-router-dom'

function RootLayout() {
    return (
        <div>
            <Header></Header>
            {/* placeholder of dynamic component loading */}
            <div style={{ minHeight: '90vh' }}>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default RootLayout
