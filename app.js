// Conectando ao seu PocketBase hospedado no Render
// SUBSTITUA 'https://seu-projeto.onrender.com' pela URL real do seu Render!
const pb = new PocketBase('https://delivery-app-backend-oeyy.onrender.com');

const loginForm = document.getElementById('login-form');
const msgErro = document.getElementById('msg-erro');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        // Fazendo o login na tabela 'users' do PocketBase
        const authData = await pb.collection('users').authWithPassword(email, senha);
        
        alert(`Login realizado com sucesso! Bem-vindo, ${authData.record.email}`);
        
        // Aqui é onde vamos redirecionar o usuário baseado no 'role' dele (admin, lojista ou cliente)
        const role = authData.record.role;
        console.log("Perfil do usuário:", role);

        if (role === 'admin') {
            // Redirecionar para painel do Admin
        } else if (role === 'lojista') {
            // Redirecionar para painel do Lojista
        } else {
            // Redirecionar para tela do Cliente (cardápio)
        }

    } catch (error) {
        console.error("Erro no login:", error);
        msgErro.textContent = "E-mail ou senha incorretos. Tente novamente.";
    }
});
