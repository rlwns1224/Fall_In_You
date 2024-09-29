//import supabase from './supabaseClient.js';
const supabaseUrl = 'https://lfiiyfntsxuukrwuyiih.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmaWl5Zm50c3h1dWtyd3V5aWloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc0NDI3NjQsImV4cCI6MjA0MzAxODc2NH0.qCccNoz9idzMM89MXPo_yI5xshaV3ea5jq33l-qrqLI';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);


document.getElementById('find-matching-users').addEventListener('click', fetchMatchingUsers);

async function fetchMatchingUsers() {
    // JWT 토큰 가져오기
    /*const token = localStorage.getItem('token'); // 여기서 JWT 토큰을 가져옵니다.

    if (!token) {
        console.error('사용자가 로그인되어 있지 않습니다.');
        alert('로그인이 필요합니다.');
        return;
    }

    // 서버에서 사용자 정보 가져오기
    const response = await fetch('http://localhost:3000/api/mypage', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}` // 유효한 JWT 토큰
        }
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('Error:', errorText);
        alert('사용자 정보를 가져오는 데 실패했습니다.');
        return;
    }

    const userInfo = await response.json(); // 서버에서 사용자 정보 가져오기
    const { language, country, region, tags } = userInfo; // 필요한 정보 추출
*/
     // 현재 로그인한 사용자 정보 가져오기
    const currentUser = {
        id: 'ca9c1ed2-a0f0-47ef-8ec0-e593148b8d3e',
        language: 'ko',
        country: 'South Korea',
        region: '서울특별시',
        tags: ['운동', '유학']
    };

    // 유사한 사용자 검색
    const { data: matchingUsers, error: matchingError } = await supabase
    .from('users')
    .select('id, language, country, region, tags, nickname')
    .eq('language', currentUser.language) // 언어가 같은 사용자만 선택
    .neq('id', currentUser.id); // 현재 사용자 제외

    if (matchingError) {
    console.error('유사한 사용자 가져오기 오류:', matchingError);
    return;
    }

    // 유사한 사용자 태그 및 국가/지역 유사도 계산
    const filteredUsers = matchingUsers.map(matchingUser => {
    const currentTags = currentUser.tags || [];
    const matchingTags = matchingUser.tags || [];

    // 공통 태그를 계산
    const commonTags = currentTags.filter(tag => matchingTags.includes(tag));

    // 국가와 지역 유사도 추가
    const countrySimilarity = currentUser.country === matchingUser.country ? 1 : 0;
    const regionSimilarity = currentUser.region === matchingUser.region ? 1 : 0;

    // 총 유사도 계산
    const totalSimilarity = commonTags.length + countrySimilarity + regionSimilarity;

    return {
        ...matchingUser,
        similarity: totalSimilarity // 총 유사도로 저장
    };
    }).filter(user => user.similarity > 0); // 유사도가 1 이상인 사용자만 포함

    // 유사도 기준으로 정렬 (내림차순)
    const sortedUsers = filteredUsers.sort((a, b) => b.similarity - a.similarity);

    // 결과 표시
    displayUserProfiles(sortedUsers); 
}

function displayUserProfiles(users) {
    const userProfilesDiv = document.getElementById('user-profiles');
    userProfilesDiv.innerHTML = ''; // 이전 결과 초기화

    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.innerHTML = `
            <h3>닉네임: ${user.nickname}</h3> 
            <p>언어: ${user.language}</p>
            <p>국가: ${user.country}</p>
            <p>지역: ${user.region}</p>
            <p>태그: ${user.tags.join(', ')}</p>
            <button class="contact-button" data-user-id="${user.id}">Contact</button>
            <hr>
        `;
        userProfilesDiv.appendChild(userDiv);
    });

    const contactButtons = document.querySelectorAll('.contact-button');
    contactButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const userId = event.target.getAttribute('data-user-id');
            handleContact(userId); // Contact 버튼 클릭 시 처리 함수 호출
        });
    });

    function handleContact(userId) {
        // 사용자의 ID를 이용하여 연락처 처리 로직을 여기에 추가
        alert(`Contacting user with ID: ${userId}`);
        // 실제 연락처 처리 로직을 여기에 추가
    }
}
