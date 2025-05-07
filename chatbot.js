
function toggleChat() {
  const chatWindow = document.getElementById('chat-window');
  if (chatWindow.style.display === 'none') {
    chatWindow.style.display = 'block';
  } else {
    chatWindow.style.display = 'none';
  }
}
