import React from 'react';
import AgencyLingo from './components/AgencyLingo';
import {register,getLocation,addRoutes} from 'lucid-router';
import {TermsLoad} from './stores/TermActions';

addRoutes([
    {name: 'browse', path: '/'},
    {name: 'search', path: '/search', external: false},
    {name: 'admin', path: '/admin', external: false}
]);

TermsLoad();

const lingoContainer = document.getElementById('lingo-container');

React.render(<AgencyLingo />, lingoContainer);
