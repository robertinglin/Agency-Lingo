import Immutable from 'immutable';


const TermRecord = Immutable.Record({
  id: undefined,
  name: undefined,
  definition: undefined,
  related: undefined
});

class Term extends TermRecord {
  id: string;
  name: string;
  definition: string;

  constructor(name, definition, related = [] ) {
    super({
      id: Date.now() + Math.round(Math.random() * 1000),
      name,
      definition,
      related
    });
  }
}

export default Term;