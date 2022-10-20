import nodemailer from "nodemailer";

const emailOlvidePassword = async ( datos ) => {
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
        subject: "Reestablece tu password",
        text: "Reestablece tu password",
        html: `<p> Hola ${name}, has solicitado reestableccer tu password.</p>
            <p>Has click en el siguiente enlace para generar un nuevo password:
            <a href="${process.env.CLIENT_URL}/forgetpassword/${token}">Recuperar clave</a></p>
            <p>Si tu no solicitaste el cambio, puedes ignorar este e-mail</p>
        `
      });

      console.log("Mensaje enviado: %s", info.messageId)
}

export default emailOlvidePassword;