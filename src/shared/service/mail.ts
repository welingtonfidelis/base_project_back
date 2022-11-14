import AWS from "aws-sdk";

import { config } from "../../config";

const { AWS_REGION } = config;

AWS.config = new AWS.Config();
AWS.config.region = AWS_REGION;

const ses = new AWS.SES();

interface SendOneMailProps {
  to: string[];
  from: string;
  subject: string;
  message: string;
}

const sendMail = (data: SendOneMailProps) => {
  const { from, to, subject, message } = data;
  const params = {
    Destination: {
      ToAddresses: to,
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: message,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: from,
  };

  return ses.sendEmail(params).promise();
};

export { sendMail };
