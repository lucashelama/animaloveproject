const url = 'https://go-wash-api.onrender.com/api/auth/address';

async function getEndereco() {
    try {
        let token = await getToken()
        if (!token) {
            return;
        }

        let responseApi = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        if (responseApi.ok) {
            let data = await responseApi.json();
            addTable(data.data);
        } else {
            let errorData = await responseApi.json();
            alert(errorData.data.errors)
        }
    } catch (error) {
        console.log("Erro na requisição:", error);
    }
}

function addTable(enderecos) {
    const tabela = document.getElementById('endereco-table');
    console.log(enderecos)

    for (i=0; i<enderecos.length; i++){
        let endereco = enderecos[i];

        row = `
        <tr>
            <td>${endereco.title}</td>
            <td>${endereco.address}</td>
            <td>${endereco.number}</td>
            <td>${endereco.cep}</td>
            <td><button class="update" id="endereco-put-${endereco.id}" onclick="putEndereco(${endereco.id})">Atualizar</button>
        <button class="delete" id="endereco-del-${endereco.id}" onclick="delEndereco(${endereco.id})">Deletar</button></td>
        </tr>
        `
        tabela.innerHTML += row
    }
}

function putEndereco(id) {
    window.location.replace("atualizar.html?id=" + id);
}

async function getToken() {
    let token = localStorage.getItem('token');

    if (!token) {
        alert('Você precisa fazer o login novamente para continuar com a operação');
        //window.location.replace("login.html");
        return;
    }
    return token;
}