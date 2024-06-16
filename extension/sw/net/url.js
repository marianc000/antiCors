export function hostname(url) {
    return new URL(url).hostname;
}

export function origin(url) {
    return new URL(url).origin;
}

export function valid(url) {
    return url&&url.startsWith('http');
}

