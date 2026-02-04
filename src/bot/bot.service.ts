import { Injectable } from '@nestjs/common';
import { ChequeService } from '../cheque/cheque.service';
import Twilio from 'twilio';

@Injectable()
export class BotService {
//   private client: Twilio.Twilio;

//   constructor(private readonly chequeService: ChequeService) {
//     this.client = Twilio(
//       process.env.TWILIO_ACCOUNT_SID!,
//       process.env.TWILIO_AUTH_TOKEN!,
//     );
//   }

//   // 🔹 send to MANY numbers
//   async notifyLastCheque(phones: string[]): Promise<void> {
//     const cheque = await this.chequeService.getUnpaidCheques();

//     const message = this.buildMessage(cheque);

//     // send to all recipients
//     await Promise.all(
//       phones.map((phone) => this.sendWhatsAppMessage(phone, message)),
//     );
//   }

//   private async sendWhatsAppMessage(
//     to: string,
//     message: string,
//   ): Promise<void> {
//     await this.client.messages.create({
//       from: process.env.TWILIO_WHATSAPP_FROM, // whatsapp:+14155238886
//       to: `whatsapp:${to}`, // whatsapp:+989xxxxxxx
//       body: message,
//     });
//   }

//   private buildMessage(cheque: any): string {
//     return `📄 *َUnpdaid Cheque*

// Customer: ${cheque.customer}
// Serial: ${cheque.serial}
// Amount: ${cheque.amount}
// Due: ${cheque.dueDate}`;
//   }
}
