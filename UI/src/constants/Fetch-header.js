const FetchHeader = new Headers();
FetchHeader.append('pragma', 'no-cache');
FetchHeader.append('cache-control', 'no-cache');

export default FetchHeader;