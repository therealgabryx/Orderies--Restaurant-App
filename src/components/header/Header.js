import React from 'react';
import '../header/Header.css'; 

// Shards Components 
import { Navbar, NavbarBrand, } from "shards-react"; 

export default function Header() { 
    return ( 
        <div className="header"> 
            <Navbar>
                <NavbarBrand>Orderies</NavbarBrand> 
                webApp
            </Navbar>
        </div> 
    ) 
} 
