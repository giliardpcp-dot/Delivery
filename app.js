// Conectando ao seu PocketBase hospedado no Render
// SUBSTITUA 'https://seu-projeto.onrender.com' pela URL real do seu Render!
//const pb = new PocketBase('https://delivery-app-backend-oeyy.onrender.com');

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
        
        // Descobrindo qual é o perfil (role) do usuário cadastrado
        const role = authData.record.role;
        console.log("Perfil do usuário:", role);

        // Redirecionando com base no perfil do PocketBase
        if (role === 'admin') {
            alert("Login de Administrador bem-vindo!");
            // window.location.href = 'admin.html'; // Vamos criar essa tela em breve
        } else if (role === 'lojista') {
            alert("Login de Lojista bem-vindo!");
            // window.location.href = 'lojista.html'; // Vamos criar essa tela em breve
        } else {
            alert("Login de Cliente bem-vindo!");
            // window.location.href = 'cardapio.html'; // Vamos criar essa tela em breve
        }

    } catch (error) {
        console.error("Erro no login:", error);
        msgErro.textContent = "E-mail ou senha incorretos. Tente novamente.";
    }
});
