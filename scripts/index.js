document.addEventListener('DOMContentLoaded', () => {
    // Localizar os elements do form de post, a lista dos posts e o filtro
    const postForm = document.getElementById('postForm');
    const postList = document.getElementById('postList');
    const filterCategory = document.getElementById('filterCategory');
    let posts = [];

    // Criar o post e adicionar dentro do array de posts
    postForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const postText = document.getElementById('postText').value;
        const postCategory = document.getElementById('postCategory').value;
        const images = [
            document.getElementById('image1').value,
            document.getElementById('image2').value,
            document.getElementById('image3').value
        ].filter(img => img);
        const date = new Date().toISOString();

        const post = { text: postText, category: postCategory, images, date };
        posts.push(post);
        renderPosts();
        postForm.reset();
    });

    // Re-Renderizar os posts caso o filtro mude
    filterCategory.addEventListener('change', renderPosts);

    // Renderizar cada post dentro do array em html
    function renderPosts() {
        postList.innerHTML = '';
        const filteredPosts = filterCategory.value ? posts.filter(post => post.category === filterCategory.value) : posts;
        filteredPosts.forEach((post, index) => {
            const postItem = document.createElement('div');
            postItem.className = 'post-item';
            postItem.innerHTML = `
                <p>${post.text}</p>
                <div class="carousel" id="carousel-${index}">
                    ${post.images.map((img, i) => `<img src="${img}" class="${i === 0 ? 'active' : ''}" alt="Image ${i + 1}">`).join('')}
                </div>
                <div class="carousel-buttons">
                    <button onclick="prevImage(${index})">Prev</button>
                    <button onclick="nextImage(${index})">Next</button>
                </div>
                <p>Category: ${post.category}</p>
                <p>Date: ${new Date(post.date).toLocaleString()}</p>
                <button onclick="editPost(${index})">Edit</button>
                <button onclick="deletePost(${index})">Delete</button>
            `;
            postList.appendChild(postItem);
        });
    }

    window.prevImage = (index) => {
        const carousel = document.getElementById(`carousel-${index}`);
        const images = carousel.querySelectorAll('img');
        const activeIndex = Array.from(images).findIndex(img => img.classList.contains('active'));
        images[activeIndex].classList.remove('active');
        const newIndex = (activeIndex - 1 + images.length) % images.length;
        images[newIndex].classList.add('active');
    };

    window.nextImage = (index) => {
        const carousel = document.getElementById(`carousel-${index}`);
        const images = carousel.querySelectorAll('img');
        const activeIndex = Array.from(images).findIndex(img => img.classList.contains('active'));
        images[activeIndex].classList.remove('active');
        const newIndex = (activeIndex + 1) % images.length;
        images[newIndex].classList.add('active');
    };

    window.editPost = (index) => {
        const post = posts[index];
        const newText = prompt('Edit your post:', post.text);
        if (newText !== null) {
            post.text = newText;
            renderPosts();
        }
    };

    window.deletePost = (index) => {
        if (confirm('Are you sure you want to delete this post?')) {
            posts.splice(index, 1);
            renderPosts();
        }
    };
});

particlesJS.load('particles-container', '/scripts/particles.json');
