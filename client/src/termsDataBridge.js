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

        	var termsObjects = [];

        	// Manipulate the data before sending it to the store
        	for( let i = 0, len = data.length; i < len; ++i ){

        		termsObjects.push( { name : data[ i ].Name, definition: data[ i ].Definition, related: data[ i ].Related } );
        	}

            termStore.dispatch( {type: 'term/load', rawTerms: termsObjects });
            
        })
        .catch(function(err) {
                console.log('Fetch Error X_x', err);
        });
	}
}
export default new TermsDataBridge();