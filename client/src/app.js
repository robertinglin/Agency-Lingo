import React from 'react';
import AgencyLingo from './components/AgencyLingo';
import LingoNavBar from './components/NavBar';
import {register,getLocation} from 'lucid-router';
import {TermsLoad} from './stores/TermActions';

TermsLoad();

const lingoContainer = document.getElementById('lingo-container');

React.render(<AgencyLingo />, lingoContainer);
