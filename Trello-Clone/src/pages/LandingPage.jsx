import React from 'react';
import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <>
            <div>Login feature to be added soon.</div >
            <div>
                <Link
                    to={`/board`}
                    style={{ textDecoration: "none", margin: "10px" }}
                >
                    Go to Home Page
            </Link>
            </div>
        </>
    )
}

export default LandingPage
