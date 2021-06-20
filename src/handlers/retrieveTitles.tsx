import retrieveTitle from './retrieveTitle'

const retrieveTitles = async (
    urls: Array<string>
): Promise<(string | null)[]> => {
    const titles = await Promise.all(urls.map((url) => retrieveTitle(url)))
    return titles
}

export default retrieveTitles
