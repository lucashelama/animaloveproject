const url = "https://go-wash-api.onrender.com/api/user";

async function cadastro(){
    try {
        let name = document.getElementById('name').value;
        let email = document.getElementById('email').value;
        let cpf_cnpj = document.getElementById('cpf_cnpj').value;
        let password = document.getElementById('senha').value;
        let data = document.getElementById('data').value;
        let terms = document.getElementById('termos').checked ? 1 : 0;

        // Checagem de termos
        if (terms == 0) {
            alert('Os termos precisam ser aceitos!');
            return;
        }

        // Chacagem de campos
        if (!name) {
            alert('campo Nome é obrigatório!');
            return;
        }
        if (!email) {
            alert('campo Email é obrigatório!');
            return;
        }
        if (!cpf_cnpj) {
            alert('campo CPF ou CNPJ é obrigatório!');
            return;
        }
        if (!password) {
            alert('campo Senha é obrigatório!');
            return;
        }
        if (!data) {
            alert('Campo Data de Nascimento é obrigatório!');
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
                alert("CPF já utilizado");
            };

            if (errorMessage == "cpf_cnpj invalid") {
                alert("CPF Inválido");
            };
        };
    } catch (error) {
        console.log("Erro na requisição:", error);
        alert("Erro inesperado. Tente novamente mais tarde.");
    };
}