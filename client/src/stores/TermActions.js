// Term actions. Wooooo

import termStore from './TermStore';
import termsDataBridge from '../resources/termsDataBridge';


export const TERM_LOAD = 'term/load';
export const TERM_LOAD_COMPLETE = 'term/load-complete';
export const TERM_CREATE = 'term/create';
export const TERM_UPDATE_NAME = 'term/update-name';
export const TERM_UPDATE_DEFINITION = 'term/update-definition';
export const TERM_ADD_RELATED = 'term/add-related';
export const TERM_REMOVE_RELATED = 'term/remove-related';



export function TermsLoad() {

    termsDataBridge.getTerms( function( data ){
        var termsObjects = [];


        // Manipulate the data before sending it to the store
        for( let i = 0, len = data.length; i < len; ++i ){

            termsObjects.push( { name : data[ i ].Name, definition: data[ i ].Definition, related: data[ i ].Related } );
        }

        termStore.dispatch( {type: TERM_LOAD_COMPLETE, rawTerms: termsObjects });
    });
    

    return { type: TERM_LOAD }
}

export function CreateTerm( name, definition, related ) {

    return { type: TERM_CREATE, ...arguments };
}