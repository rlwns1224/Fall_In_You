const supabaseUrl = 'https://lfiiyfntsxuukrwuyiih.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmaWl5Zm50c3h1dWtyd3V5aWloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc0NDI3NjQsImV4cCI6MjA0MzAxODc2NH0.qCccNoz9idzMM89MXPo_yI5xshaV3ea5jq33l-qrqLI';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// id 가져오기
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
    fetchComments();
}

// 댓글 등록
document.getElementById('submitComment').addEventListener('click', async () => {
    const comment = document.getElementById('commentInput').value;
    const phoneNumber = '01012345678'; // 여기에 사용자의 전화번호를 입력하세요

    const { data, error } = await supabase
        .from('comments')
        .insert([
            { comment, phone_number: phoneNumber, notice_id: id } // 전화번호와 댓글을 저장
        ]);

    if (error) {
        console.error('Error adding comment:', error);
    } else {
        document.getElementById('commentInput').value = ''; // 입력란 초기화
        fetchComments(); // 댓글 목록 새로고침
    }
});

// 댓글 불러오기
async function fetchComments() {
    const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('notice_id', id);

    if (error) {
        console.error('Error fetching comments:', error);
    } else {
        displayComments(data);
    }
}

// 댓글 표시
function displayComments(comments) {
    const commentsContainer = document.getElementById('commentsContainer');
    commentsContainer.innerHTML = '';

    comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.innerHTML = `
            <img src="https://via.placeholder.com/30" alt="Profile">
            <p>${comment.comment}</p>
            <button onclick="startChat('${comment.phone_number}')">채팅하기</button>
        `;
        commentsContainer.appendChild(commentElement);
    });
}

// 채팅하기 함수
function startChat(phoneNumber) {
    window.location.href = `chat.html?phone=${phoneNumber}`; // 채팅 페이지로 이동
}

// 초기 게시글 상세 정보 로드
fetchPostDetails();
