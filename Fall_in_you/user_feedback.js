const supabaseUrl = 'https://lfiiyfntsxuukrwuyiih.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmaWl5Zm50c3h1dWtyd3V5aWloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc0NDI3NjQsImV4cCI6MjA0MzAxODc2NH0.qCccNoz9idzMM89MXPo_yI5xshaV3ea5jq33l-qrqLI';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

const receiverPhone = '01053404196'; // 고정된 전화번호

// 후기 불러오기
async function fetchFeedback() {
    const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .eq('receiver_phone', receiverPhone);

    if (error) {
        console.error('Error fetching feedback:', error);
    } else {
        displayFeedback(data);
        calculateAverageScore(data); // 평균 점수 계산
    }
}

// 후기 표시
function displayFeedback(feedbacks) {
    const feedbackContainer = document.getElementById('feedbackContainer');
    feedbackContainer.innerHTML = '';

    feedbacks.forEach(feedback => {
        const feedbackElement = document.createElement('div');
        feedbackElement.classList.add('feedback');
        feedbackElement.innerHTML = `
            <p><strong>후기:</strong> ${feedback.feedback}</p>
            <p><strong>받는 사람 전화번호:</strong> ${feedback.receiver_phone}</p>
            <p><strong>점수:</strong> ${feedback.score}</p>
        `;
        feedbackContainer.appendChild(feedbackElement);
    });
}

// 평균 점수 계산
function calculateAverageScore(feedbacks) {
    if (feedbacks.length === 0) {
        document.getElementById('averageScore').innerText = '평균 점수: 0.00';
        return;
    }

    const totalScore = feedbacks.reduce((sum, feedback) => sum + feedback.score, 0);
    const averageScore = (totalScore / feedbacks.length).toFixed(2);
    document.getElementById('averageScore').innerText = `평균 점수: ${averageScore}`;
}

// 초기 후기 정보 로드
fetchFeedback();
