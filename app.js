// Conectando ao PocketBase
const pb = new PocketBase('https://delivery-app-backend-oeyy.onrender.com');

// --- SISTEMA ANTI-SONO (PING) ---
// Isso envia um sinal para o Render a cada 5 minutos para ele não dormir
setInterval(async () => {
    try {
        await pb.health.check();
        console.log("Ping enviado: servidor acordado!");
    } catch (e) {
        console.log("Erro no ping:", e);
    }
}, 300000); // 300000 milissegundos = 5 minutos
// ---------------------------------

const loginForm = document.getElementById('login-form');
const msgErro = document.getElementById('msg-erro');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        // Fazendo o login na tabela 'users' do PocketBase
        const authData = await pb.collection('users').authWithPassword(email, senha);
        
        const role = authData.record.role;
        console.log("O cargo (role) deste usuário é:", role);

        if (role === 'admin') {
            alert("Sucesso! Entrou como Administrador.");
        } else if (role === 'lojista') {
            alert("Sucesso! Entrou como Lojista.");
        } else {
            alert("Sucesso! Entrou como Cliente.");
        }

    } catch (error) {
        console.error("DEU ERRO NO LOGIN:", error);
        msgErro.textContent = "E-mail ou senha incorretos. Tente novamente.";
    }
});
