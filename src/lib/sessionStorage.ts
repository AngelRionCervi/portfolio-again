export function setSeenWorkPage() {
    sessionStorage.setItem('seenWork', 'true');
}

export function getSeenWorkPage() {
    return sessionStorage.getItem('seenWork');
}
