/*

if (!localStorage.getItem('id')) {
    alert('login to write blogs')
}

*/




var db = firebase.firestore()

const blogTitle = document.querySelector('.blog-title'); 
const blogBody = document.querySelector('.blog-body'); 
const saveBlogButton = document.querySelector('.save-blog-button');
const viewBlogButton = document.querySelector('.view-blog-button');


saveBlogButton.addEventListener('click', function () {
    var userId = localStorage.getItem('userid');
    console.log(userId)
    console.log(blogTitle.value, blogBody.value)


    if (!localStorage.getItem('userid')) {
        alert('login to write blogs')
        return;
    } else {
        db.collection("users").doc(`${userId}`).collection('blogs').add({
            blogTitle: blogTitle.value,
            blogBody: blogBody.value
        })
        .then(() => {
            alert('blog added successfully')
        })
        .catch((e) => {
            console.log('blog could not be added because of error')
         })
            
    }
})




/*viewBlogButton.addEventListener('click', function () {
    //alert('works')
    if (!localStorage.getItem('id')) {
        alert('login to view blogs')
        return;
    } else {
        db.collection("blogs").onSnapshot((snapshot) => {
            const data = snapshot.docs.map((doc) => {
                console.log(doc.id, doc.data())
            })
        })
            

    }
})*/