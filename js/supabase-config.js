// Supabase-konfiguraatio testisivua varten - Sun Mar  9 22:52:56 UTC 2025
console.log('Supabase-konfiguraatio ladattu erillisestä tiedostosta');
window.SUPABASE_CONFIG = {
  SUPABASE_URL: 'https://ograsjqhyblnfqqflwvo.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ncmFzanFoeWJsbmZxcWZsd3ZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExMjEwNjMsImV4cCI6MjA1NjY5NzA2M30.snp4uBr2GNOj_LYi7B1-jGPlogEydnLnkcsiqRRKss4'
};
// Asetetaan myös window.CONFIG ja window.INLINE_CONFIG varmuuden vuoksi
window.CONFIG = window.CONFIG || window.SUPABASE_CONFIG;
window.INLINE_CONFIG = window.INLINE_CONFIG || window.SUPABASE_CONFIG;
