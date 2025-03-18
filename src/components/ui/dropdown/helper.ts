// import murmurhash from 'murmurhash';

export function generateUniqueKey(data : string) : string {
    // return `${murmurhash.v3(data.toLowerCase().split(' ').join('-'))}`;
    return `${data.toLowerCase().split(' ').join('-')}`;
}
