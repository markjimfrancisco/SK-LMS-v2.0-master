import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { redirect } from "next/dist/next-server/server/api-utils";

const options = {
    providers: [
        Providers.Facebook({
            clientId: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET
        }),
        Providers.Google({
             clientId: process.env.GOOGLE_ID,
             clientSecret: process.env.GOOGLE_SECRET,
         })
    ],

    //Token
    jwt: {
        encryption: true,
    },
    secret: process.env.secret,

    callbacks: {
        async jwt (token, account) {
            if(account?.accessToken) {
                token.accessToken = account.accessToken;
            }
            return token;
        },
        redirect: async(url, baseUrl) => {
            if (url === '/profile') {
                return Promise.resolve('/');
            }
            return Promise.resolve('/');
        }
    },

    pages: {
        signIn: '/'
    }
}

export default (req, res) => NextAuth(req, res, options);