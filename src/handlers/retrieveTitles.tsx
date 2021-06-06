import retrieveTitle from './retrieveTitle'

const retrieveTitles = async (urls: Array<string>) => {
    const titles = Promise.all(urls.map((url) => retrieveTitle(url)))
    return titles
}

export default retrieveTitles
