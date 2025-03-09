// Supabase-asetukset
const SUPABASE_URL = 'YOUR_SUPABASE_TEST_URL'; // Aseta oikea URL ympäristömuuttujiin tuotannossa
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_TEST_ANON_KEY'; // Aseta oikea avain ympäristömuuttujiin tuotannossa

// Luodaan Supabase-asiakas
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Testitiedot
const testData = {
    name: 'Testi Käyttäjä',
    email: 'testi@example.com',
    subject: 'Testaus',
    message: 'Tämä on testiviestin sisältö. Testataan yhteydenottolomakkeen toimivuutta Supabasen kanssa.'
};

// Funktio, joka testaa lomakkeen toimivuuden
async function testContactForm() {
    console.log('Aloitetaan yhteydenottolomakkeen testaus...');
    console.log('Testitiedot:', testData);
    
    try {
        // Lähetetään testitiedot Supabaseen
        console.log('Lähetetään tiedot Supabaseen...');
        const { data, error } = await supabaseClient
            .from('contact_messages')
            .insert([testData]);
        
        if (error) {
            console.error('Virhe tietojen lähetyksessä:', error);
            return false;
        }
        
        console.log('Tiedot lähetetty onnistuneesti!');
        console.log('Vastaus:', data);
        
        // Haetaan juuri lähetetty viesti tietokannasta
        console.log('Haetaan viimeisin viesti tietokannasta...');
        const { data: messages, error: fetchError } = await supabaseClient
            .from('contact_messages')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(1);
        
        if (fetchError) {
            console.error('Virhe tietojen haussa:', fetchError);
            return false;
        }
        
        console.log('Viimeisin viesti haettu onnistuneesti!');
        console.log('Viesti:', messages[0]);
        
        return true;
    } catch (error) {
        console.error('Odottamaton virhe:', error);
        return false;
    }
}

// Suoritetaan testi, kun sivu on ladattu
document.addEventListener('DOMContentLoaded', async function() {
    console.log('Sivu ladattu, aloitetaan testaus...');
    
    const testResult = await testContactForm();
    
    if (testResult) {
        console.log('TESTI ONNISTUI: Yhteydenottolomake toimii oikein Supabasen kanssa!');
        alert('Testi onnistui! Yhteydenottolomake toimii oikein Supabasen kanssa.');
    } else {
        console.log('TESTI EPÄONNISTUI: Yhteydenottolomake ei toimi oikein.');
        alert('Testi epäonnistui. Katso konsolista lisätietoja.');
    }
}); 