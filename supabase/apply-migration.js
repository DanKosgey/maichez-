import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Load environment variables
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing environment variables. Please set VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

// Create Supabase client with service role key for admin access
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function applyMigration() {
  try {
    // Read the migration file
    const migrationPath = resolve('./migrations/20251120100000_admin_portal_tables.sql');
    const migrationSql = readFileSync(migrationPath, 'utf8');
    
    console.log('Applying migration...');
    
    // Split the migration into individual statements
    const statements = migrationSql
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);
    
    // Execute each statement
    for (const statement of statements) {
      if (statement.startsWith('--')) {
        // Skip comments
        continue;
      }
      
      console.log('Executing statement:', statement.substring(0, 50) + '...');
      
      const { error } = await supabase.rpc('execute_sql', { sql: statement });
      
      if (error) {
        console.error('Error executing statement:', error);
        process.exit(1);
      }
    }
    
    console.log('Migration applied successfully!');
  } catch (error) {
    console.error('Error applying migration:', error);
    process.exit(1);
  }
}

applyMigration();