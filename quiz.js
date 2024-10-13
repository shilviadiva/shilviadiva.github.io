const questions = [ 
    {
      text: "Saat kamu lagi ngerjain tugas kelompok, kamu biasanya lebih suka ngapain?",
      options: [
        "Baca data, cari tahu masalah, dan nyusun rencana biar semuanya lancar!",
        "Langsung eksekusi! Coding atau bikin sesuatu yang bisa dipakai",
        "Pastikan semuanya aman dan nggak ada kesalahan fatal",
        "Ngatur strategi biar semuanya sinkron antara tim dan tujuan kita"
      ]
    },
    {
      text: "Kalau dapet masalah yang butuh cepat diselesaikan, apa reaksi pertamamu?",
      options: [
        "Pikirin dulu, cek semua informasi sebelum ambil keputusan",
        "Langsung coba berbagai solusi praktis dan lihat yang mana yang berhasil",
        "Pikirin risiko dulu, pastiin nggak ada yang bikin masalah makin parah",
        "Lihat dari sisi besar, cari solusi yang nggak cuma beresin masalah sekarang tapi juga ke depannya"
      ]
    },
    {
      text: "Kalau kamu disuruh pilih topik buat proyek akhir, mana yang paling bikin kamu semangat?",
      options: [
        "Analis data dan cari cara bikin sistem lebih efektif",
        "Bikin aplikasi atau program yang langsung bisa dipakai",
        "Pastikan sistem yang aman dan nggak gampang error",
        "Merancang solusi teknologi yang bisa diterapkan buat banyak masalah"
      ]
    },
    {
      text: "Di kelas, kamu paling excited kalau belajar apa?",
      options: [
        "Cari pola dan solusi dari data yang rumit",
        "Ngoding dan bikin aplikasi yang berfungsi",
        "Belajar cara memastikan semua data dan sistem aman",
        "Lihat bagaimana teknologi dan bisnis bisa nyambung dan saling bantu"
      ]
    },
    {
      text: "Kalau ada project besar yang harus diselesaikan, kamu lebih milih ngapain?",
      options: [
        "Baca data dan cari cara supaya prosesnya lebih efisien",
        "Langsung terjun bikin atau debugging aplikasi",
        "Pastikan semuanya aman dan sesuai standar",
        "Koordinasiin semua bagian project dan gimana cara kerjanya bareng"
      ]
    },
    {
      text: "Di waktu senggang, biasanya kamu lebih suka ngapain?",
      options: [
        "Pikirin masalah yang bisa diselesaikan dengan analisis data",
        "Eksperimen bikin program atau aplikasi kecil",
        "Baca tentang keamanan digital atau cara ngelindungin data",
        "Nyusun ide-ide besar buat project atau bisnis di masa depan"
      ]
    },
    {
      text: "Menurut kamu, apa sih arti 'berhasil' dalam ngerjain tugas atau proyek kuliah?",
      options: [
        "Kamu bisa lihat solusi yang jelas dari data yang kamu analisis",
        "Aplikasi atau hasil kerjaanmu jalan sesuai ekspektasi",
        "Nggak ada kesalahan atau masalah keamanan di project kamu",
        "Semua tujuan tercapai, dan hasilnya bisa dipakai buat jangka panjang"
      ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

// Updates the question and options based on the current question index
function updateQuestion() {
    const questionCard = document.querySelector('.question-card');
    const progressText = document.querySelector('.progress-text');
    const progressFilled = document.querySelector('.progress-filled');
    const question = questions[currentQuestionIndex];

    // Update question text
    questionCard.querySelector('.question-text').innerText = question.text;

    // Clear previous options and create new ones
    const optionsContainer = questionCard.querySelector('.options-container');
    optionsContainer.innerHTML = ""; // Clear previous options
    question.options.forEach((option, index) => {
        const optionRow = document.createElement('div');
        optionRow.classList.add('option-row');

        const label = document.createElement('div');
        label.classList.add('label');
        label.innerText = String.fromCharCode(65 + index); // A, B, C, D
        label.setAttribute('data-choice', String.fromCharCode(65 + index));
        label.onclick = () => selectOptionByLabel(String.fromCharCode(65 + index));

        const optionDiv = document.createElement('div');
        optionDiv.classList.add('option');
        optionDiv.setAttribute('data-choice', String.fromCharCode(65 + index));
        optionDiv.onclick = () => selectOption(optionDiv);

        const optionText = document.createElement('span');
        optionText.classList.add('option-text');
        optionText.innerText = option;

        optionDiv.appendChild(optionText);
        optionRow.appendChild(label);
        optionRow.appendChild(optionDiv);
        optionsContainer.appendChild(optionRow);
    });

    // Update progress text and filled bar
    progressText.innerText = `${currentQuestionIndex + 1} out of ${questions.length}`;
    progressFilled.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;

    // Disable the "Next" button initially
    document.querySelector('.next-button').disabled = true;
}

// Handles option selection and enables the "Next" button
function selectOption(element) {
    const options = document.querySelectorAll('.option');
    options.forEach(option => option.classList.remove('selected'));
    element.classList.add('selected');
    document.querySelector('.next-button').disabled = false; // Enable the button once an option is selected
}

// Moves to the next question or finishes the quiz if it's the last question
// Moves to the next question or finishes the quiz if it's the last question
function goToNextQuestion() {
  const selectedOption = document.querySelector('.option.selected');
  if (selectedOption) {
      const choice = selectedOption.getAttribute('data-choice');

      // Calculate score based on choice (updated with correct points)
      switch (choice) {
          case 'A':
              score += 3; // A = 3 points
              break;
          case 'B':
              score += 2; // B = 2 points
              break;
          case 'C':
              score += 1; // C = 1 point
              break;
          case 'D':
              score += 4; // D = 4 points
              break;
      }

      if (currentQuestionIndex < questions.length - 1) {
          currentQuestionIndex++;
          updateQuestion();
      } else {
          // Save score to localStorage for later use in confirmation page
          localStorage.setItem('score', score);
          window.location.href = 'konfirm.html'; // Navigate to confirmation page
      }
  }
}


function checkResults() {
    const score = localStorage.getItem('score'); // Ambil skor dari localStorage
    console.log('Score:', score); // Check the value of score
    let profession;

    if (score >= 6) {
        profession = 'application_developer'; 
    } else if (score >= 3) {
        profession = 'system_analyst'; 
    } else {
        profession = 'auditor_it'; 
    }

    window.location.href = `${profession}.html`;
}

// Initialize the first question
updateQuestion();