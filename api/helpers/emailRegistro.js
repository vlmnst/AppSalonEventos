import nodemailer from "nodemailer";

const emailRegistro = async ( datos ) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
    
      const { name, email, token } = datos;
      const info = await transport.sendMail({
        from: "IBIZA - Salón de eventos",
        to: email,
        subject: "Confirma tu cuenta",
        text: "Confirma tu cuenta",
        html: `<p> Hola ${name}, valida tu cuenta en Ibiza.</p>
            <p>Tu cuenta ya está lista, solo debes comprobar el siguiente enlace:
            <a href="${process.env.CLIENT_URL}/confirmacount/${token}">Comprobar cuenta </a></p>
            <p>Si tu no creaste esta cuenta, puedes ignorar este e-mail</p>
        `
      });

      console.log("Mensaje enviado: %s", info.messageId)
}

export default emailRegistro;