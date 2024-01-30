"use server"
import redis from "@/lib/redis";

export async function fetchToken() {
  const get = await redis.call("JSON.GET", "token");
  return JSON.parse(get);
}
  export async function setDemoToken(value,ttl) {
    const set = await redis.call("JSON.SET", "token" ,"." , JSON.stringify(value));
    await redis.expire("token",ttl)
   
   
    return set;
  }

