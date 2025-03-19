/*
  # Add News Table for Daily Updates

  1. New Tables
    - news
      - id (uuid, primary key)
      - title (text)
      - content (text)
      - image_url (text, optional)
      - published_at (timestamp)
      - created_at (timestamp)

  2. Security
    - Enable RLS
    - Add policies for reading news
*/

CREATE TABLE IF NOT EXISTS news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  image_url text,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE news ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read news"
  ON news
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only authenticated users can insert news"
  ON news
  FOR INSERT
  TO authenticated
  WITH CHECK (true);