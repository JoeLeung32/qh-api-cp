const errorGenerator = (statusCode, message) => {
	const err = new Error(message);
	err.statusCode = statusCode;
	return err;
}

export const StatusCodes = {
	// Information responses
	C100: errorGenerator(100, 'Continue'),
	C101: errorGenerator(101, 'Switching Protocols'),
	C102: errorGenerator(102, 'Processing'), // WebDAV
	C103: errorGenerator(103, 'Early Hints'),

	// Successful responses
	C200: errorGenerator(200, 'OK'),
	C201: errorGenerator(201, 'Created'),
	C202: errorGenerator(202, 'Accepted'),
	C203: errorGenerator(203, 'Non-Authoritative Information'),
	C204: errorGenerator(204, 'No Content'),
	C205: errorGenerator(205, 'Reset Content'),
	C206: errorGenerator(206, 'Partial Content'),
	C207: errorGenerator(207, 'Multi-Status'), // WebDAV
	C208: errorGenerator(208, 'Already Reported'), // WebDAV
	C226: errorGenerator(226, 'IM Used'), // HTTP Delta encoding

	//Redirection messages
	C300: errorGenerator(300, 'Multiple Choices'),
	C301: errorGenerator(301, 'Moved Permanently'),
	C302: errorGenerator(302, 'Found'),
	C303: errorGenerator(303, 'See Other'),
	C304: errorGenerator(304, 'Not Modified'),
	C305: errorGenerator(305, 'Use Proxy'), // Deprecated
	// C306: errorGenerator(306, ''), // This response code is no longer used
	C307: errorGenerator(307, 'Temporary Redirect'),
	C308: errorGenerator(308, 'Permanent Redirect'),

	// Client error responses
	C400: errorGenerator(400, 'Bad Request'),
	C401: errorGenerator(401, 'Unauthorized'),
	C402: errorGenerator(402, 'Payment Required Experimental'), // Experimental
	C403: errorGenerator(403, 'Forbidden'),
	C404: errorGenerator(404, 'Not Found'),
	C405: errorGenerator(405, 'Method Not Allowed'),
	C406: errorGenerator(406, 'Not Acceptable'),
	C407: errorGenerator(407, 'Proxy Authentication Required'),
	C408: errorGenerator(408, 'Request Timeout'),
	C409: errorGenerator(409, 'Conflict'),
	C410: errorGenerator(410, 'Gone'),
	C411: errorGenerator(411, 'Length Required'),
	C412: errorGenerator(412, 'Precondition Failed'),
	C413: errorGenerator(413, 'Payload Too Large'),
	C414: errorGenerator(414, 'URI Too Long'),
	C415: errorGenerator(415, 'Unsupported Media Type'),
	C416: errorGenerator(416, 'Range Not Satisfiable'),
	C417: errorGenerator(417, 'Expectation Failed'),
	C418: errorGenerator(418, "I'm a teapot"),
	C421: errorGenerator(421, "Misdirected Request"),
	C422: errorGenerator(422, "Unprocessable Entity"), // WebDAV
	C423: errorGenerator(423, "Locked"), // WebDAV
	C424: errorGenerator(424, "Failed Dependency"), // WebDAV
	C425: errorGenerator(425, "Too Early"), // Experimental
	C426: errorGenerator(426, "Upgrade Required"),
	C428: errorGenerator(428, "Precondition Required"),
	C429: errorGenerator(429, "Too Many Requests"),
	C431: errorGenerator(431, "Request Header Fields Too Large"),
	C451: errorGenerator(451, "Unavailable For Legal Reasons"),

	//Server error responses
	C500: errorGenerator(500, "Internal Server Error"),
	C501: errorGenerator(501, "Not Implemented"),
	C502: errorGenerator(502, "Bad Gateway"),
	C503: errorGenerator(503, "Service Unavailable"),
	C504: errorGenerator(504, "Gateway Timeout"),
	C505: errorGenerator(505, "HTTP Version Not Supported"),
	C506: errorGenerator(506, "Variant Also Negotiates"),
	C507: errorGenerator(507, "Insufficient Storage"), // WebDAV
	C508: errorGenerator(508, "Loop Detected"), // WebDAV
	C510: errorGenerator(510, "Not Extended"),
	C511: errorGenerator(511, "Network Authentication Required"),
}
