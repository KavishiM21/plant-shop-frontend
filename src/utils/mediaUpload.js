import { createClient } from "@supabase/supabase-js";

const url = "https://bonafdsphvgwgyhyflne.supabase.co";
const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvbmFmZHNwaHZnd2d5aHlmbG5lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0NDg0MzMsImV4cCI6MjA3OTAyNDQzM30.IttzaAkjI1n1-OcFA3q4-fWnuWwl9MkK4PtjhmZesNM";
const supabase = createClient(url, key);

export default function uploadFile(file) {
  return new Promise((resolve, reject) => {
    const timeStamp = Date.now();
    const fileName = timeStamp + "_" + file.name;
    supabase.storage
      .from("images")
      .upload(fileName, file, { cacheControl: "3600", upsert: false })
      .then(() => {
        const publicUrl = supabase.storage
          .from("images")
          .getPublicUrl(file.name).data.publicUrl;
        resolve(publicUrl);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
