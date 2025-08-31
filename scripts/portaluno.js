  function showTab(tabName) {
            
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            
            document.querySelectorAll('.student-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            
            
            document.getElementById(tabName + '-tab').classList.add('active');
            
            
            event.target.classList.add('active');
        }

        function downloadContent(fileName) {
            
            const downloadMessage = `Iniciando download: ${fileName}`;
            showNotification(downloadMessage, 'info');
            
            
            setTimeout(() => {
                showNotification(`Download de ${fileName} concluído!`, 'success');
            }, 2000);
        }

        function watchVideo(videoId) {
            
            showNotification('Abrindo player de vídeo...', 'info');
            
            setTimeout(() => {
                alert(`PLAYER DE VÍDEO\n\nAbrindo: Sistema Solar - Documentário Educativo\nDuração: 45 minutos\n\nEm um sistema real, o vídeo seria reproduzido em um player integrado.`);
            }, 1000);
        }

        function logout() {
            if (confirm('Tem certeza que deseja sair do sistema?')) {
                showNotification('Fazendo logout...', 'info');
                setTimeout(() => {
                    alert('Logout realizado. Redirecionando para a tela de login...');
                  
                    window.location.href = 'login.html';
                }, 1500);
            }
        }

        function showNotification(message, type) {
           
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 8px;
                color: white;
                font-weight: 500;
                z-index: 1000;
                transform: translateX(400px);
                transition: transform 0.3s ease;
            `;
            
            
            switch(type) {
                case 'success':
                    notification.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
                    break;
                case 'info':
                    notification.style.background = 'linear-gradient(135deg, #17a2b8, #007bff)';
                    break;
                case 'warning':
                    notification.style.background = 'linear-gradient(135deg, #ffc107, #fd7e14)';
                    break;
                default:
                    notification.style.background = 'linear-gradient(135deg, #6c757d, #495057)';
            }
            
            notification.textContent = message;
            document.body.appendChild(notification);
            
            
            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
            }, 100);
            
            
            setTimeout(() => {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 3000);
        }

        
        document.addEventListener('DOMContentLoaded', function() {
            
            const userType = 'aluno';
            
            if (userType !== 'aluno') {
                alert('Acesso negado. Redirecionando...');
                window.location.href = 'login.html';
                return;
            }

            
            checkUrgentDeadlines();
        });

        function checkUrgentDeadlines() {
            const now = new Date();
            const urgentDate = new Date('2025-09-02T23:59:00');
            
            if (urgentDate - now < 3 * 24 * 60 * 60 * 1000) { 
                const urgentDeadlines = document.querySelectorAll('.activity-deadline.urgent');
                urgentDeadlines.forEach(deadline => {
                    deadline.style.animation = 'pulse 2s infinite';
                });
            }
        }

        
        setInterval(() => {
            checkUrgentDeadlines();
        }, 60000); 