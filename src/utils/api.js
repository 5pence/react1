export function fetchPopularRepos(language) {
    const endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)

    // pass the endpoint to the fetch promise - make the request
    return fetch(endpoint)
        // convert to json - convert the response to json
        .then((res) => res.json())
        .then((data) => {
            // if data.items isn't a thing then something went wrong so grab the message and fire new error
            if (!data.items) {
                throw new Error(data.message)
            }
            return data.items
        })
        // the reason we have no catch is there's nothing we can do at this point to update to the user inside here

}