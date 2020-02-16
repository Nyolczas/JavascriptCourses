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
const createPost = (post, callback) => {
  setTimeout(() => {
    posts.push(post);
    callback();
  }, 2000);
}

getPosts();

createPost({ title: 'Harmadik', body: 'Ez az Harmadik bejegyzés' }, getPosts);