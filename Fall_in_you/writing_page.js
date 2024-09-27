
document.addEventListener('DOMContentLoaded', () => {
  // Supabase 클라이언트 초기화
  const supabaseUrl = 'https://lfiiyfntsxuukrwuyiih.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmaWl5Zm50c3h1dWtyd3V5aWloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc0NDI3NjQsImV4cCI6MjA0MzAxODc2NH0.qCccNoz9idzMM89MXPo_yI5xshaV3ea5jq33l-qrqLI';
  const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

  document.getElementById('noticeForm').addEventListener('submit', async (e) => {
      e.preventDefault();

      const category = document.getElementById('category').value;
      const title = document.getElementById('title').value;
      const contents = document.getElementById('contents').value;

      const { data, error } = await supabase
          .from('notice')
          .insert([
              { category, title, contents }
          ]);

          if (error) {
            alert('등록 실패: ' + error.message); // 실패 시 팝업
        } else {
            alert('등록 성공'); // 성공 시 팝업
            document.getElementById('noticeForm').reset(); // 폼 초기화
        }
  });
});