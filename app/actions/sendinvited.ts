// import { Workspace } from "@/model/Workspace";
// import { Resend } from "resend";

// export async function sendInvite({
//   senderEmail,
//   receviersEmail,
//   invitedWorkspace,
// }: {
//   senderEmail: string;
//   receviersEmail: string;
//   invitedWorkspace: string;
// }) {
//   const resend_api_key = process.env.RESEND_API_KEY;
//   //   const resend = new Resend("re_P9QFFjDK_8amB7Vt5rbCcJRPJ8mimgfdb");

//   const resend = new Resend("re_DVCy2HRw_d1FCM5uZhhSG5NfhqvBfDfe5");

//   resend.emails.send({
//     from: "onboarding@resend.dev",
//     to: "dheerajr.2536@gmail.com",
//     subject: "Hello World",
//     html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
//   });
//   //   const { data, error } = await resend.emails.send({
//   //     from: senderEmail,
//   //     to: receviersEmail,
//   //     //   replyTo: 'you@example.com',
//   //     subject: `you have been invited to ${invitedWorkspace} please join`,
//   //     text: "it works!",
//   //   });
//   //   if (error) console.log(error);
//   //   if (data) {
//   //     console.log(data);
//   //   }
// }
