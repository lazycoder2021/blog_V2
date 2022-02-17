var db = firebase.firestore()

window.addEventListener('DOMContentLoaded', function () {
    
    //alert('works')
    if (!localStorage.getItem('userid')) {
        alert('login to view blogs')
        return;
    } else {
        var userId = localStorage.getItem('userid');

        db.collection("users").doc(`${userId}`).collection("blogs").get()
            .then((snapshot) => {
                const data = snapshot.docs.map((doc) => ({
                    id:doc.id,
                    ...doc.data(),
                }))

                //console.log(data)
                //console.log(data[0].blogBody)
                //console.log(data[0].blogTitle)
                var blogsContainer = document.querySelector('.blogs-container');

                data.forEach((d) => {
                    blogsContainer.innerHTML += `<div class="blogs-title">
                                                <h2>${d.blogTitle}</h2>
                                             </div>
                                             <div class="blogs-body">
                                                 <p>${d.blogBody}</p>
                                                 <div class="blog-buttons" data-id=${d.id}>
                                                    <div class="edit-blog">Edit Blog</div>
                                                    <div class="view-blog">View Blog</div>
                                                    <div class="delete-blog">Delete Blog</div>
                                                </div>
                                              </div>`;

                    document.querySelectorAll('.edit-blog').forEach((edit) => {
                        edit.addEventListener('click', function (e) {
                            //console.log(e.target.parentElement.getAttribute('data-id'));
                            let id = e.target.parentElement.getAttribute('data-id');
                            window.location.href = `./editBlog.html?id=${id}`;
                        })
                    })


                    document.querySelectorAll('.view-blog').forEach((view) => {
                        view.addEventListener('click', function (e) {
                            //console.log(e.target.parentElement.getAttribute('data-id'));
                            let id = e.target.parentElement.getAttribute('data-id');
                            window.location.href = `./viewBlog.html?id=${id}`;
                        })
                    })

                    document.querySelectorAll('.delete-blog').forEach((del) => {
                        del.addEventListener('click', function (e) {
                            //console.log(e.target.parentElement.getAttribute('data-id'));
                            let id = e.target.parentElement.getAttribute('data-id');
                            console.log(id);
                            console.log(userId);

                            db.collection('users').doc(`${userId}`).collection('blogs').doc(`${id}`).delete()
                                .then(() => {
                                    alert('blog deleted successfully')
                                    window.location.reload();
                                })
                                .catch((e) => {
                                    console.log(e)
                                })
                        })
                    })


                })

                //var blogsContainer = document.querySelector('.blogs-container');
                
            })
        
    }
})

 


