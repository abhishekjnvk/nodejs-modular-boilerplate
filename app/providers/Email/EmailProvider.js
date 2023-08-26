class EmailProvider{
  constructor(opts) {
    this.logger = opts.logger;
    this.transporter = opts.nodemailer.createTransport({
      host   : opts.config.mail.host,
      port   : opts.config.mail.port,
      secure : opts.config.mail.ssl,
      auth   : {
        user : opts.config.mail.username,
        pass : opts.config.mail.password
      },
    });
  }

  sendEmail(to, subject, text) {
    const mailOptions = {
      from : this.transporter.options.auth.user,
      to,
      subject,
      text
    };

    return new Promise((resolve, reject) => {
      this.transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          this.logger.error(`Mail Error ${error.message}`);
          reject(error);
        } else {
          this.logger.info(`Mail Sent ${info.response}`);
          resolve(info.response);
        }
      });
    });
  }

  sendHtmlEmail(to, subject, htmlContent, textContent) {
    const mailOptions = {
      from : this.transporter.options.auth.user,
      to,
      subject,
      html : htmlContent,
      text : textContent
    };

    return new Promise((resolve, reject) => {
      this.transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          this.logger.error(`Mail Error ${error.message}`);
          reject(error);
        } else {
          this.logger.info(`Mail Sent ${info.response}`);
          resolve(info.response);
        }
      });
    });
  }
}


module.exports = EmailProvider;
