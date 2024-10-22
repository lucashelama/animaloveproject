const url = "https://go-wash-api.onrender.com/api/user";

async function cadastro(){
    const cadastroButton = document.getElementById('cadastro-button');
    cadastroButton.disabled = true;

    try {
        let name = document.getElementById('name').value;
        let email = document.getElementById('email').value;
        let cpf_cnpj = document.getElementById('cpf_cnpj').value.replace(/\D/g, '');
        let password = document.getElementById('password').value;
        let date = document.getElementById('date').value;
        let terms = document.getElementById('termos').checked ? 1 : 0;

        // Checagem de campos
        if (!name || !email || !cpf_cnpj || !password || !date) {
            alert('Todos os campos são obrigatórios!\nPor favor, preencha todos os campos');
            return;
        }

        // Checagem de termos
        if (!terms) {
            alert('Os termos precisam ser aceitos!');
            return;
        }

        let responseApi = await fetch(url,{
            method: "POST",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                "name": name,
                "email": email,
                "user_type_id": 1,
                "password": password,
                "cpf_cnpj": cpf_cnpj,
                "terms": terms,
                "birthday": date
            })
        });

        if (responseApi.ok) {
            let data = await responseApi.json();
            alert("Cadastro Realizado com Sucesso");
            window.location.replace("login.html");
        } else {
            let errorData = await responseApi.json();

            // Error Tratado
            let errorMessage = errorData.data.errors;
            
            // Tratamento de erro do cpf
            if (errorMessage.cpf_cnpj) {
                alert(errorMessage.cpf_cnpj[0]);
            } else {
                alert(errorMessage);
            };

        };
    } catch (error) {
        console.log("Erro na requisição:", error);
        alert("Erro inesperado. Tente novamente mais tarde.");
    } finally{
        cadastroButton.disabled = false;
    }
}

async function fomatarCPFCNPJ(input) {
    let cpf_cnpj = input.value.replace(/\D/g, '');

    if (cpf_cnpj.length === 11) {
        cpf_cnpj = cpf_cnpj.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (cpf_cnpj.length === 14) {
            cpf_cnpj = cpf_cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
    input.value = cpf_cnpj;
}