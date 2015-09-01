import React from 'react';
import AgencyLingo from './components/AgencyLingo';
import termsDataBridge from './TermsDataBridge';

termsDataBridge.getTerms();

React.render(<AgencyLingo />, document.getElementById('lingo-container'));