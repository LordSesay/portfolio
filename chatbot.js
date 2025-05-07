/**
 * Portfolio Chatbot - A simple interactive chatbot for Malcolm's portfolio
 * @author Malcolm Sesay
 */

// Configuration object for chatbot settings
const CHATBOT_CONFIG = {
  animationDuration: 300,
  fadeInDelay: 10,
  initialMessage: "Hello! Ask me about my projects, skills, or resume.",
  responses: {
    project: "I have several cloud projects on my GitHub. Check out my portfolio for details!",
    github: "I have several cloud projects on my GitHub. Check out my portfolio for details!",
    resume: "You can view or download my resume from the Resume section.",
    cv: "You can view or download my resume from the Resume section.",
    contact: "Feel free to reach out using the contact form or connect with me on LinkedIn!",
    email: "Feel free to reach out using the contact form or connect with me on LinkedIn!",
    skill: "I specialize in AWS cloud services, DevOps practices, and infrastructure automation.",
    aws: "I specialize in AWS cloud services, DevOps practices, and infrastructure automation.",
    default: "Thanks for your message! Feel free to ask about my projects, skills, or experience."
  }
};

// Use an IIFE to avoid polluting the global namespace
(function() {
  // Wait for DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', initChatbot);
  
  /**
   * Initialize the chatbot functionality
   */
  function initChatbot() {
    const chatWindow = document.getElementById('chat-window');
    const chatButton = document.querySelector('#chatbot button');
    
    // Create chat input elements
    setupChatInterface(chatWindow);
    
    // Remove inline onclick handler and use event listener instead
    chatButton.removeAttribute('onclick');
    chatButton.addEventListener('click', toggleChat);
    
    // Add keyboard accessibility
    chatButton.addEventListener('keydown', handleKeyboardInput);
  }
  
  /**
   * Set up the chat interface with input field and messages container
   * @param {HTMLElement} chatWindow - The chat window element
   */
  function setupChatInterface(chatWindow) {
    // Create chat messages container
    const messagesContainer = document.createElement('div');
    messagesContainer.id = 'chat-messages';
    messagesContainer.className = 'chat-messages';
    
    // Move the initial greeting to the messages container
    const initialMessage = chatWindow.querySelector('p');
    if (initialMessage) {
      messagesContainer.appendChild(initialMessage);
    } else {
      const greeting = document.createElement('p');
      greeting.className = 'bot-message';
      greeting.textContent = CHATBOT_CONFIG.initialMessage;
      messagesContainer.appendChild(greeting);
    }
    
    // Create input area
    const inputArea = document.createElement('div');
    inputArea.className = 'chat-input-area';
    
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.id = 'chat-input';
    inputField.placeholder = 'Type your message...';
    inputField.setAttribute('aria-label', 'Type your message');
    
    const sendButton = document.createElement('button');
    sendButton.type = 'button';
    sendButton.id = 'send-button';
    sendButton.textContent = 'Send';
    sendButton.setAttribute('aria-label', 'Send message');
    
    // Add event listeners for input
    sendButton.addEventListener('click', sendMessage);
    inputField.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
      }
    });
    
    // Assemble the chat interface
    inputArea.appendChild(inputField);
    inputArea.appendChild(sendButton);
    
    // Clear existing content and add new elements
    chatWindow.innerHTML = '';
    chatWindow.appendChild(messagesContainer);
    chatWindow.appendChild(inputArea);
  }
  
  /**
   * Handle keyboard input for accessibility
   * @param {KeyboardEvent} e - The keyboard event
   */
  function handleKeyboardInput(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleChat();
    }
  }
  
  /**
   * Toggle the chat window visibility with animation
   */
  function toggleChat() {
    const chatWindow = document.getElementById('chat-window');
    const isHidden = chatWindow.style.display === 'none';
    
    if (isHidden) {
      // Show chat window with fade-in animation
      chatWindow.style.display = 'block';
      chatWindow.style.opacity = '0';
      
      // Use requestAnimationFrame for smoother animation
      requestAnimationFrame(() => {
        setTimeout(() => {
          chatWindow.style.opacity = '1';
          // Focus on input field when chat opens
          const inputField = document.getElementById('chat-input');
          if (inputField) inputField.focus();
        }, CHATBOT_CONFIG.fadeInDelay);
      });
    } else {
      // Hide with fade-out animation
      chatWindow.style.opacity = '0';
      
      setTimeout(() => {
        chatWindow.style.display = 'none';
      }, CHATBOT_CONFIG.animationDuration);
    }
  }
  
  /**
   * Send a message and get a response
   */
  function sendMessage() {
    const inputField = document.getElementById('chat-input');
    const messagesContainer = document.getElementById('chat-messages');
    
    if (!inputField || !messagesContainer) return;
    
    const userMessage = inputField.value.trim();
    if (!userMessage) return;
    
    // Add user message to chat
    addMessageToChat('user-message', userMessage);
    
    // Clear input field
    inputField.value = '';
    
    // Process message and get response
    const botResponse = processMessage(userMessage);
    
    // Add bot response with slight delay for natural feel
    setTimeout(() => {
      addMessageToChat('bot-message', botResponse);
    }, 500);
  }
  
  /**
   * Add a message to the chat window
   * @param {string} className - CSS class for the message
   * @param {string} text - Message text
   */
  function addMessageToChat(className, text) {
    const messagesContainer = document.getElementById('chat-messages');
    if (!messagesContainer) return;
    
    const messageElement = document.createElement('p');
    messageElement.className = className;
    messageElement.textContent = text;
    
    messagesContainer.appendChild(messageElement);
    
    // Auto-scroll to the bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
  
  /**
   * Process user message and generate response
   * @param {string} message - User's message
   * @return {string} - Chatbot response
   */
  function processMessage(message) {
    // Convert to lowercase for case-insensitive matching
    const lowerMessage = message.toLowerCase();
    
    // Check for keywords in the message
    for (const [keyword, response] of Object.entries(CHATBOT_CONFIG.responses)) {
      if (lowerMessage.includes(keyword)) {
        return response;
      }
    }
    
    // Return default response if no keywords match
    return CHATBOT_CONFIG.responses.default;
  }
})();