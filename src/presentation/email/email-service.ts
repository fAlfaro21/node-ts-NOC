import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[];
}

interface Attachment {
    filename: string;
    path: string;
};

export class EmailService {

    //Este es el objeto que termina enviando el correo electrónico	
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        }
    });

    constructor(
        //private readonly logRepository: LogRepository,
    ){};

    //Hace el envío del correo
    async sendEmail( options: SendMailOptions ):Promise<boolean> {

        const { to, subject, htmlBody, attachments = [] } = options;

        try {
            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments,
            });

            //console.log(sentInformation);
            //Si todo va bien:
            return true;
        } catch (error) {
            //Si sale algo mal:
            return false;
        }
    };

    //Prepara el correo con la info de los attachments: to, subject, htmlBody, attachments
    //Puede ser que reciba 1 destinatario o varios en un array
    async sendEmailWithFileSystemLogs( to: string | string[] ){
        const subject = 'Logs del servidor';
        const htmlBody = `<h3>Logs de sistema - NOC</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adip
        <p>Ver logs adjuntos</p>`;

        const attachments: Attachment[] = [
            { filename: 'logs-all.log', path: './logs/logs-all.log' },
            { filename: 'logs-high.log', path: './logs/logs-high.log' },
            { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
        ];

        return this.sendEmail({
            to, subject, htmlBody, attachments
        });
    };


}