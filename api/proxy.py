from fastapi import FastAPI, Response
import httpx

app = FastAPI()

@app.get("/")
async def proxy():
    async with httpx.AsyncClient() as client:
        resp = await client.get("https://studyuk.fun/goal/")
        html = resp.text

    # Replace Telegram links
    html = html.replace(
        "https://t.me/",
        "https://t.me/+rc5Psv_S2VJkMGM1"
    )

    return Response(content=html, media_type="text/html")
