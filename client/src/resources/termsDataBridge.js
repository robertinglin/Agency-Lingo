import termStore from '../stores/TermStore';
import rest from 'rest';
import mime from 'rest/interceptor/mime';


var client = rest.wrap(mime);

class TermsDataBridge {

    getTerms ( success, error = function(){} ) {

        client( { path :'http://127.0.0.1:7777/api/terms' } )
        .then(res => {

                if (res.status.code !== 200) {
                    
                    console.log('fail');
                    error( res.status )

                } else {
                    
                    success( res.entity );
                }
        })
        .catch(function(err) {

            client( { path :'/data/json/lingo.json' } )
                .then( res => {
                    success( res.entity );

                })
                .catch(function( err ){
                    error( err );
                }) ;
        });
    }
}
export default new TermsDataBridge();