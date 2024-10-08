import nodemailer from "nodemailer";
import HandleBarsMailTemplate from "./HandleBarsMailTemplate";

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariable;
}

interface IMailContract {
  name: string;
  email: string;
}

interface ISendMail {
  to: IMailContract;
  from?: IMailContract;
  subject: string;
  templateData: IParseMailTemplate;
}

export default class EtherealMail {
  static async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMail): Promise<void> {
    const account = await nodemailer.createTestAccount();
    const mailTemplate = new HandleBarsMailTemplate();

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    const message = await transporter.sendMail({
      from: {
        name: from?.name || "Equipe Api Vendas",
        address: from?.email || "equipe@apivendas.com.br",
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await mailTemplate.parse(templateData),
    });

    console.log("Messsage sent: %s", message.messageId);
    console.log("Preview URL %s", nodemailer.getTestMessageUrl(message));
  }
}
