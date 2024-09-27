const supabaseUrl = 'https://lfiiyfntsxuukrwuyiih.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmaWl5Zm50c3h1dWtyd3V5aWloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc0NDI3NjQsImV4cCI6MjA0MzAxODc2NH0.qCccNoz9idzMM89MXPo_yI5xshaV3ea5jq33l-qrqLI';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// 전화번호 가져오기
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

// 게시글 상세 정보 가져오기
async function fetchPostDetails() {
    const { data, error } = await supabase
        .from('notice')
        .select('*')
        .eq('id', id)
        .single(); // 단일 게시글만 가져오기

    if (error) {
        console.error('Error fetching post details:', error);
        document.getElementById('postDetail').innerText = '게시글을 불러오는 데 실패했습니다.';
    } else {
        displayPostDetails(data);
    }
}

// 게시글 상세 정보 표시
function displayPostDetails(post) {
    const postDetailContainer = document.getElementById('postDetail');
    postDetailContainer.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.contents}</p>
        <p>카테고리: ${post.category}</p>
        <p>작성일: ${new Date(post.created_at).toLocaleString()}</p>
    `;
}

// 초기 게시글 상세 정보 로드
fetchPostDetails();
