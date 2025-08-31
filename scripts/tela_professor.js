
        const studentsData = {
            '9a-matematica': [
                'Ana Silva', 'Bruno Santos', 'Carla Oliveira', 'Diego Ferreira', 'Elena Costa'
            ],
            '8b-matematica': [
                'Felipe Lima', 'Gabriela Rocha', 'Henrique Alves', 'Isabela Martins'
            ],
            '7c-matematica': [
                'João Pedro', 'Larissa Souza', 'Mateus Silva', 'Natália Santos'
            ]
        };

       
        document.getElementById('current-date').textContent = new Date().toLocaleDateString('pt-BR');

        function showContent(section) {
           
            document.querySelectorAll('.content-section').forEach(section => {
                section.classList.remove('active');
            });
            
            
            document.querySelectorAll('.menu-item').forEach(item => {
                item.classList.remove('active');
            });
            
           
            document.getElementById(section + '-section').classList.add('active');
            
            
            event.target.classList.add('active');
            
           
            document.getElementById('success-banner').style.display = 'none';
        }

        function loadStudents() {
            const turma = document.getElementById('turma-faltas').value;
            const container = document.getElementById('students-container');
            const listDiv = document.getElementById('student-attendance-list');
            
            if (!turma) {
                listDiv.style.display = 'none';
                return;
            }
            
            const students = studentsData[turma] || [];
            container.innerHTML = '';
            
            students.forEach((student, index) => {
                const studentDiv = document.createElement('div');
                studentDiv.className = 'student-item';
                studentDiv.innerHTML = `
                    <span class="student-name">${student}</span>
                    <div class="attendance-controls">
                        <div class="radio-group">
                            <input type="radio" id="presente-${index}" name="attendance-${index}" value="presente" checked>
                            <label for="presente-${index}">Presente</label>
                        </div>
                        <div class="radio-group">
                            <input type="radio" id="ausente-${index}" name="attendance-${index}" value="ausente">
                            <label for="ausente-${index}">Ausente</label>
                        </div>
                    </div>
                `;
                container.appendChild(studentDiv);
            });
            
            listDiv.style.display = 'block';
        }

        function saveAttendance() {
            const turma = document.getElementById('turma-faltas').value;
            if (!turma) {
                alert('Por favor, selecione uma turma primeiro.');
                return;
            }
            
            showSuccessMessage('Presenças salvas com sucesso!');
        }

        function saveGrades() {
            const grades = document.querySelectorAll('.grade-input');
            let hasInvalidGrade = false;
            
            grades.forEach(grade => {
                const value = parseFloat(grade.value);
                if (grade.value !== '' && (isNaN(value) || value < 0 || value > 10)) {
                    hasInvalidGrade = true;
                    grade.style.borderColor = '#dc3545';
                } else {
                    grade.style.borderColor = '#e9ecef';
                }
            });
            
            if (hasInvalidGrade) {
                alert('Por favor, insira notas válidas entre 0 e 10.');
                return;
            }
            
            showSuccessMessage('Notas salvas com sucesso!');
        }

        function saveContent() {
            const turma = document.querySelector('#conteudos-section select').value;
            const titulo = document.querySelector('#conteudos-section input[type="text"]').value;
            const descricao = document.querySelector('#conteudos-section textarea').value;
            
            if (!turma) {
                alert('Por favor, selecione uma turma.');
                return;
            }
            
            if (!titulo.trim()) {
                alert('Por favor, insira um título para o conteúdo.');
                return;
            }
            
            showSuccessMessage('Conteúdo publicado com sucesso!');
            clearContentForm();
        }

        function saveActivity() {
            const turma = document.querySelector('#atividades-section select').value;
            const titulo = document.querySelector('#atividades-section input[type="text"]').value;
            const descricao = document.querySelector('#atividades-section textarea').value;
            const prazo = document.querySelector('#atividades-section input[type="datetime-local"]').value;
            
            if (!turma) {
                alert('Por favor, selecione uma turma.');
                return;
            }
            
            if (!titulo.trim()) {
                alert('Por favor, insira um título para a atividade.');
                return;
            }
            
            if (!prazo) {
                alert('Por favor, defina um prazo para a atividade.');
                return;
            }
            
            showSuccessMessage('Atividade criada com sucesso!');
            clearActivityForm();
        }

        function clearContentForm() {
            document.querySelector('#conteudos-section select').value = '';
            document.querySelector('#conteudos-section input[type="text"]').value = '';
            document.querySelector('#conteudos-section textarea').value = '';
            document.getElementById('file-input').value = '';
        }

        function clearActivityForm() {
            document.querySelector('#atividades-section select').value = '';
            document.querySelector('#atividades-section input[type="text"]').value = '';
            document.querySelector('#atividades-section textarea').value = '';
            document.querySelector('#atividades-section input[type="datetime-local"]').value = '';
        }

        function showSuccessMessage(message) {
            const banner = document.getElementById('success-banner');
            banner.textContent = message;
            banner.style.display = 'block';
            
            
            setTimeout(() => {
                banner.style.display = 'none';
            }, 3000);
        }

        function logout() {
            if (confirm('Tem certeza que deseja sair do sistema?')) {
                alert('Logout realizado. Redirecionando para a tela de login...');
                
                window.location.reload();
            }
        }

        
        document.getElementById('file-input').addEventListener('change', function(e) {
            const fileName = e.target.files[0]?.name;
            if (fileName) {
                const uploadDiv = document.querySelector('.file-upload');
                uploadDiv.innerHTML = `
                    <div style="color: #28a745;">
                        <div style="font-size: 24px; margin-bottom: 10px;">✅</div>
                        <p>Arquivo selecionado:</p>
                        <strong>${fileName}</strong>
                        <br>
                        <small style="color: #6c757d; cursor: pointer;" onclick="document.getElementById('file-input').click()">Clique para alterar</small>
                    </div>
                `;
            }
        });