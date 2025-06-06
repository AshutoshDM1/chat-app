/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "avatars.githubusercontent.com",
            "lh3.googleusercontent.com",
            "res.cloudinary.com",
            "platform-lookaside.fbsbx.com",
            "randomuser.me",
        ],
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
};

export default nextConfig;
