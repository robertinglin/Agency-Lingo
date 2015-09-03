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

    saveTerm ( name, definition, related, success, usePut )  {

        client( { path: 'http://127.0.0.1:7777/api/terms/' + name,
                    method: usePut? 'PUT' : 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    entity: {
                        definition
                    } 
                }).then( res=>{

                    success( res );
                });
    }

    removeTerm ( name, success ) {

        client( { path: 'http://127.0.0.1:7777/api/terms/' + name,
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then( res=>{

                    success( res );
                });
    }

    editTerm ( name, definition, related, success ) {

        this.saveTerm( name, definition, related, success, true );
    }
}
export default new TermsDataBridge();