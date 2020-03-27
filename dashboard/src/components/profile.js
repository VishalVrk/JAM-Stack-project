import React from 'react';
import {Link} from 'gatsby';
import {useIdentityContext} from 'react-netlify-identity-widget';

const Profile = ({showModal}) =>{
    const identity = useIdentityContext();
    const isLoggedIn = identity && identity.isLoggedIn;
    console.log(identity);
    const name = 
    identity &&
    identity.user &&
    identity.user.app_metadata &&
    identity.user.app_metadata.full_name;

    return(
        isLoggedIn&&(
            <div className="dashboard-header">
             <nav>
                 <Link to="/dashboard/secret" activeClassName="active">
                     Secret Stuff
                 </Link>
                 <Link to="/dashboard/base" activeClassName="active">
                    See your base
                 </Link>
             </nav>
             <span>Logged In as {name}. <button onClick={showModal}>log out</button></span>
        </div>
        )
    )
}

export default Profile;