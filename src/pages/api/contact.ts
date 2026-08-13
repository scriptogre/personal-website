import sendGrid from "@sendgrid/mail";

export const prerender = false;

// @ts-ignore
sendGrid.setApiKey(import.meta.env.SENDGRID_API_KEY);

export async function POST({ request }) {
  const { name, email, message } = await request.json();

  // Validate the data
  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({
        message: "Missing required fields",
      }),
      { status: 400 },
    );
  }

  const emailMessage = `
    Name: ${name}
    Email: ${email}
    Message: ${message}
  `;

  const msg = {
    to: "tanulchristian@gmail.com",
    from: `Tanul Christian Personal Site <contact@pyoneers.dev>`,
    replyTo: email,
    subject: `${name} contacted you from tanulchristian.dev `,
    text: emailMessage,
  };

  try {
    await sendGrid.send(msg);
    return new Response(
      JSON.stringify({
        message: "Success!",
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error("Email sending error:", error.response.body);
    return new Response(
      JSON.stringify({
        message: "Error sending email",
      }),
      { status: 500 },
    );
  }
}
