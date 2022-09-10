import { GetSecretValueCommand, SecretsManagerClient } from "@aws-sdk/client-secrets-manager";


export class SecretManagement {
    public async getSecret() {
        const secretManagerClient =  new SecretsManagerClient({endpoint: 'https://secretsmanager.ap-south-1.amazonaws.com', region:'ap-south-1'});
        const getSecretValueCommand = new GetSecretValueCommand({SecretId: 'arn:aws:secretsmanager:ap-south-1:612850243659:secret:kuralsecrets-u64XkK'});
        const secretValue =  await secretManagerClient.send(getSecretValueCommand);
        if(!secretValue.SecretString) {
            return undefined;
        }
        const xHasuraAdminSecret = JSON.parse(secretValue.SecretString)['x-hasura-admin-secret'];
        const sibApiKey = JSON.parse(secretValue.SecretString)['sib-x-api-key'];
        const botToken = JSON.parse(secretValue.SecretString)['telegram-bot-key'];
        return {
            xHasuraAdminSecret,
            sibApiKey,
            botToken
        }
    }
}