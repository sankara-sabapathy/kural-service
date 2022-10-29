import bodyParser from "body-parser";
import express from "express";
import serverless from "serverless-http";
import cors from "cors";
import { GraphQLService } from "src/services/graphql.service";
import { SecretManagement } from "src/services/secretmanagement.service";
import axios from "axios";
import { CredentialsService } from "src/services/credentialService";
const app: express.Express = express();
app.use(bodyParser.json({ strict: false }));
app.use(cors());
module.exports.handler = serverless(app);
app.post("/botHandler", async (req, res) => {
    try {
        const chatId = req.body.message.chat.id;
        const graphqlService: GraphQLService = new GraphQLService();
        const secretManagement: SecretManagement = new SecretManagement();
        const secretValue = await secretManagement.getSecret();
        if (!secretValue) {
            console.log("Failed to get Secrets from Secret manager", secretValue);
            res.status(200).json({ "Message": "Failed to get Secrets from Secret manager" }); // Always set statuscode to 200, to avoid retries from telegram.
            return;
        }
        CredentialsService.setSecretValue(secretValue.xHasuraAdminSecret, secretValue.sibApiKey);
        if (req.body.message.text === '/random') {
            const getKuralForEmailResult = await graphqlService.getKuralForEmail(randomNumber());
            if (!getKuralForEmailResult || getKuralForEmailResult.thirukkural.length < 1) {
                console.log("Failed to get Thirukkural from DB", getKuralForEmailResult);
                res.status(200).json({ "Message": "Failed to get Thirukkural from DB" }); // Always set statuscode to 200, to avoid retries from telegram.
                return;
            }
            try {
                const uri: any = await getFormattedURL(getKuralForEmailResult, secretValue.botToken, chatId);
                await axios.get(encodeURI(uri));
                res.status(200).json({ "Message": "Success" }); // Always set statuscode to 200, to avoid retries from telegram.
                return;
            } catch (err) {
                console.log('Error while sending kural using telegram bot: ' + err);
                res.status(200).json({ "Message": "Error while sending kural using telegram bot" }); // Always set statuscode to 200, to avoid retries from telegram.
                return;
            }
        } else {
            await axios.get(encodeURI('https://api.telegram.org/bot' + secretValue.botToken + '/sendMessage?chat_id=' + chatId + '&text=' + 'I am only a kid under development :-) Get a random Thirukkural from menu.'));
            res.status(200).json({ "Message": "Invalid request" }); // Always set statuscode to 200, to avoid retries from telegram.
            return;
        }
    } catch (error) {
        console.log("Internal server error", error);
        res.status(200).json({ "Message": "Success" }); // Always set statuscode to 200, to avoid retries from telegram.
        return;
    }
})

function randomNumber() {
    return Math.floor(Math.random() * (1080 - 1 + 1)) + 1;
}

function getFormattedURL(data: any, botToken: string, chatId: string) {
    return 'https://api.telegram.org/bot' + botToken + '/sendMessage?chat_id=' + chatId + '&text=' +
        '<b>' +
        data.thirukkural[0].kural[0] +
        '</b>' + '\n' + '<b>' +
        data.thirukkural[0].kural[1] +
        '</b>\n\n' +
        '<b>' + 'குறள் எண்: </b>' + data.thirukkural[0].number + '\n' +
        '<b>' + 'இயல்: </b>' + data.thirukkural[0].iyal + '\n' +
        '<b>' + 'அதிகாரம்: </b>' + data.thirukkural[0].adikaram + '\n\n' +
        '<b>' + data.thirukkural[0].mu_varatha[0] + '</b>\n' +
        data.thirukkural[0].mu_varatha[1] + '\n\n' +
        '<b>' + data.thirukkural[0].mu_karu[0] + '</b>\n' +
        data.thirukkural[0].mu_karu[1] + '\n\n' +
        '<b>' + data.thirukkural[0].salaman[0] + '</b>\n' +
        data.thirukkural[0].salaman[1] + '\n\n' +
        '<b>' + 'Explanation: ' + '</b>' + data.thirukkural[0].explanation + '\n\n' +
        '<b>' + '<a href="https://kuralservice.netlify.com/">மேலும் திருக்குறள் வாசிக்க...</a>' + '</b>' +
        '&parse_mode=HTML';
}