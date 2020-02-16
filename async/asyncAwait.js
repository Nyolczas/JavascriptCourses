const posts = [
  { title: 'Első', body: 'Ez az Első bejegyzés'},
  { title: 'Második', body: 'Ez az Második bejegyzés'}
];

const getPosts = () => {
  setTimeout(() => {
    let output = '';
    posts.forEach((post, index) => {
      output += `<li>${post.title}</li>`;
    });
    document.body.innerHTML = output;
  }, 1000);
}
const createPost = (post) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      posts.push(post);
      const error = false;
      if(!error) {
        resolve();
      } else {
        reject('Valami nem jó');
      }
    }, 2000);
  });
}

async function init() {
  await createPost({ title: 'Harmadik', body: 'Ez az Harmadik bejegyzés' });
  getPosts();
} 

init();