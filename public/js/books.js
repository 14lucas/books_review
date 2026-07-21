//testing if js works
//document.getElementById("output").textContent = "Hello world!";

document.querySelectorAll('.review-form').forEach((form) => {

    form.addEventListener('submit', async (event) => {
        //prevent page reload
        event.preventDefault();

        //finding the nearest ancestor with the class eachbook_container
        const container = form.closest('.eachbook-container');
        const bookId = container.dataset.bookId;
        const submitter = event.submitter;

        const formData = new FormData(form);
        const body = {
            author: formData.get('author'),
            readDate: formData.get('readDate'),
            rating: formData.get('rating'),
            review: formData.get('review'),
        };

        if(submitter.name === 'delete'){
            body.delete = true;
        }

        try{
            const response = await fetch(`/book/${bookId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if(data.success){
                if(body.delete){
                    container.remove();
                    alert(data.message)
                }else{
                    alert(data.message);
                }
            }
            else{
                alert(data.message);
            }
        }
        catch(err){
            console.error('Request failed: ', err);
            alert('Something went wrong, Please try again');
        }


    });

});