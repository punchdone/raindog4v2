import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {


    render() {
        return (

            <nav className="green">
                <div className="nav-wrapper">
                    <Link 
                        to="/"
                        className="left brand-logo">
                            Raindog
                    </Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><a href="/projects">Projects</a></li>
                        <li><a href="/products">Catalog</a></li>
                        <li><a href="/products/selections">Selections</a></li>
                        <li><a href="/login">Login</a></li>
                    </ul>
                    
                </div>
            </nav>
        )
    }
};

export default Header;