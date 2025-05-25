import React from 'react'

const Logout = () => {

    const handleLogOut = () => {
        localStorage.clear();
        window.location.href = '/';
    };

    return (
        <div>
            <button onClick={handleLogOut} className="bg-white px-2 py-1 rounded-md text-sm transition-all duration-200 hover:scale-105">Log Out</button>
        </div>
    )
}

export default Logout
