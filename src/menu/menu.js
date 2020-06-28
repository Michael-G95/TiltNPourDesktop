import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">Tilt N Pour</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Brewery
                        </Link>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <Link className="dropdown-item" to="/addbrewery">Add Brewery</Link>
                            <Link className="dropdown-item" to="/editbrewery">Edit Brewery</Link>
                            <Link className="dropdown-item" to="#">Delete Brewery</Link>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Menu;