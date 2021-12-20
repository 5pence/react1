import * as React from 'react'

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

export default class Popular extends React.Component {
    constructor(props) {
        // as usual, call the parent constructor of extended class first
        super(props);
        this.state = {
            selectedLanguage: 'All'
        }
        // doesn't really need this at the moment, but let's get into this habit!
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
