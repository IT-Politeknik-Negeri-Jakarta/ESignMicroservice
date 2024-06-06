import * as Minio from "minio";

const minioClient = new Minio.Client({
    endpoint: process.env.MINIO_ENDPOINT,
    port: process.env.MINIO_PORT,
    accessToken: process.env.MINIO_ACCESS_KEY,
    secret: process.env.MINIO_SECRET_KEY,
    useSSL: false,
})

export default minioClient;