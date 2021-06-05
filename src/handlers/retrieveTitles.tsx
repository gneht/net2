import retrieveTitle from './retrieveTitle'

const retrieveTitles = async (urls: Array<string>) => {
    let title
    const titles = []
    for (const url of urls) {
        title = await retrieveTitle(url)
        titles.unshift(title)
    }
    return titles
}

export default retrieveTitles
