const url = "https://go-wash-api.onrender.com/api/login"

async function login(){
    let user = document.getElementById('user').value;
    let password = document.getElementById('password').value;

    if (!user || !password){
        alert('Todos os campos precisam ser preenchidos!');
        return;
    };

    let responseApi = await fetch(url, {
        method:"POST",
        body:JSON.stringify({
            "email": user,
            "password": password,
            "user_type_id": 1
        }),
        headers:{
            'Content-Type':'application/json'
        }
    });

    if (responseApi.ok) {
        // No momento vou manter o data, mesmo não usando ele
        let data = await responseApi.json();
        alert('Login feito com sucesso');
        window.location.replace("../index.html");
    } else{
        let errorData = await responseApi.json();
        alert(errorData.data)
    };
}