export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParam = url.searchParams.get("test");
  console.log(searchParam);
  return Response.json({ body: "Hello world" }, { status: 200 });
}
