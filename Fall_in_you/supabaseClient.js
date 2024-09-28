// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lfiiyfntsxuukrwuyiih.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmaWl5Zm50c3h1dWtyd3V5aWloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc0NDI3NjQsImV4cCI6MjA0MzAxODc2NH0.qCccNoz9idzMM89MXPo_yI5xshaV3ea5jq33l-qrqLI';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;