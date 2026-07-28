// ES6 Next Level JavaScript

// 1. Page Navigation Handler - All navbar + login + signup
document.querySelectorAll('.nav-links a,.btn-login,.btn-signup').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if(href!== '#'){
      e.preventDefault();
      document.body.style.opacity = '0';
      setTimeout(() => {
        window.location.href = href; // New page open
      }, 200);
    }
  });
});

// 2. Tab Content - About / Comments 26
const tabContent = {
  about: `
    <h3>About this Design</h3>
    <p>This is a clean eCommerce Furniture Landing Page UI Kit.
    Easy to customize for your next project. Includes 5+ pages,
    responsive design, and modern components.</p>
    <ul style="margin-top:12px; padding-left:20px;">
      <li>Fully Responsive</li>
      <li>Figma + HTML + CSS included</li>
      <li>Free for commercial use</li>
    </ul>
  `,
  comments: `
    <h3>Comments - 26</h3>
    <div class="comment-list">
      <div class="comment">
        <img src="https://i.pravatar.cc/32?img=1">
        <div>
          <b>Ali Khan</b> <span>2 days ago</span>
          <p>Amazing design! Very clean and modern 🔥</p>
        </div>
      </div>
      <div class="comment">
        <img src="https://i.pravatar.cc/32?img=2">
        <div>
          <b>Sara Ahmed</b> <span>1 week ago</span>
          <p>Love the color palette. Can you share Figma file?</p>
        </div>
      </div>
      <div class="comment">
        <img src="https://i.pravatar.cc/32?img=3">
        <div>
          <b>Usman</b> <span>3 weeks ago</span>
          <p>Best UI kit I found this month. Thanks!</p>
        </div>
      </div>
    </div>
    <textarea id="newComment" placeholder="Add a comment..."></textarea>
    <button id="postComment" class="btn-primary" style="margin-top:10px;">Post Comment</button>
  `
};

const tabs = document.querySelectorAll('.tab');
const contentArea = document.createElement('div');
contentArea.className = 'tab-content';
document.querySelector('.left-content').appendChild(contentArea);

// Default: About show karo
contentArea.innerHTML = tabContent.about;

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const tabName = tab.dataset.tab;
    contentArea.innerHTML = tabContent[tabName];
    showToast(`Switched to ${tabName} tab`);

    // Agar comments tab hai to post button chalao
    if(tabName === 'comments'){
      document.getElementById('postComment')?.addEventListener('click', postNewComment);
    }
  });
});

// 3. Post New Comment
const postNewComment = () => {
  const input = document.getElementById('newComment');
  if(input.value.trim() === '') return showToast('Comment cannot be empty ⚠️');

  // New comment ko top pe add kar do
  const newCommentHTML = `
    <div class="comment">
      <img src="https://i.pravatar.cc/32?u=new">
      <div>
        <b>You</b> <span>Just now</span>
        <p>${input.value}</p>
      </div>
    </div>
  `;
  document.querySelector('.comment-list').insertAdjacentHTML('afterbegin', newCommentHTML);
  input.value = '';
  showToast('Comment Posted ✅');
};

// 4. Like Counter
const likeCountEl = document.getElementById('likeCount');
let likes = localStorage.getItem('likes') || 2100;
const formatNumber = (num) => num >= 1000? (num/1000).toFixed(1) + 'k' : num;
likeCountEl.textContent = formatNumber(likes);

// 5. Open in Figma Button
document.getElementById('openFigmaBtn').addEventListener('click', () => {
  showToast('Opening in Figma... 🚀');
  setTimeout(() => {
    window.open('https://www.figma.com', '_blank');
  }, 800);
});

// 6. Search with Debounce
const searchInput = document.getElementById('searchInput');
let debounceTimer;
searchInput.addEventListener('input', (e) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    const query = e.target.value;
    if(query.length > 2){
      showToast(`Searching: ${query}`);
    }
  }, 500);
});

// 7. Toast Notification
const showToast = (message) => {
  const toast = document.createElement('div');
  toast.textContent = message;
  Object.assign(toast.style, {
    position: 'fixed', bottom: '20px', right: '20px',
    background: '#111', color: 'white', padding: '12px 20px',
    borderRadius: '8px', zIndex: '999', opacity: '0',
    transition: 'opacity 0.3s', fontSize: '14px'
  });
  document.body.appendChild(toast);
  setTimeout(() => toast.style.opacity = '1', 100);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 2000);
};

// 8. Page Load Animation
window.addEventListener('DOMContentLoaded', () => {
  document.body.style.transition = 'opacity 0.3s';
  document.body.style.opacity = '1';
});