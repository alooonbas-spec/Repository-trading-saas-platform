import { redis } from "@/lib/redis";

export default async function TestPage() {
  await redis.set("test-key", "hello redis");
  const value = await redis.get("test-key");

  return (
    <div style={{ padding: 20 }}>
      <h1>Redis Test</h1>
      <p>Value: {value}</p>
    </div>
  );
} 