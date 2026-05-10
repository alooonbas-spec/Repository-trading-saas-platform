import { supabase } from "./supabase";

export function subscribeToSignals(callback: (payload: any) => void) {
  return supabase
    .channel("signals")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "signals",
      },
      (payload) => {
        callback(payload);
      }
    )
    .subscribe();
}