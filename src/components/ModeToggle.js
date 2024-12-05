import React from 'react'

const ModeToggle = ({ toggleMode, isDarkMode }) => {
    return (
        <div className='mode-toggle'>
            <button className='toggle-btn' onClick={toggleMode}>
                {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>
        </div>
    )
}

export default ModeToggle