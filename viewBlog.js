window.addEventListener('DOMContentLoaded', function () {
    var db = firebase.firestore();


    const params = window.location.search;
    const id = new URLSearchParams(params).get('id')
    console.log(id);
    //console.log(localStorage.getItem('userid'));

    const userIdForCommenting = localStorage.getItem('userIdForCommenting');

    db.collection('users').doc(`${userIdForCommenting}`).collection("blogs").doc(`${id}`).get()
        .then((doc) => {
            //if (!doc.exists)
                //return;
            console.log(doc.data().blogTitle)
            console.log(doc.data().blogBody)

            //console.log(doc.data().blogTitle)
            //console.log(doc.data().blogBody)
            var blogHeadingText = document.querySelector('.blog-heading-text');
            var blogBodyText = document.querySelector('.blog-body-text');

            blogHeadingText.textContent = doc.data().blogTitle;
            blogBodyText.textContent = doc.data().blogBody;

            
        })


    


    document.querySelector('.comment-form').addEventListener('submit', function (e) {
        e.preventDefault();
        var commentBody = document.querySelector('.comment-body').value; 

        console.log(commentBody)

         
            db.collection('blogs').doc(`${id}`).collection('comments').add({
                commentContent: commentBody,
                serverTimeStamp: '', 
            })
                .then(() => {
                    alert('comment added successfully')
                })
                .catch((e) => {
                    console.log('comment could not be added because of error')
                })

        
        


    })

    db.collection("blogs").doc(`${id}`).collection("comments").get()
        .then((snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))

            data.forEach((d) => {
                console.log(d.commentContent)
                document.querySelector('.userComments').innerHTML += `<p class='xmama'>${d.commentContent}</p>`
            })
        })



    



})

