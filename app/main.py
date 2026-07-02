from fastapi import FastAPI
from app.routers import datasets, traffic
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
app.include_router(datasets.router, prefix="/api", tags=["datasets"])

@app.get("/")
async def root():
    return {"message": "Data Observatory API 👋"}
