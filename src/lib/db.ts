import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

export interface Booking {
  id: string;
  reference_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  notes: string;
  department: string;
  service: string;
  date: string;
  time: string;
  status: "Pending" | "Confirmed" | "Cancelled";
  created_at: string;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const isSupabaseConfigured = !!(supabaseUrl && supabaseKey && !supabaseUrl.includes("your-supabase-url"));

const supabase = isSupabaseConfigured ? createClient(supabaseUrl, supabaseKey) : null;

// Local JSON File Storage Fallback Path
const LOCAL_DB_DIR = path.join(process.cwd(), "data");
const LOCAL_DB_PATH = path.join(LOCAL_DB_DIR, "bookings.json");

// Helper to generate a valid RFC4122 v4 UUID in pure JS
function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Helper to ensure local database file exists
function ensureLocalDb() {
  if (!fs.existsSync(LOCAL_DB_DIR)) {
    fs.mkdirSync(LOCAL_DB_DIR, { recursive: true });
  }
  if (!fs.existsSync(LOCAL_DB_PATH)) {
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify([], null, 2), "utf-8");
  }
}

// Read bookings from local file
function getLocalBookings(): Booking[] {
  ensureLocalDb();
  try {
    const data = fs.readFileSync(LOCAL_DB_PATH, "utf-8");
    return JSON.parse(data) as Booking[];
  } catch (err) {
    console.error("Error reading local db file, returning empty array:", err);
    return [];
  }
}

// Write bookings to local file
function saveLocalBookings(bookings: Booking[]) {
  ensureLocalDb();
  fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(bookings, null, 2), "utf-8");
}

export async function getBookings(): Promise<Booking[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (!error && data) {
        return data as Booking[];
      }
      
      console.warn("Supabase bookings fetch failed (might missing table), falling back to local file:", error);
    } catch (err) {
      console.warn("Supabase bookings error (falling back to local file):", err);
    }
  }

  // Fallback to local storage
  return getLocalBookings().sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export async function addBooking(booking: Omit<Booking, "id" | "status" | "created_at">): Promise<Booking> {
  const newBooking: Booking = {
    ...booking,
    id: generateUUID(),
    status: "Pending",
    created_at: new Date().toISOString(),
  };

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .insert([newBooking])
        .select()
        .single();

      if (!error && data) {
        return data as Booking;
      }
      console.warn("Supabase bookings insert failed (falling back to local file):", error);
    } catch (err) {
      console.warn("Supabase bookings insert error (falling back to local file):", err);
    }
  }

  // Fallback to local storage
  const bookings = getLocalBookings();
  bookings.push(newBooking);
  saveLocalBookings(bookings);
  return newBooking;
}

export async function updateBookingStatus(id: string, status: "Pending" | "Confirmed" | "Cancelled"): Promise<boolean> {
  if (supabase) {
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status })
        .eq("id", id);

      if (!error) {
        return true;
      }
      console.warn("Supabase status update failed (falling back to local file):", error);
    } catch (err) {
      console.warn("Supabase status update error (falling back to local):", err);
    }
  }

  // Fallback to local storage
  const bookings = getLocalBookings();
  const index = bookings.findIndex((b) => b.id === id);
  if (index !== -1) {
    bookings[index].status = status;
    saveLocalBookings(bookings);
    return true;
  }
  return false;
}

export async function deleteBooking(id: string): Promise<boolean> {
  if (supabase) {
    try {
      const { error } = await supabase
        .from("bookings")
        .delete()
        .eq("id", id);

      if (!error) {
        return true;
      }
      console.warn("Supabase deletion failed (falling back to local):", error);
    } catch (err) {
      console.warn("Supabase deletion error (falling back to local):", err);
    }
  }

  // Fallback to local storage
  const bookings = getLocalBookings();
  const filtered = bookings.filter((b) => b.id !== id);
  if (bookings.length !== filtered.length) {
    saveLocalBookings(filtered);
    return true;
  }
  return false;
}
