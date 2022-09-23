/**
 * Hash a string in base64.
 * @async
 * @function
 * @param {string} string The string to be converted 
 * @returns {string} The string in base64 format
 * @example 
 * console.log(HashNamespace("Hello World")) // 'SGVsbG8gV29ybGQ='
 */
 function HashNamespace (string:string) : string {
    return window.btoa(string);
}

export default HashNamespace;