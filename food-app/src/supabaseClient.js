import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase credentials
const SUPABASE_URL = 'https://your-supabase-url.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJheGN1bGVjYnBhY2h0amhodmhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI2MTI0NjcsImV4cCI6MjA0ODE4ODQ2N30.j7uvhdQ0TUG9t1xI8kf-hWy7nz-qNvmxkFRseloWW6A';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
