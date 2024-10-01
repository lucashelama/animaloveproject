const url = "https://go-wash-api.onrender.com/api/login"

async function login(){
    const loginButton = document.getElementById('login-button');
    loginButton.disabled = true;

    try {
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
            let data = await responseApi.json();
            localStorage.setItem('token', data.access_token);
            alert('Login feito com sucesso');
            window.location.replace("home.html");
        } else{
            let errorData = await responseApi.json();
            let errorMessage = errorData.data.errors;
            alert(errorMessage);
        };
    } catch(error){
        console.log("Erro na requisição:", error);
        alert("Erro inesperado. Tente novamente mais tarde.");
    } finally{
        loginButton.disabled = false;
    }    
}