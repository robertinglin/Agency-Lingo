import React from 'react';
import AgencyLingo from './components/AgencyLingo';
import termsDataBridge from './TermsDataBridge';
import LingoNavBar from './components/NavBar';
import {register,getLocation} from 'lucid-router';

termsDataBridge.getTerms();

const lingoContainer = document.getElementById('lingo-container');


  React.render(<AgencyLingo />, lingoContainer);
