const url = 'https://go-wash-api.onrender.com/api/auth/address';

async function updateEndereco() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    console.log(queryString);
    console.log(urlParams.has('id'));
    console.log(urlParams.get('id'));

}