document.querySelector('.user-detail .fa-eye')
    .addEventListener('click', () => {
        document.querySelector('.user-detail .code')
            .innerHTML = `50055 <i class="fa-solid fa-eye-slash"></i>`;
    });
document.querySelector('.user .fa-eye')
    .addEventListener('click', () => {
        document.querySelector('.databse-info .code')
            .innerHTML = `50055 <i class="fa-solid fa-eye-slash"></i>`;
    });


document.querySelector('.user-detail .fa-eye-slash')
    .addEventListener('click', () => {
        document.querySelector('.user-detail .code')
            .innerHTML = `***** <i class="fa-solid fa-eye"></i>`;
    });
document.querySelector('.user .fa-eye-slash')
    .addEventListener('click', () => {
        document.querySelector('.databse-info .code')
            .innerHTML = `***** <i class="fa-solid fa-eye"></i>`;
    });