const loadUserBtn = document.getElementById('loadUser');
const userCard = document.getElementById('userCard');
const feedbackForm = document.getElementById('feedbackForm');
const responseMessage = document.getElementById('responseMessage');


loadUserBtn.addEventListener('click', async () => {
  try {
    const res = await fetch('https://randomuser.me/api/');
    const data = await res.json();
    const user = data.results[0];
    userCard.innerHTML = `
      <img src="${user.picture.large}" alt="User Image" width="100" />
      <h3>${user.name.first} ${user.name.last}</h3>
      <p>${user.email}</p>
      <p>${user.location.country}</p>
    `;
  } catch (error) {
    userCard.innerHTML = `<p style="color:red;">Failed to load user.</p>`;
  }
});


feedbackForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const feedback = {
    name: document.getElementById('name').value,
    message: document.getElementById('message').value,
  };

  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(feedback),
    });

    const result = await res.json();
    responseMessage.textContent = `Feedback submitted! ID: ${result.id}`;
    responseMessage.style.color = 'green';
  } catch (error) {
    responseMessage.textContent = 'Error submitting feedback.';
    responseMessage.style.color = 'red';
  }
});
