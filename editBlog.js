const params = window.location.search;
const id = new URLSearchParams(params).get('id')
var blogTitleEdit = document.querySelector('.blog-title-edit');
var blogBodyEdit = document.querySelector('.blog-body-edit');

var userIdentifier = localStorage.getItem('userid');
console.log(userIdentifier)
console.log(id)





window.addEventListener('DOMContentLoaded', function () {
    var db = firebase.firestore();


    const params = window.location.search;
    const id = new URLSearchParams(params).get('id')
    console.log(id);
    //console.log(localStorage.getItem('userid'));
    var userId = localStorage.getItem('userid');
    console.log(userId)


    db.collection("users").doc(`${userId}`).collection("blogs").doc(`${id}`).get()
        .then((doc) => {
            if (!doc.exists)
                return;
            console.log(doc.data().blogTitle)
            console.log(doc.data().blogBody)

        //console.log(doc.data().blogTitle)
        //console.log(doc.data().blogBody)
        var blogTitleEdit = document.querySelector('.blog-title-edit'); 
        var blogBodyEdit = document.querySelector('.blog-body-edit');

        blogTitleEdit.value = doc.data().blogTitle;
        blogBodyEdit.innerText = doc.data().blogBody;

        /*
        document.querySelector('.blog-title-edit').value = doc.data().blogTitle; 
        document.querySelector('.blog-body-edit').innerText = doc.data().blogBody; 
        */
    })


})




document.querySelector('.update-blog-button').addEventListener('click', function () {
    console.log(id)
    db.collection("users").doc(`${userIdentifier}`).collection("blogs").doc(`${id}`).update({
        blogTitle: blogTitleEdit.value,
        blogBody: blogBodyEdit.value
    })
    .then(() => {
       alert('blog updated successfully')
    })
    .catch((e) => {
       console.log('blog could not be updated because of error')
    })
}); 









