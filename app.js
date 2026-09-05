// Conectando ao seu PocketBase hospedado no Render com o link correto
const pb = new PocketBase('https://delivery-app-backend-oeyy.onrender.com');

const loginForm = document.getElementById('login-form');
const msgErro = document.getElementById('msg-erro');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log("Botão de entrar foi clicado!");
    
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        console.log("Tentando conectar com o PocketBase...");
        
        // Fazendo o login na tabela 'users' do PocketBase
        const authData = await pb.collection('users').authWithPassword(email, senha);
        
        console.log("Login autorizado com sucesso!", authData);
        
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
        msgErro.textContent = "Erro ao entrar. Verifique o e-mail, senha ou conexão.";
    }
});
