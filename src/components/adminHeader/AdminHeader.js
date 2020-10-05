import React from 'react'
import '../adminHeader/AdminHeader.css'; 

export default function AdminHeader() {
    return (
        <div className="adminHeader"> 
            <nav>
                <h4>Orderies Admin</h4> 
                <ul>
                    <li>
                        Home
                    </li> 
                    <li>
                        Login
                    </li>
                </ul>
            </nav>
        </div> 
    )
}
