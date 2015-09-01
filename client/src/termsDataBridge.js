import termStore from './stores/TermStore';

class TermsDataBridge {

	getTerms () {
		fetch('data/json/lingo.json')
        .then(res => {
                if (res.status !== 200) {
                        console.log('Get it together, Nick! Error: ' + res.status);
                        throw new Error('Error fetching');
                }
                return res.json();
        })
        .then(data => {

            termStore.dispatch( {type: 'term/load', rawTerms: data });
            
        })
        .catch(function(err) {
                console.log('Fetch Error X_x', err);
        });
	}
}
export default new TermsDataBridge();