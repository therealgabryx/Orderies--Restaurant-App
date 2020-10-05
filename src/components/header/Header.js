import React from 'react';
import '../header/Header.css'; 

// Shards Components 

export default function Header() { 
    return ( 
        <div className="header"> 
            <nav>
                <h4>Orderies webApp</h4> 
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
