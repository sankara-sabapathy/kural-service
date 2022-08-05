export class CredentialsService {
    static xHasuraAdminSecret: string;
    static sibApiKey: string;
    static authToken: string;

    static setSecretValue(xHasuraAdminSecret: string, sibApiKey: string) {
        this.xHasuraAdminSecret = xHasuraAdminSecret;
        this.sibApiKey = sibApiKey
    }
    static setAuthToken(token: string) {
        this.authToken = token;
    }

    static getHasuraAdminSecret() {
        return this.xHasuraAdminSecret;
    }
    
    static getSibApiKey() {
        return this.sibApiKey;
    }

    static getAuthToken() {
        return this.authToken;
    }
}