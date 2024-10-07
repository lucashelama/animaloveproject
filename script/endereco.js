const url = 'https://go-wash-api.onrender.com/api/auth/address';

async function endereco() {
    const enderecoButton = document.getElementById('endereco-button');
    enderecoButton.disabled = true;

    try {
        let title = document.getElementById('title').value;
        let cep = document.getElementById('cep').value.replace(/\D/g, '');
        let address = document.getElementById('address').value;
        
        if (cep !== "") {
            address = await completeAddress(cep);
            if (!address) {
                alert('CEP inválido');
                return;
            }
        } else {
            alert('Campo CEP obrigatório');
            return;
        }

        let number = document.getElementById('number').value;
        let complement = document.getElementById('complement').value;

        if (!title || !number) {
            alert('Alguns campos precisam ser preenchidos');
            return;
        }

        let token = localStorage.getItem('token');
        if (!token) {
            alert('Você precisa fazer o login novamente para continuar com a operação');
            window.location.replace("login.html");
            return;
        }

        let responseApi = await fetch(url, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "title": title,
                "cep": cep,
                "address": address,
                "number": number,
                "complement": complement
            })
        });

        if (responseApi.ok) {
            let data = await responseApi.json();
            alert('Endereço adicionado com sucesso!');
            adicionarEnderecoNaLista({ title, cep, address, number, complement });
            enderecoForm.reset();
            return;
        } else {
            let errorData = await responseApi.json();
            alert(errorData.data.error);
        }
    } catch (error) {
        console.log("Erro na requisição:", error);
        alert("Erro inesperado. Tente novamente mais tarde.");
    } finally {
        enderecoButton.disabled = false;
    }
}

function adicionarEnderecoNaLista(endereco) {
    const listaEnderecos = document.getElementById('listaEnderecos');
    const li = document.createElement('li');
    li.innerHTML = `
        ${endereco.title}: ${endereco.address}, ${endereco.number} - ${endereco.cep} 
        <button class="delete" onclick="deletarEndereco()">Deletar</button>
    `;
    listaEnderecos.appendChild(li);
}

async function formatarCep(input) {
    let cep = input.value.replace(/\D/g, '');
    if (cep.length > 5) {
        cep = cep.replace(/(\d{5})(\d{3})/, '$1-$2');
    }
    input.value = cep;
    if (cep.length === 9) {
        let address = await completeAddress(cep);
        if (address) {
            document.getElementById('address').value = address;
        };
    }
}

async function completeAddress(cep) {
    let cep_url = "https://brasilapi.com.br/api/cep/v2/" + cep;
    let response = await fetch(cep_url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        let data = await response.json();
        return data.street;
    } else {
        return null;
    }
}
