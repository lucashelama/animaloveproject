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
    const tabela = document.getElementById('table-body');

    for (i=0; i<enderecos.length; i++){
        let endereco = enderecos[i];

        row = `
        <tr id="tr-${endereco.id}">
            <td class="button"><button class="update" id="endereco-put-${endereco.id}" onclick="putEndereco(${endereco.id})">Atualizar</button>
            <button class="delete" id="endereco-del-${endereco.id}" onclick="delEndereco(${endereco.id})">Deletar</button></td>
            <td class="title">${endereco.title}</td>
            <td class="address">${endereco.address}</td>
            <td class="number">${endereco.number}</td>
            <td class="cep">${endereco.cep}</td>
            <td class="complement">${endereco.complement ? endereco.complement : ""}</td>
        </tr>
        `
        tabela.innerHTML += row
    }
}


async function delEndereco(id) {
    let enderecoButton = document.getElementById(`endereco-del-${id}`);
    enderecoButton.disabled = false;
    
    try {
        let token = await getToken()
        if (!token) {
            return;
        }

        let responseApi = await fetch(`${url}/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            }      
        })
        if (responseApi.ok) {
            data = await responseApi.json();
            alert("Endereco removido com Sucesso");
            tr = document.getElementById("tr-" + id);
            tr.remove()
        } else {
            errorData = await responseApi.json();
            alert(errorData.data.error);
        }

    } catch (error) {
        console.log("Erro na requisição:", error);
        alert("Erro inesperado. Tente novamente mais tarde.");
    } finally {
        enderecoButton.disabled = false;
    }
}

function putEndereco(id) {
    window.location.replace("atualizar.html?id=" + id);
}

async function getToken() {
    let token = localStorage.getItem('token');

    if (!token) {
        alert('Você precisa fazer o login novamente para continuar com a operação');
        window.location.replace("login.html");
        return;
    }
    return token;
}