/*
  # Initial Schema Setup for Marketplace Application

  1. New Tables
    - business_owners
      - id (uuid, primary key)
      - user_id (uuid, references auth.users)
      - business_name (text)
      - email (text)
      - created_at (timestamp)
    
    - listings
      - id (uuid, primary key)
      - business_id (uuid, references business_owners)
      - title (text)
      - description (text)
      - price (numeric)
      - image_url (text)
      - created_at (timestamp)
      - updated_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for business owners and users
*/

-- Create business_owners table
CREATE TABLE IF NOT EXISTS business_owners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  business_name text NOT NULL,
  email text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create listings table
CREATE TABLE IF NOT EXISTS listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid REFERENCES business_owners NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE business_owners ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

-- Policies for business_owners
CREATE POLICY "Business owners can read own data"
  ON business_owners
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Business owners can insert own data"
  ON business_owners
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policies for listings
CREATE POLICY "Anyone can read listings"
  ON listings
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Business owners can insert own listings"
  ON listings
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM business_owners
      WHERE user_id = auth.uid()
      AND id = business_id
    )
  );

CREATE POLICY "Business owners can update own listings"
  ON listings
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM business_owners
      WHERE user_id = auth.uid()
      AND id = business_id
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM business_owners
      WHERE user_id = auth.uid()
      AND id = business_id
    )
  );

CREATE POLICY "Business owners can delete own listings"
  ON listings
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM business_owners
      WHERE user_id = auth.uid()
      AND id = business_id
    )
  );