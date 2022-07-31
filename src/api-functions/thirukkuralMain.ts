import bodyParser = require("body-parser");
import express = require("express");
import serverless = require("serverless-http");
import cors = require("cors");
import { GraphQLService } from "src/services/graphql.service";
var SibApiV3Sdk = require("sib-api-v3-sdk");
import { emailTemplate } from "src/email-contents/default";
import { SecretManagement } from "src/services/secretmanagement.service";
import { CredentialsService } from "src/services/credentialService";

const app: express.Express = express();
app.use(bodyParser.json({ strict: false }));
app.use(cors());

app.get("/kural", async (req, res) => {
  const secretManagement = new SecretManagement();
  const secretValue = await secretManagement.getSecret();
  if(!secretValue) {
    console.log("Failed to get Secrets from Secret manager", secretValue);
    res.status(500).json({message:'Internal Server Error.'})
    return
  }
  CredentialsService.setSecretValue(secretValue.xHasuraAdminSecret,secretValue.sibApiKey);
  const number = Number(req.query.id);
  if (
    !number ||
    isNaN(number) ||
    typeof number !== "number" ||
    number > 1330 ||
    number < 1
  ) {
    res.status(400).send({ message: "Pass values between 1 and 1300" });
    return;
  }
  const graphqlService: GraphQLService = new GraphQLService();
  const result = await graphqlService.getKural(number);
  res.status(200).send({ message: result });
  return;
});

app.post("/kural", async (req, res) => {
  
    const secretManagement : SecretManagement = new SecretManagement();
    const graphqlService: GraphQLService = new GraphQLService();

    const secretValue = await secretManagement.getSecret();

    if(!secretValue) {
      console.log("Failed to get Secrets from Secret manager", secretValue);
      res.status(500).json({message:'Internal Server Error.'})
      return
    }
    CredentialsService.setSecretValue(secretValue.xHasuraAdminSecret,secretValue.sibApiKey);
    let getKuralForEmailResult;
    // do {

      let number = Number(req.body.number);
      if (
        !number ||
        isNaN(number) ||
        typeof number !== "number" ||
        number > 1330 ||
        number < 1
      ) {
        console.log("No number sent in Request Body: ", number);
        number = randomNumber();
      }
      getKuralForEmailResult = await graphqlService.getKuralForEmail(number);
    // } while (
    //   getKuralForEmailResult &&
    //   getKuralForEmailResult.thirukkural.length < 1
    // );

    if(!getKuralForEmailResult || getKuralForEmailResult.thirukkural.length < 1) {
      console.log("Failed to get Thirukkural from DB", getKuralForEmailResult);
      res.status(500).json({message:'Internal Server Error.'})
      return
    }
    console.log(getKuralForEmailResult);

    SibApiV3Sdk.ApiClient.instance.authentications["api-key"].apiKey = secretValue.sibApiKey;

    const getEmailContactsResult = await graphqlService.getEmailContacts();
    if(!getEmailContactsResult || !getEmailContactsResult.user) {
      console.log("Failed to get email contacts: ", getEmailContactsResult)
      res.status(500).json({message:"Internal Server Error."})
    }

    await new SibApiV3Sdk.TransactionalEmailsApi()
      .sendTransacEmail({
        sender: { email: "sendinblue@sendinblue.com", name: "திருக்குறள் செயலி" },
        subject: "இன்றைய இனிய குறள்",
        params: {
          line1: getKuralForEmailResult.thirukkural[0].kural[0],
          line2: getKuralForEmailResult.thirukkural[0].kural[1],
          number: getKuralForEmailResult.thirukkural[0].number,
          pal: getKuralForEmailResult.thirukkural[0].pal,
          iyal: getKuralForEmailResult.thirukkural[0].iyal,
          adikaram: getKuralForEmailResult.thirukkural[0].adikaram,
          mu_varatha_key: getKuralForEmailResult.thirukkural[0].mu_varatha[0],
          mu_varatha_value: getKuralForEmailResult.thirukkural[0].mu_varatha[1],
          mu_karu_key: getKuralForEmailResult.thirukkural[0].mu_karu[0],
          mu_karu_value: getKuralForEmailResult.thirukkural[0].mu_karu[1],
          salaman_key: getKuralForEmailResult.thirukkural[0].salaman[0],
          salaman_value: getKuralForEmailResult.thirukkural[0].salaman[1],
          explanation: getKuralForEmailResult.thirukkural[0].explanation,
        },
        htmlContent: emailTemplate,
        to: [
          {
            email: "krssabapathy1999@gmail.com",
            name: "Sankara Sabapathy",
          },
        ],
        bcc: getEmailContactsResult.user,
      })
      .then(
        (data) => {
          console.log(data);
        },
        (err) => {
          console.log(err);
        }
      );
    res.status(200).send({ message: "Successfully sent email." });
});

function randomNumber() {
  return Math.floor(Math.random() * (1080 - 1 + 1)) + 1;
}

module.exports.handler = serverless(app, {
  request: (request: any, event: any, context: any) => {
    (request.apiGateway = event), (request.awscontext = context);
  },
});
