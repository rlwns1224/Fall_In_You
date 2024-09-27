const supabaseUrl = 'https://lfiiyfntsxuukrwuyiih.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmaWl5Zm50c3h1dWtyd3V5aWloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc0NDI3NjQsImV4cCI6MjA0MzAxODc2NH0.qCccNoz9idzMM89MXPo_yI5xshaV3ea5jq33l-qrqLI';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// 게시글 가져오기
async function fetchPosts() {
    const category = document.getElementById('filterCategory').value;
    let query = supabase.from('notice').select('*');

    if (category) {
        query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching posts:', error);
    } else {
        displayPosts(data);
    }
}

// 게시글 표시
function displayPosts(posts) {
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.contents}</p>
            <p>카테고리: ${post.category}</p>
        `;
        postsContainer.appendChild(postElement);
    });
}

// 초기 게시글 로드
fetchPosts();
