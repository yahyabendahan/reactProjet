import React from 'react';

const Hero = ({handleLogout}) => {

    return(
        <section classeName="Hero">
            <nav>
                <h2>Welcome</h2>
                <button onClick={handleLogout}>Logout</button>
            </nav>
        </section>
    )
}
export default Hero;
