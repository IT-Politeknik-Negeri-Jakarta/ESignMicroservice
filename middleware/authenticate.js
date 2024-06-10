const Application = require('../infras/db/models/application');

const authenticate = async (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({ message: 'Missing Authorization header' });
    }

    // Expecting header format: Authorization: Basic base64(client_id:client_secret)
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [clientId, clientSecret] = credentials.split(':');

    if (!clientId || !clientSecret) {
        return res.status(401).json({ message: 'Invalid Authorization header format' });
    }

    try {
        const client = await Application.findOne({client_id: clientId, clientSecret: clientSecret});
        if (!client) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = authenticate;