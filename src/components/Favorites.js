
import React from 'react';
import { FaTimes } from 'react-icons/fa';

const Favorites = ({ favorites, removeFavorite }) => {

    return (
        <div className="favorites-container">
            <h3 className="favorites-title">Your Favorites</h3>
            <ul className="favorites-list">
                {favorites.length > 0 ? (
                    favorites.map((city, index) => (
                        <li key={index} className="favorites-item">
                            <span className="city-name">{city}</span>
                            <button
                                className="remove-btn"
                                onClick={() => removeFavorite(city)}
                                title="Remove from favorites"
                            >
                                <FaTimes />
                            </button>
                        </li>
                    ))
                ) : (
                    <p className="no-favorites">No favorites added yet.</p>
                )}
            </ul>
        </div>
    );
};

export default Favorites;
