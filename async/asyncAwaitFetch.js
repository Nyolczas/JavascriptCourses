const posts = [
  { title: 'Első', body: 'Ez az Első bejegyzés'},
  { title: 'Második', body: 'Ez az Második bejegyzés'}
];

const getPosts = () => {
    let output = '<ol>';
    posts.forEach((post, index) => {
      output += `<li><h1>${post.title}</h1><p>${post.body}</p><hr></li>`;
    });
    output += '</ol>';
    document.body.innerHTML = output;
}
const createPost = (post) => {
  return new Promise((resolve, reject) => {   
      posts.push(post);
      const error = false;
      if(!error) {
        resolve();
      } else {
        reject('Valami nem jó');
      }

  });
}

async function fetchPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  await data.forEach((post, index) => {
    createPost({ title: post.title, body: post.body });
  });
  getPosts();
} 

fetchPosts();