import React from 'react';
import './main.css';
import Button from 'react-bootstrap/lib/Button'

//row for each Sapient lingo
var LingoRow = React.createClass({
        render: function() {
                    return (
                        <tr>
                          <td>{this.props.term.Name}</td>
                          <td>{this.props.term.Definition}</td>
                          <td>{this.props.term.Note}</td>
                        </tr>
                          );
        }
});
 
//table for the whole thing
var LingoTable = React.createClass({

    //creating state which returns terms array
        getInitialState: function() {
                return {
                        terms: []
                };
        },
        //loading JSON data for LingoTable to use 
        componentDidMount: function(){
            //function that will get the data
                this.getTerms();
        },
        //creating table and headers
        render() {
                return (
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Definition</th>
                                    <th>Note</th>
                                 </tr>
                             </thead>
                            
                             <tbody>{this.state.terms.filter(term => {
                                return !!~term.Name.indexOf(this.props.filterText)})
                             .map(term => <LingoRow term={term} key={term.name} />)} </tbody>
                         </table>
            );
 
        },
        //term getting JSON data
        getTerms:function(){
                fetch('./lingo.json')
                .then(res => {
                        if (res.status !== 200) {
                                console.log('Get it together, Nick! Error: ' + res.status);
                                throw new Error('Error fetching');
                        }
                        return res.json();
                })
                .then(data => {
                    //setting state terms so that it returns JSON data in terms = []
                    this.setState({ terms: data });
                })
                .catch(function(err) {
                        console.log('Fetch Error X_x', err);
                });
        }});

//creating search bar class
var SearchBar = React.createClass({
    //runs every time a user inputs in search bar
     handleChange: function() {
        this.props.onUserInput(
            this.refs.filterTextInput.getDOMNode().value
        );
    },
    //rendering form field for Search Bar
        render: function() {
                return (
                 <form>
                    <input
                    type="text"
                    placeholder="Search..."
                    value={this.props.filterText}
                    ref="filterTextInput"
                    //calls handleChange when user character inputs
                    onChange={this.handleChange} />
                </form>
               );
        }
});
 
//making table filterable
var FilterableLingoTable = React.createClass({
    //creating empty string for filterableText
    getInitialState: function() {
        return {
            filterText: ''
        };
    },
    //when user inputs data set that state to filterText
    handleUserInput: function(filterText) {
        this.setState({
            filterText: filterText
        });
    },
        render: function() {
                return (
                        <div>
                            <SearchBar
                            filterText={this.state.filterText} 
                            onUserInput={this.handleUserInput} />

                            <LingoTable 
                            terms={this.props.terms}
                            filterText={this.state.filterText} />
                    </div>
                    );
        }
});
React.render(<FilterableLingoTable  />, document.getElementById('lingo-container'));