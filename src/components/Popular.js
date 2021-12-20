import * as React from 'react'
import PropTypes from "prop-types";

function LanguagesNav ({selected, onUpdateLanguage}) {
    /**
     * Takes in what menu item was clicked and an updating function
     */
    const languages = ['All', 'JavaScript', 'Python', 'Ruby', 'Java', 'CSS', ]

    return (
        <ul className='flex-center'>
            {languages.map((language) => (
                <li key={language}>
                    <button className='btn-clear nav-link'
                            style={language === selected ? { color: 'red' } : null}
                            onClick={() => onUpdateLanguage(language)}>
                        {language}
                    </button>
                </li>
            ))}
        </ul>
    )
}

// uses class PropTypes to declare types of attributes for function LanguagesNav, for safety, easier and fewer
// overheads than using Typescript throughout
LanguagesNav.propType = {
    selected: PropTypes.string.isRequired,
    onUpdateLanguage: PropTypes.func.isRequired
}

export default class Popular extends React.Component {
    constructor(props) {
        // as usual, call the parent constructor of extended class first
        super(props);
        this.state = {
            selectedLanguage: 'All'
        }
        // now LanguagesNav is not abstracted into a function we need this binding for state wiring
        this.updateLanguage = this.updateLanguage.bind(this)
    }

    updateLanguage(selectedLanguage) {
        // using setState to update the value string of selectedLanguage
        this.setState({
            selectedLanguage
        })
    }

    render() {
        const { selectedLanguage } = this.state

        return (
            /** remember React only like one top div wrapper - React.Fragment allows to stack many inside,
             *  as would div, but React.Fragment is far more semantic and stops loads of extra divs on page
             */
            <React.Fragment>
                <LanguagesNav
                    selected={selectedLanguage}
                    onUpdateLanguage={this.updateLanguage}/>
            </React.Fragment>
        )
    }
}
