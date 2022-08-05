import axios from "axios";
import { CredentialsService } from "./credentialService";

export class GraphQLService {
    public async getKural(kuralNo: number) {
        return axios.post(
            'https://thirukkural.hasura.app/v1/graphql',
            { query: "query getKural($number: Int) {\r\n  thirukkural(where: {number: {_eq: $number}}) {\r\n    kural\r\n  }\r\n}",
                variables: { number : kuralNo }
            },
            { 
                headers: {
                    "content-type": "application/json",
                    "x-hasura-admin-secret": CredentialsService.getHasuraAdminSecret()
                }
            }
        )
        .then(result => {return result.data})
        .catch(error => {
            console.log("error: ",error);
            return undefined;
        })
    }

    public async getKuralForEmail(kuralNo: number) {
        console.log("Querying kural number: ", kuralNo);
        return axios.post(
            'https://thirukkural.hasura.app/v1/graphql',
            { query: "query getKural($number: Int) {\r\n  thirukkural(where: {_and: [{number: {_eq: $number}}, {sent: {_eq: false}}]}) {\r\n    kural\r\n    number\r\n    pal\r\n    iyal\r\n    adikaram\r\n    mu_varatha\r\n    mu_karu\r\n    salaman\r\n    explanation\r\n  }\r\n}",
                variables: { number : kuralNo}
            },
            { 
                headers: {
                    "content-type": "application/json",
                    "x-hasura-admin-secret": CredentialsService.getHasuraAdminSecret()
                }
            }
        )
        .then(result => {return result.data.data})
        .catch(error => {
            console.log("error: ",error);
            return undefined;
        })
    }

    public async getKuralForTestEmail(kuralNo: number) {
        console.log("Querying kural number: ", kuralNo);
        return axios.post(
            'https://thirukkural.hasura.app/v1/graphql',
            { query: "query getKural($number: Int) {\r\n  thirukkural(where: {_and: [{number: {_eq: $number}}, {sent: {_eq: false}}]}) {\r\n    kural\r\n    number\r\n    pal\r\n    iyal\r\n    adikaram\r\n    mu_varatha\r\n    mu_karu\r\n    salaman\r\n    explanation\r\n  }\r\n}",
                variables: { number : kuralNo}
            },
            { 
                headers: {
                    "content-type": "application/json",
                    "authorization": CredentialsService.getAuthToken()
                }
            }
        )
        .then(result => {return result.data.data})
        .catch(error => {
            console.log("error: ",error);
            return undefined;
        })
    }

    public async getEmailContacts() {
        return axios.post(
            'https://thirukkural.hasura.app/v1/graphql',
            { query: "query getContacts {\r\n  user(where:{subscribe_status:{_eq: true}}) {\r\n    name\r\n    email\r\n\t}\r\n}",
                variables: { }
            },
            { 
                headers: {
                    "content-type": "application/json",
                    "x-hasura-admin-secret": CredentialsService.getHasuraAdminSecret()
                }
            }
        )
        .then(result => {return result.data.data})
        .catch(error => {
            console.log("error: ",error);
            return undefined;
        })
    }
}