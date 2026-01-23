-- Re-enable Row Level Security on leads table
-- This ensures the existing policies are enforced
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;