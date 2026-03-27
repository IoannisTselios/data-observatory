from fastapi import FastAPI
from app.routers import traffic
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("🚀 FastAPI starting...")
    yield
    # Shutdown
    print("🔌 FastAPI shutting down...")

app = FastAPI(
    title="Data Observatory API",
    description="Copenhagen traffic analytics",
    version="1.0.0",
    lifespan=lifespan
)

app.include_router(traffic.router, prefix="/api", tags=["traffic"])

@app.get("/")
async def root():
    return {"message": "Data Observatory API 👋"}