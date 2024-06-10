const axios = require('axios');

const BASE_URL = `http://${process.env.BACKEND_HOST}`; // Replace with your API base URL

class EsignClient {
    constructor() {
        this.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${Buffer.from(`${process.env.BACKEND_USER}:${process.env.BACKEND_PASSWORD}`).toString('base64')}`,
        };
    }

    async getTotp(data) {
        try {
            const response = await axios.post(`${BASE_URL}/api/v2/sign/get/totp`, data, { headers: this.headers });
            return response.data;
        } catch (error) {
            console.error('Error getting TOTP:', error);
            throw error;
        }
    }

    /**
     * Signs a PDF document.
     *
     * @param {object} data - An object containing the following parameters:
     *  - `nik` (string, optional) - The user's NIK.
     *  - `email` (string, optional) - The user's email address.
     *  - `passphrase` (string, optional) - The user's passphrase.
     *  - `totp` (string, optional) - The user's One-Time Password (OTP).
     *  - `signatureProperties` (array, required) - An array of objects containing signature properties:
     *    - `tampilan` (string, required) - The display type ('VISIBLE' or 'INVISIBLE').
     *    - `imageBase64` (string, optional) - The base64 encoded image for a visible signature.
     *    - `page` (number, optional) - The page number for the signature.
     *    - `originX` (number, optional) - The X-coordinate of the signature.
     *    - `originY` (number, optional) - The Y-coordinate of the signature.
     *    - `width` (number, optional) - The width of the signature.
     *    - `height` (number, optional) - The height of the signature.
     *    - `location` (string, optional) - The location of the signature.
     *    - `reason` (string, optional) - The reason for the signature.
     *    - `pdfPassword` (string, optional) - The password for the PDF document (if any).
     *    - `tag_koordinat` (string, optional) - The tag coordinate for the signature (if using tag coordinates).
     *  - `file` (array, required) - An array of base64 encoded PDF files to be signed.
     * @returns {Promise<object>} A Promise resolving to the signed PDF data.
     */
    async signPdf(data) {
        try {
            const response = await axios.post(`${BASE_URL}/api/v2/sign/pdf`, data, { headers: this.headers });
            return response.data;
        } catch (error) {
            console.error('Error signing PDF:', error);
            throw error;
        }
    }

    /**
     * Activates the Electronic Seal.
     *
     * @param {string} idSubscriber - The ID of the subscriber.
     * @returns {Promise<object>} A Promise resolving to the activation status.
     */
    async activateSeal(idSubscriber) {
        try {
            const response = await axios.post(`${BASE_URL}/api/v2/seal/get/activation`, { idSubscriber }, { headers: this.headers });
            return response.data;
        } catch (error) {
            console.error('Error activating seal:', error);
            throw error;
        }
    }

    /**
     * Refreshes the Electronic Seal activation.
     *
     * @param {string} idSubscriber - The ID of the subscriber.
     * @param {string} totp - The One-Time Password (OTP).
     * @returns {Promise<object>} A Promise resolving to the refresh status.
     */
    async refreshSeal(idSubscriber, totp) {
        try {
            const response = await axios.post(`${BASE_URL}/api/v2/seal/get/activation`, { idSubscriber, totp }, { headers: this.headers });
            return response.data;
        } catch (error) {
            console.error('Error refreshing seal:', error);
            throw error;
        }
    }

    /**
     * Revokes the Electronic Seal activation.
     *
     * @param {string} idSubscriber - The ID of the subscriber.
     * @param {string} totp - The One-Time Password (OTP).
     * @returns {Promise<object>} A Promise resolving to the revocation status.
     */
    async revokeSeal(idSubscriber, totp) {
        try {
            const response = await axios.post(`${BASE_URL}/api/v2/seal/revoke/activation`, { idSubscriber, totp }, { headers: this.headers });
            return response.data;
        } catch (error) {
            console.error('Error revoking seal:', error);
            throw error;
        }
    }

    /**
     * Gets an OTP for sealing PDF documents.
     *
     * @param {string} idSubscriber - The ID of the subscriber.
     * @param {number} data - The number of files to be sealed.
     * @param {string} totp - The One-Time Password (OTP).
     * @returns {Promise<object>} A Promise resolving to the OTP data.
     */
    async getSealOtp(idSubscriber, data, totp) {
        try {
            const response = await axios.post(`${BASE_URL}/api/v2/seal/get/totp`, { idSubscriber, data, totp }, { headers: this.headers });
            return response.data;
        } catch (error) {
            console.error('Error getting seal OTP:', error);
            throw error;
        }
    }

    /**
     * Seals PDF documents.
     *
     * @param {string} idSubscriber - The ID of the subscriber.
     * @param {string} totp - The One-Time Password (OTP).
     * @param {number} data - The number of files to be sealed.
     * @param {array} signatureProperties - An array of objects containing seal properties (see signPdf method).
     * @param {array} file - An array of base64 encoded PDF files to be sealed.
     * @returns {Promise<object>} A Promise resolving to the sealed PDF data.
     */
    async sealPdf(idSubscriber, totp, data, signatureProperties, file) {
        try {
            const response = await axios.post(`${BASE_URL}/api/v2/seal/pdf`, { idSubscriber, totp, data, signatureProperties, file }, { headers: this.headers });
            return response.data;
        } catch (error) {
            console.error('Error sealing PDF:', error);
            throw error;
        }
    }

    /**
     * Checks the status of a user.
     *
     * @param {object} data - An object containing either:
     *  - `nik` (string) - The user's NIK.
     *  - `email` (string) - The user's email address.
     * @returns {Promise<object>} A Promise resolving to the user's status.
     */
    async checkUserStatus(data) {
        try {
            const response = await axios.post(`${BASE_URL}/api/v2/user/check/status`, data, { headers: this.headers });
            return response.data;
        } catch (error) {
            console.error('Error checking user status:', error);
            throw error;
        }
    }

    /**
     * Registers a new user.
     *
     * @param {string} nama - The user's name.
     * @param {string} email - The user's email address.
     * @returns {Promise<object>} A Promise resolving to the registration status.
     */
    async registerUser(nama, email) {
        try {
            const response = await axios.post(`${BASE_URL}/api/v2/user/registration`, { nama, email }, { headers: this.headers });
            return response.data;
        } catch (error) {
            console.error('Error registering user:', error);
            throw error;
        }
    }

    /**
     * Verifies a signed PDF document.
     *
     * @param {string} file - The base64 encoded PDF file to be verified.
     * @param {string} password - The password for the PDF document (if any).
     * @returns {Promise<object>} A Promise resolving to the verification status.
     */
    async verifyPdf(file, password) {
        try {
            const response = await axios.post(`${BASE_URL}/api/v2/verify/pdf`, { file, password }, { headers: this.headers });
            return response.data;
        } catch (error) {
            console.error('Error verifying PDF:', error);
            throw error;
        }
    }
}

module.exports = EsignClient;