function RestCheck(response) {
    if (!response.ok) {
        console.log("ERROR",response);
        throw Error(response.status.toString());
    }
    return response.json();
}

export default RestCheck;