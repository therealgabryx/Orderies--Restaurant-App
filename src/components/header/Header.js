import React from 'react';
import '../header/Header.css'; 
 
import { Link } from 'react-router-dom';

export default function Header() { 
    return ( 
        <div className="header"> 
            <nav>
                <h4>Orderies webApp</h4> 
                <ul>
                    <li>
                        <Link to="/">Home</Link> 
                    </li>
                    <li>
                        <Link to="/login">Login</Link> 
                    </li>
                </ul>
            </nav>
        </div> 
    ) 
} 
