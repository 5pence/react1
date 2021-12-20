import * as React from 'react'
import PropTypes from "prop-types";
import { fetchPopularRepos } from "../utils/api";

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
            selectedLanguage: 'All',
            repos: {},
            error: null
        }
        // now LanguagesNav is abstracted into a function we need this binding for state wiring
        this.updateLanguage = this.updateLanguage.bind(this)
        this.isLoading = this.isLoading.bind(this)
    }

    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage)
    }

    updateLanguage(selectedLanguage) {
        // using setState to update the value string of selectedLanguage
        this.setState({
            selectedLanguage,
            error: null
        })

        if (!this.state.repos[selectedLanguage]) {
            fetchPopularRepos(selectedLanguage)
                .then((data) => {
                    this.setState(({repos}) => ({
                        repos: {
                            ...repos,
                            [selectedLanguage]: data
                        }
                    }))
                })
                .catch((error) => {
                    console.warn('Error fetching them repos: ', error)
                    this.setState({
                        error: 'There was an error fetching the repositories from GitHub'
                    })
                })
        }
    }

    isLoading() {
        const { selectedLanguage, repos, error } = this.state
        return !repos[selectedLanguage] && error === null
    }

    render() {
        const { selectedLanguage, repos, error } = this.state

        return (
            /** remember React only like one top div wrapper - React.Fragment allows to stack many inside,
             *  as would div, but React.Fragment is far more semantic and stops loads of extra divs on page
             */
            <React.Fragment>
                <LanguagesNav
                    selected={selectedLanguage}
                    onUpdateLanguage={this.updateLanguage}/>
                {this.isLoading() && <p>LOADING</p>}
                {error && <p>{ error }</p>}
                {repos[selectedLanguage] && <pre>{ JSON.stringify(repos[selectedLanguage], null, 2) }</pre>}
            </React.Fragment>
        )
    }
}
