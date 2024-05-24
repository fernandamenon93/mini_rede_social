document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obter os valores dos campos do formulário
    const postText = document.getElementById('postText').value;
    const category = document.getElementById('category').value;
    const image1 = document.getElementById('image1').value;
    const image2 = document.getElementById('image2').value;
    const image3 = document.getElementById('image3').value;

    // Aqui você enviaria os dados do post para o backend para salvar no banco de dados
    console.log('Texto do Post:', postText);
    console.log('Categoria:', category);
    console.log('URLs das Imagens:', image1, image2, image3);

    // Limpar o formulário após a submissão
    document.getElementById('postForm').reset();
});


// Após exibir os posts na página
document.querySelectorAll('.carousel').forEach(function(carousel) {
    $(carousel).slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
    });
});