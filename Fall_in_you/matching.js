// matching.js
import supabase from './supabaseClient.js';


document.getElementById('find-matching-users').addEventListener('click', fetchMatchingUsers);

async function fetchMatchingUsers() {
    // 현재 로그인한 사용자 정보 가져오기
    const user = supabase.auth.user();

    if (!user) {
        console.error('사용자가 로그인되어 있지 않습니다.');
        return;
    }

    // 로그인한 사용자 정보 가져오기
    const { data: currentUser, error: userError } = await supabase
        .from('users')
        .select('language, country, region, tags')
        .eq('id', user.id) // 로그인한 사용자의 ID로 필터링
        .single();

    if (userError) {
        console.error('사용자 정보 가져오기 오류:', userError);
        return;
    }

    // 유사한 사용자 검색
    const { data: matchingUsers, error: matchingError } = await supabase
        .from('users')
        .select('id, language, country, region, tags')
        .eq('language', currentUser.language) // 언어가 같은 사용자만 선택
        .neq('id', user.id) // 현재 사용자 제외
        .or(`country.eq.${currentUser.country},region.eq.${currentUser.region}`); // 국가와 지역 필터링

    if (matchingError) {
        console.error('유사한 사용자 가져오기 오류:', matchingError);
        return;
    }

    // 태그 유사도 계산
    const filteredUsers = matchingUsers.filter(matchingUser => {
        // tags는 배열로 가정합니다.
        const currentTags = currentUser.tags || [];
        const matchingTags = matchingUser.tags || [];

        // 태그의 교집합을 계산하여 유사한지 판단
        const commonTags = currentTags.filter(tag => matchingTags.includes(tag));
        return commonTags.length > 0; // 하나 이상의 공통 태그가 있을 경우
    });

    // 결과 표시
    displayUserProfiles(filteredUsers);
}

function displayUserProfiles(users) {
    const userProfilesDiv = document.getElementById('user-profiles');
    userProfilesDiv.innerHTML = ''; // 이전 결과 초기화

    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.innerHTML = `
            <h3>사용자 ID: ${user.id}</h3>
            <p>언어: ${user.language}</p>
            <p>국가: ${user.country}</p>
            <p>지역: ${user.region}</p>
            <p>태그: ${user.tags.join(', ')}</p>
            <hr>
        `;
        userProfilesDiv.appendChild(userDiv);
    });
}
