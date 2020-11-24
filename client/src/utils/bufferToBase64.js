export function bufferToBase64(data) {
    return new Buffer(data).toString('base64')
}