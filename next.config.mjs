/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
            protocol: "https",
            hostname: "d3qc9p8qvz70tt.cloudfront.net",
            port: '',
            pathname: "/**",
            },
            ]
    }
};

export default nextConfig;
