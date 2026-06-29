-- SQL Schema Setup for Gentlemen's Room Bookings
-- Copy and run this script in your Supabase project's SQL Editor:

CREATE TABLE IF NOT EXISTS bookings (
  id TEXT PRIMARY KEY,
  reference_id TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  notes TEXT,
  department TEXT NOT NULL,
  service TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Pending', 'Confirmed', 'Cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create Policies to grant anon access matching your publishable key settings
CREATE POLICY "Allow public booking creation" ON bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow administrative dashboard checks" ON bookings
  FOR ALL USING (true);
