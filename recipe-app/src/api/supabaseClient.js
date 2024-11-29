import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://baxculecbpachtjhhvhf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJheGN1bGVjYnBhY2h0amhodmhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI2MTI0NjcsImV4cCI6MjA0ODE4ODQ2N30.j7uvhdQ0TUG9t1xI8kf-hWy7nz-qNvmxkFRseloWW6A'
export const supabase = createClient(supabaseUrl, supabaseKey)

