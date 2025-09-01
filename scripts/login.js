
        const users = {
            'prof123': { password: 'senha123', type: 'professor', name: 'Prof. Maria Santos' },
            'aluno123': { password: 'senha123', type: 'aluno', name: 'João Silva' }
        };

        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            performLogin();
        });

        function performLogin() {
            const usuario = document.getElementById('usuario').value.trim();
            const senha = document.getElementById('senha').value;
            const messageDiv = document.getElementById('message');
            const loadingDiv = document.getElementById('loading');
            const loginBtn = document.getElementById('loginBtn');

            messageDiv.style.display = 'none';
            messageDiv.className = 'message';

        
            if (!usuario || !senha) {
                showMessage('Por favor, preencha todos os campos.', 'error');
                return;
            }

            
            loadingDiv.style.display = 'block';
            loginBtn.disabled = true;
            loginBtn.textContent = 'Validando...';

        
            setTimeout(() => {
               
                loadingDiv.style.display = 'none';
                loginBtn.disabled = false;
                loginBtn.textContent = 'Entrar';

               
                if (users[usuario] && users[usuario].password === senha) {
                    const userType = users[usuario].type;
                    const userName = users[usuario].name;
                    
                    showMessage(`Login realizado com sucesso! Redirecionando...`, 'success');
                    
                  
                    const userData = {
                        username: usuario,
                        name: userName,
                        type: userType,
                        loginTime: new Date().toISOString()
                    };
                    
                 
                    setTimeout(() => {
                        if (userType === 'professor') {
                            
                            redirectToPage('professor', userData);
                            window.location.href = 'index3.html';
                        } else if (userType === 'aluno') {
                           
                            redirectToPage('aluno', userData);
                            window.location.href = 'index2.html';
                        }
                    }, 1500);
                } else {
                    showMessage('Usuário ou senha incorretos. Verifique suas credenciais e tente novamente.', 'error');
                }
            }, 1000);
        }

        function showMessage(text, type) {
            const messageDiv = document.getElementById('message');
            messageDiv.textContent = text;
            messageDiv.className = `message ${type}-message`;
            messageDiv.style.display = 'block';
        }

        function redirectToPage(pageType, userData) {
           
            const redirectUrl = pageType === 'professor' ? 'index3.htmll' : 'index2.html';
            
            showMessage(`Redirecionando para a área do ${pageType}...`, 'success');
            
       
        }

        function showForgotPassword() {
            alert('Funcionalidade "Esqueci minha senha"\n\nEm um sistema real, seria enviado um email com instruções para redefinir a senha.');
        }

       
        document.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performLogin();
            }
        });

     
        document.addEventListener('click', function(e) {
            if (e.target.closest('.demo-credentials')) {
                const text = e.target.textContent;
                if (text.includes('Professor:')) {
                    document.getElementById('usuario').value = 'prof123';
                    document.getElementById('senha').value = 'senha123';
                } else if (text.includes('Aluno:')) {
                    document.getElementById('usuario').value = 'aluno123';
                    document.getElementById('senha').value = 'senha123';
                }
            }
        });