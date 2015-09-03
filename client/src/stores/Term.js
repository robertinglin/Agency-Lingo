import Immutable from 'immutable';


const TermRecord = Immutable.Record({
  id: undefined,
  name: undefined,
  definition: undefined,
  related: undefined
});

var termCounter = 0;

class Term extends TermRecord {
  id: string;
  name: string;
  definition: string;

  constructor(name, definition, related = [] ) {
    super({
      id: Date.now() + '' + termCounter++,
      name,
      definition,
      related
    });
  }
}

export default Term;