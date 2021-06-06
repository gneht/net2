const retrieveTitle = async (url: string) => {
    const data = await fetch(`https://cors-anywhere.herokuapp.com/${url}`, {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    })
        .then((res) => {
            return res.text()
        })
        .catch((res) => {
            return 'ERROR'
        })
    const matches = data.match(/<title>(.*?)<\/title>/)
    if (matches) {
        return matches[1]
    }
    return null
}

export default retrieveTitle
