export const sendVerifyEmail = ({ name, url }) => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify Your Account</title>
  </head>
  <body style="font-family: Arial, Helvetica, sans-serif;">
    <div style="background-color: #f8f8f8; display: flex; align-items: center; flex-direction: column; justify-content: center; width: 100%; min-height: 100svh; padding: 2rem;">
      <main style="padding: 1rem; background-color: #fff; box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.1); border-radius: 5px;">
          <header>
            <a href="/" style="text-decoration: none; display: flex; align-items: center; font-size: 2.3rem; font-weight: 700; color: #111; padding: 0.5rem 1rem;">
                  <img src="https://res.cloudinary.com/dcmjlzugw/image/upload/v1756260325/logo_wkjszi.png" alt="Stacker Logo" style="width: 4rem;">
                  <span>Stacker</span>
            </a>
          </header>
            <div style="margin: 0 auto; padding: 0.5rem 1rem;">
                <h1 style="font-size: 2rem; font-weight: 500;">Verify Your Account</h1>
                <p style="font-size: 1.2rem; margin-top: 1rem;">Hello ${name},</p>
                <p style="font-size: .9rem; margin-top: .9rem;">Welcome to Stacker. To verify your account and to keep your account secure, please click the button below:</p>
                <a href="${url}" style="display:inline-block; font-size :.9rem; margin: .5rem 0; background-color: #611f69; color: #fff; text-decoration: none; padding: .8rem 1.5rem; font-weight: 600;">Verify Account</a>
                <p style="font-size: .9rem; margin-top: .9rem;">If the button is not working, try opening the link directly: <a href="${url}" style="color: #611f69;">${url}</a></p>
                <p style="font-size: .8rem; margin-top: 1rem;">If you did not request this verification, please ignore this email.</p>
                <p style="font-size: .8rem;">Best regards,</p>
                <p style="font-size: .9rem; font-weight: 600;">The Stacker Team</p>
            </div>
        </main>
    </div>
  </body>
</html>`;
};
