export async function GET() {
  //   const url = new URL(request.url);
  //   const searchParam = url.searchParams.get("test");
  //   console.log(searchParam);

  const time = new Date();
  console.log("Time: ", time);
  const expDate = new Date();
  expDate.setDate(expDate.getDate() + 30);
  console.log("expDate: ", expDate);
  return Response.json({ body: "Hello world" }, { status: 200 });
}
