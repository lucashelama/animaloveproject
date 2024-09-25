const url = "https://go-wash-api.onrender.com/api/user";

async function cadastro(){
    const cadastroButton = document.getElementById('cadastro-button');
    cadastroButton.disabled = true;

    try {
        let name = document.getElementById('name').value;
        let email = document.getElementById('email').value;
        let cpf_cnpj = document.getElementById('cpf_cnpj').value;
        let password = document.getElementById('password').value;
        let data = document.getElementById('data').value;
        let terms = document.getElementById('termos').checked ? 1 : 0;

        // Checagem de campos
        if (!name || !email || !cpf_cnpj || !password || !data) {
            alert('Todos os campos são obrigatórios!\nPor favor, preencha todos os campos');
            return;
        }

        // Checagem de termos
        if (!terms) {
            alert('Os termos precisam ser aceitos!');
            return;
        }

        let responseApi = await fetch(url,{
            method:"POST",
            body:JSON.stringify({
                "name": name,
                "email": email,
                "user_type_id": 1,
                "password": password,
                "cpf_cnpj": cpf_cnpj,
                "terms": terms,
                "birthday": data
            }),
            headers:{
                'Content-Type':'application/json'
            }
        });

        if (responseApi.ok) {
            let data = await responseApi.json();
            alert(data.data);
        } else {
            let errorData = await responseApi.json();

            // Error Tratado
            let errorMessage = errorData.data.errors;

            // Tratamento de erros
            if (errorMessage.email) {
                alert("E-mail já utilizado");
            };

            if (errorMessage.cpf_cnpj) {
                alert("CPF/CNPJ já utilizado");
            };

            if (errorMessage == "cpf_cnpj invalid") {
                alert("CPF/CNPJ Inválido");
            };
        };
    } catch (error) {
        console.log("Erro na requisição:", error);
        alert("Erro inesperado. Tente novamente mais tarde.");
    };
    cadastroButton.disabled = false;
}