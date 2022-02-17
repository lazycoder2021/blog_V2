window.addEventListener('DOMContentLoaded', function () {
    var db = firebase.firestore()

    const params = window.location.search;
    const userIdForCommenting = new URLSearchParams(params).get('id')

    console.log(userIdForCommenting)

    localStorage.setItem('userIdForCommenting', `${userIdForCommenting}`)
    


    db.collection("users").doc(`${userIdForCommenting}`).collection("blogs").get()
        .then((snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))

            console.log(data)
            //console.log(data[0].blogBody)
            //console.log(data[0].blogTitle)

            
            var blogsContainer1 = document.querySelector('.blogs-container1');

            data.forEach((d) => {
                blogsContainer1.innerHTML += `<div class="blogs-title1">
                                                <h2>${d.blogTitle}</h2>
                                             </div>
                                             <div class="blogs-body1">
                                                 <p>${d.blogBody}</p>
                                                 <div class="blog-buttons1" data-id=${d.id}>
                                                    <div class="view-blog"><a href="viewBlog.html?id=${d.id}">View Blog</a></div>
                                                </div>
                                              </div>`;
            })

                
                /*

                document.querySelectorAll('.view-blog').forEach((view) => {
                    view.addEventListener('click', function (e) {
                        //console.log(e.target.parentElement.getAttribute('data-id'));
                        let id = e.target.parentElement.getAttribute('data-id');
                        window.location.href = `./viewBlog.html?id=${id}`;
                    })
                })

                


            })*/

            
        })

})



    






