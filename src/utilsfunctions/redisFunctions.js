"use server";

import redis from "@/lib/redis";

export async function Handler(key, value) {
  const data = await redis.set(key, JSON.stringify(value));
  return data;
}

export const fetchDataFromRedis = async (key) => {
  const data = await redis.get(key);
  return data;
};
