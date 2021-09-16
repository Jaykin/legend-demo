'use strict';
exports.main_handler = async (event, context) => {
    console.log("Hello World")
    console.log(event)
    console.log(event["non-exist"])
    console.log(context)
    return {
        "isBase64Encoded": false,
        "statusCode": 200,
        "headers": {"Content-Type":"text/html"},
        "body": "<html><body><h1>Heading</h1><p>Paragraph.</p></body></html>"
    }
};