export const isObjectWithKey = obj => obj !== null && Object.entries(obj).length > 0 && obj.constructor === Object

export const cloneData = data => {
    return JSON.parse(JSON.stringify(data))
}