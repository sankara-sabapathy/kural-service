export class CredentialsService {
    static xHasuraAdminSecret: string;
    static sibApiKey: string;

    static setSecretValue(xHasuraAdminSecret: string, sibApiKey: string) {
        this.xHasuraAdminSecret = xHasuraAdminSecret;
        this.sibApiKey = sibApiKey
    }

    static getHasuraAdminSecret() {
        return this.xHasuraAdminSecret;
    }
    
    static getSibApiKey() {
        return this.sibApiKey;
    }
}