const blackList = {
    '<':'&lt;',
    '>':'&gt;',
    '"':'&quot;',
    '&':'&amp;',
    '\'':'&#39;',
};


const xssReg = /[<>"'&]/g;


/**
 * @param {string} string
 * @returns  string
 */
function escapeHtml(string) {
    return string.replace(xssReg, (match) =>  {
        return blackList[match];
    });
}

exports.escapeHtml = escapeHtml;
exports.blackList = blackList
;
