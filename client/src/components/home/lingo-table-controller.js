
class lingoTableController {

	filterData( terms, filterText ) {
		var cleanedFilter =  filterText.replace(/\s/g, '').toLowerCase();

		var filteredTerms = terms.filter(function( term ){
			return ~term.Name.toLowerCase().replace(/\s/g, '').indexOf(cleanedFilter);
		});
        return filteredTerms;
                             
	}
}

export default lingoTableController; 