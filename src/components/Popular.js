import * as React from 'react'

function LanguagesNav ({selected, onUpdateLanguage}) {
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
        super(props);
        this.state = {
            selectedLanguage: 'All'
        }
        this.updateLanguage = this.updateLanguage.bind(this)
    }

    updateLanguage(selectedLanguage) {
        console.log(this.state)
        this.setState({
            selectedLanguage
        })
    }

    render() {
        const { selectedLanguage } = this.state

        return (
            <React.Fragment>
                <LanguagesNav
                    selected={selectedLanguage}
                    onUpdateLanguage={this.updateLanguage}/>
            </React.Fragment>
        )
    }
}
