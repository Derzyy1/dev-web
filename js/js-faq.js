document.addEventListener('DOMContentLoaded', function() {
    const showButtons = document.querySelectorAll('.showme');
    
    showButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const answerElement = document.getElementById(targetId);
            
            if (answerElement.style.display === 'none' || answerElement.style.display === '') {
                answerElement.style.display = 'block';
                this.textContent = 'Skrýt';
            } else {
                answerElement.style.display = 'none';
                this.textContent = 'Zobrazit';
            }
        });
    });
});