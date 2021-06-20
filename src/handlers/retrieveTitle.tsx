const retrieveTitle = async (url: string): Promise<string | null> => {
    const data = await fetch(`https://cors-anywhere.herokuapp.com/${url}`, {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    })
        .then((res) => {
            return res.text()
        })
        .catch(() => {
            return 'ERROR'
        })
    const matches = data.match(/<title>(.*?)<\/title>/)
    if (matches) {
        return matches[1]
    }
    return null
}

export default retrieveTitle
