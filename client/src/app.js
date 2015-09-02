import React from 'react';
import AgencyLingo from './components/AgencyLingo';
import {TermsLoad} from './stores/TermActions';

TermsLoad();

React.render(<AgencyLingo />, document.getElementById('lingo-container'));