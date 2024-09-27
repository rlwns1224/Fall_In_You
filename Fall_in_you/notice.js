const supabaseUrl = 'https://lfiiyfntsxuukrwuyiih.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmaWl5Zm50c3h1dWtyd3V5aWloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc0NDI3NjQsImV4cCI6MjA0MzAxODc2NH0.qCccNoz9idzMM89MXPo_yI5xshaV3ea5jq33l-qrqLI';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

let currentPage = 1;
const postsPerPage = 8;

// 게시글 가져오기
async function fetchPosts() {
    const category = document.getElementById('filterCategory').value;
    let query = supabase.from('notice').select('*').order('created_at', { ascending: false }); // 최근 게시물 우선 정렬

    if (category) {
        query = query.eq('category', category);
    }

    const { data, error } = await query.range((currentPage - 1) * postsPerPage, currentPage * postsPerPage - 1); // 페이지네이션

    if (error) {
        console.error('Error fetching posts:', error);
    } else {
        displayPosts(data);
        setupPagination(); // 페이지네이션 설정
    }
}

// 게시글 표시하기
function displayPosts(posts) {
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <h3><a href="post_detail.html?id=${post.id}">${post.title}</a></h3>
            <p>${post.contents}</p>
            <p>카테고리: ${post.category}</p>
        `;
        postsContainer.appendChild(postElement);
    });
}

// 페이지네이션 설정
async function setupPagination() {
    const { count, error } = await supabase.from('notice').select('*', { count: 'exact' });
    if (error) {
        console.error('Error fetching count:', error);
        return;
    }
    
    const totalPages = Math.ceil(count / postsPerPage);
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.onclick = () => {
            currentPage = i;
            fetchPosts(); // 해당 페이지의 게시글 가져오기
        };
        paginationContainer.appendChild(pageButton);
    }
}

// 초기 게시글 로드
fetchPosts();
