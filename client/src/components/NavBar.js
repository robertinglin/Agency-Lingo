import React from 'react';
import {addRoutes,navigatorFor} from 'lucid-router';


addRoutes([
    {name: 'browse', path: '/'},
    {name: 'search', path: '/search', external: false}
]);
    
class LingoNavBar extends React.Component {
    render() {
        return (
            <div className="nav-bar">
                <a value="browse" onClick={navigatorFor('/')}>Browse</a>
                <a value="search" onClick={navigatorFor('/search')}>Search</a>
            </div>
        );
    }
}

export default LingoNavBar;