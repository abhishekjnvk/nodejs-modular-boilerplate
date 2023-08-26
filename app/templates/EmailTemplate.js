class EmailTemplate{
  constructor(opts) {
    this.logger = opts.logger;
    this.config = opts.config
    this.utils = opts.utils
    this.emailProvider = opts.emailProvider
  }

  async emailVerificationMail(userName, to) {
    const data={ email: to }
    const verificationToken= await this.utils.signToken(data, 3600*24*1000);
    const verificationLink= `${this.config.FRONTEND_URL}/email-verification?token=${verificationToken}`
    const currentYear = new Date().getFullYear();
    const htmlContent=`<!DOCTYPE html><html>
        <head><title>Email Verification ${this.config.APP_NAME}</title></head>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse;">
                <tr>
                    <td bgcolor="#ffffff" style="padding: 40px 30px;">
                    <h2 style="margin-top: 0; color: #333333;">Email Verification</h2>
                    <p style="color: #777777;">Hello ${userName},</p>
                    <p style="color: #777777;">Thank you for signing up on our website. To complete your registration, please click the button below to verify your email address:</p>
                    <p align="center" style="margin: 30px 0;">
                        <a href="${verificationLink}" target="_blank" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px;">Verify Email</a>
                    </p>
                    <p style="margin: 30px 0; color: #007bff;">
                    <center> <a href="${verificationLink}" target="_blank" style="text-decoration: underline; color: #007bff;">${verificationLink}</a></center>
                    </p>
                    <p style="color: #777777;">If you did not sign up for an account on our website, please ignore this email.</p>
                    <p style="color: #777777;">Best regards,</p>
                    <p style="color: #777777;">${this.config.APP_NAME} Team</p>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#333333" style="padding: 20px 30px;">
                    <p style="color: #ffffff; margin: 0;">© ${currentYear} ${this.config.APP_NAME}. All rights reserved.</p>
                    </td>
                </tr>
            </table>
        </body>
    </html>`;

    const textContent= `Hello ${userName},
    Thank you for signing up on our website. To complete your registration, please click the link below to verify your email address:
    ${verificationLink}
    
    If you did not sign up for an account on our website, please ignore this email.
    Best regards,
    ${this.config.APP_NAME} Team
    © ${currentYear} ${this.config.APP_NAME}. All rights reserved.`;
    const subject =`Email Verification | ${this.config.APP_NAME}`
    const result = await this.emailProvider.sendHtmlEmail(to, subject, htmlContent, textContent)
    this.logger.info(" Verification Email sent successfully");

    return result
  }
}


module.exports = EmailTemplate;

